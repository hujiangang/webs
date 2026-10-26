param(
    [string]$CreatorPath = $env:COCOS_CREATOR_PATH
)
$ErrorActionPreference = 'Stop'
$projectPath = (Resolve-Path -LiteralPath (Split-Path $PSScriptRoot -Parent)).ProviderPath
if (-not $CreatorPath) {
    $CreatorPath = 'D:\CocosEditors\Creator\2.4.13\CocosCreator.exe'
}
if (-not (Test-Path -LiteralPath $CreatorPath -PathType Leaf)) {
    throw '找不到 Cocos Creator 2.4.13。请通过 -CreatorPath 或 COCOS_CREATOR_PATH 指定。'
}
$CreatorPath = (Resolve-Path -LiteralPath $CreatorPath).ProviderPath

function Assert-ProjectPath([string]$Path) {
    $absolute = [IO.Path]::GetFullPath($Path)
    $prefix = $projectPath.TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
    if (-not $absolute.StartsWith($prefix, [StringComparison]::OrdinalIgnoreCase)) {
        throw "路径必须位于本项目内部: $absolute"
    }
    # Reject junctions/symlinks before moving directories, including existing ancestors.
    $cursor = $absolute
    while ($cursor -and $cursor -ne $projectPath) {
        if (Test-Path -LiteralPath $cursor) {
            $item = Get-Item -LiteralPath $cursor -Force
            if (($item.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0) {
                throw "构建路径不能经过链接或联接目录: $cursor"
            }
        }
        $cursor = Split-Path $cursor -Parent
    }
    return $absolute
}

function Copy-SourceEntry([string]$Source, [string]$Destination) {
    $Source = Assert-ProjectPath $Source
    $Destination = Assert-ProjectPath $Destination
    if (-not (Test-Path -LiteralPath $Source)) { return }
    if (Test-Path -LiteralPath $Source -PathType Container) {
        $links = @(Get-ChildItem -LiteralPath $Source -Force -Recurse |
            Where-Object { ($_.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0 })
        if ($links.Count -gt 0) { throw "源目录含链接，无法保证隔离复制: $($links[0].FullName)" }
    }
    Copy-Item -LiteralPath $Source -Destination $Destination -Recurse -Force
}

function Get-Sha256([string]$Path) {
    # Some bundled PowerShell hosts omit Microsoft.PowerShell.Utility's Get-FileHash.
    $stream = [IO.File]::OpenRead($Path)
    $algorithm = [Security.Cryptography.SHA256]::Create()
    try {
        return [BitConverter]::ToString($algorithm.ComputeHash($stream)).Replace('-', '')
    } finally {
        $algorithm.Dispose()
        $stream.Dispose()
    }
}

$tempRoot = Assert-ProjectPath (Join-Path $projectPath 'temp')
New-Item -ItemType Directory -Path $tempRoot -Force | Out-Null
$lockPath = Assert-ProjectPath (Join-Path $tempRoot 'build-preview.lock')
try {
    $buildLock = [IO.File]::Open($lockPath, [IO.FileMode]::OpenOrCreate, [IO.FileAccess]::ReadWrite, [IO.FileShare]::None)
} catch {
    throw '已有预览构建正在运行，或无法取得本项目构建锁。请等待现有构建完成。'
}

$runId = (Get-Date -Format 'yyyyMMdd-HHmmss-fff') + '-' + [guid]::NewGuid().ToString('N').Substring(0, 8)
$stagePath = Assert-ProjectPath (Join-Path $tempRoot ('build-preview-stage-' + $runId))
$logPath = Assert-ProjectPath (Join-Path $tempRoot ('build-preview-' + $runId + '.log'))
$latestLog = Assert-ProjectPath (Join-Path $tempRoot 'build-preview.log')
$archivePath = $null
try {
    # This fresh project owns its own library/temp caches. The open editor's caches stay untouched.
    New-Item -ItemType Directory -Path $stagePath | Out-Null
    foreach ($entry in @('assets', 'settings', 'packages', 'build-templates')) {
        Copy-SourceEntry (Join-Path $projectPath $entry) (Join-Path $stagePath $entry)
    }
    foreach ($entry in @('project.json', 'tsconfig.json', 'jsconfig.json', 'package.json', 'package-lock.json')) {
        Copy-SourceEntry (Join-Path $projectPath $entry) (Join-Path $stagePath $entry)
    }
    foreach ($declaration in Get-ChildItem -LiteralPath $projectPath -Filter '*.d.ts' -File) {
        Copy-SourceEntry $declaration.FullName (Join-Path $stagePath $declaration.Name)
    }
    # Use Creator 2.4's default project-local build folder. Clear saved custom paths only in the copy.
    # This installation exits before logging when an absolute buildPath is supplied through the CLI.
    foreach ($builderFile in @('builder.json', 'builder.panel.json')) {
        $builderPath = Join-Path (Join-Path $stagePath 'settings') $builderFile
        if (Test-Path -LiteralPath $builderPath -PathType Leaf) {
            $builder = Get-Content -LiteralPath $builderPath -Raw | ConvertFrom-Json
            $builder.PSObject.Properties.Remove('buildPath')
            $builder.PSObject.Properties.Remove('dest')
            [IO.File]::WriteAllText($builderPath, ($builder | ConvertTo-Json -Depth 100), (New-Object Text.UTF8Encoding($false)))
        }
    }
    if (-not (Test-Path -LiteralPath (Join-Path $stagePath 'assets') -PathType Container) -or
        -not (Test-Path -LiteralPath (Join-Path $stagePath 'project.json') -PathType Leaf)) {
        throw '隔离项目缺少 assets 或 project.json。'
    }
    # Copy-Item includes .meta files. Check their hashes before Creator can import the snapshot.
    $assetPrefix = (Join-Path $projectPath 'assets') + [IO.Path]::DirectorySeparatorChar
    $metaCount = 0
    foreach ($meta in Get-ChildItem -LiteralPath (Join-Path $projectPath 'assets') -Filter '*.meta' -File -Recurse -Force) {
        $relative = $meta.FullName.Substring($assetPrefix.Length)
        $copy = Join-Path (Join-Path $stagePath 'assets') $relative
        if (-not (Test-Path -LiteralPath $copy -PathType Leaf) -or
            (Get-Sha256 $meta.FullName) -ne (Get-Sha256 $copy)) {
            throw "隔离复制未保持资源 meta: $relative"
        }
        $metaCount++
    }
    Write-Host "隔离项目: $stagePath"
    Write-Host "已核对 $metaCount 个资源 meta。构建日志: $logPath"
    $stageBuildRoot = Assert-ProjectPath (Join-Path $stagePath 'build')
    $startedAt = Get-Date
    $buildOptions = 'platform=web-mobile;debug=true'
    $arguments = @('--path', ('"' + $stagePath + '"'), '--build', ('"' + $buildOptions + '"'), '--logfile', ('"' + $logPath + '"'))
    $process = Start-Process -FilePath $CreatorPath -ArgumentList $arguments -WindowStyle Hidden -PassThru
    $null = $process.Handle
    $process.WaitForExit()
    if ($null -eq $process.ExitCode -or $process.ExitCode -ne 0) { throw "Cocos Creator 构建退出码: $($process.ExitCode)" }
    if (-not (Test-Path -LiteralPath $logPath -PathType Leaf)) { throw 'Creator 未生成本次构建日志。' }
    $log = Get-Content -LiteralPath $logPath -Raw
    if ($log -match ' - (error|failed):|missing or invalid') {
        throw '构建日志包含错误或无效脚本，即使编辑器返回成功也不能作为验收通过。'
    }
    $stageOutput = Assert-ProjectPath (Join-Path $stageBuildRoot 'web-mobile')
    $stageIndex = Join-Path $stageOutput 'index.html'
    if (-not (Test-Path -LiteralPath $stageIndex -PathType Leaf)) { throw '构建未产生隔离项目的 build/web-mobile/index.html。' }
    if ((Get-Item -LiteralPath $stageIndex).LastWriteTime -lt $startedAt) { throw '构建输出不是本次运行产生的文件。' }
    $indexHash = Get-Sha256 $stageIndex

    # Publish only a validated build; archive the previous output and roll it back if moving fails.
    $buildRoot = Assert-ProjectPath (Join-Path $projectPath 'build')
    New-Item -ItemType Directory -Path $buildRoot -Force | Out-Null
    $outputPath = Assert-ProjectPath (Join-Path $buildRoot 'web-mobile')
    if (Test-Path -LiteralPath $outputPath) {
        if (-not (Test-Path -LiteralPath $outputPath -PathType Container)) { throw 'build/web-mobile 不是目录，保留原文件并停止。' }
        $archivePath = Assert-ProjectPath (Join-Path $tempRoot ('web-mobile-before-' + $runId))
        Move-Item -LiteralPath $outputPath -Destination $archivePath
    }
    try {
        $stageOutput = Assert-ProjectPath $stageOutput
        $outputPath = Assert-ProjectPath $outputPath
        Move-Item -LiteralPath $stageOutput -Destination $outputPath
    } catch {
        if ($archivePath -and -not (Test-Path -LiteralPath $outputPath)) {
            $archivePath = Assert-ProjectPath $archivePath
            $outputPath = Assert-ProjectPath $outputPath
            Move-Item -LiteralPath $archivePath -Destination $outputPath
        }
        throw
    }
    $indexPath = Join-Path $outputPath 'index.html'
    if ((Get-Sha256 $indexPath) -ne $indexHash) {
        throw '发布后的 index.html 与构建输出不一致。旧构建仍保留在归档目录。'
    }
    $report = [ordered]@{
        startedAt = $startedAt.ToString('o'); completedAt = (Get-Date).ToString('o')
        creator = $CreatorPath; stage = $stagePath; log = $logPath; output = $outputPath
        previousOutputArchive = $archivePath; verifiedMetaCount = $metaCount; indexSha256 = $indexHash
    }
    $reportPath = Assert-ProjectPath (Join-Path $tempRoot 'build-preview-last.json')
    [IO.File]::WriteAllText($reportPath, ($report | ConvertTo-Json -Depth 3), (New-Object Text.UTF8Encoding($false)))
    Write-Host "构建完成: $indexPath"
    if ($archivePath) { Write-Host "上次构建已归档: $archivePath" }
    Write-Host "构建记录: $reportPath"
} finally {
    try {
        if (Test-Path -LiteralPath $logPath -PathType Leaf) { Copy-Item -LiteralPath $logPath -Destination $latestLog -Force }
    } finally {
        $buildLock.Dispose()
    }
}
