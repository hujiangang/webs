param(
    [string]$CreatorPath = $env:COCOS_CREATOR_PATH
)
$ErrorActionPreference = 'Stop'
$projectPath = Split-Path $PSScriptRoot -Parent
if (-not $CreatorPath) {
    $CreatorPath = 'D:\CocosEditors\Creator\2.4.13\CocosCreator.exe'
}
if (-not (Test-Path -LiteralPath $CreatorPath)) {
    throw '找不到 Cocos Creator 2.4.13。请通过 -CreatorPath 或 COCOS_CREATOR_PATH 指定。'
}
$logPath = Join-Path $projectPath 'temp\build-preview.log'
New-Item -ItemType Directory -Path (Split-Path $logPath) -Force | Out-Null
# Creator 2.4 may race while deleting its old quick-script index on Windows.
# Archive only this project's generated script cache before starting the editor.
$cachePath = [IO.Path]::GetFullPath((Join-Path $projectPath 'temp\quick-scripts'))
$tempRoot = [IO.Path]::GetFullPath((Join-Path $projectPath 'temp')) + [IO.Path]::DirectorySeparatorChar
if (-not $cachePath.StartsWith($tempRoot, [StringComparison]::OrdinalIgnoreCase)) {
    throw '缓存路径不在本项目 temp 目录内。'
}
if (Test-Path -LiteralPath $cachePath) {
    $cacheArchive = Join-Path $tempRoot ('quick-scripts-backup-' + (Get-Date -Format 'yyyyMMdd-HHmmss-fff'))
    Move-Item -LiteralPath $cachePath -Destination $cacheArchive
}
$startedAt = Get-Date
$arguments = @('--path', ('"' + $projectPath + '"'), '--build', '"platform=web-mobile;debug=true"', '--logfile', ('"' + $logPath + '"'))
$process = Start-Process -FilePath $CreatorPath -ArgumentList $arguments -WindowStyle Hidden -PassThru
$process.WaitForExit()
Write-Host "构建日志: $logPath"
if ($process.ExitCode -ne 0) { throw "Cocos Creator 构建退出码: $($process.ExitCode)" }
$log = Get-Content -LiteralPath $logPath -Raw
if ($log -match ' - (error|failed):|missing or invalid') {
    throw '构建日志包含错误或无效脚本，即使编辑器返回成功也不能作为验收通过。'
}
$indexPath = Join-Path $projectPath 'build\web-mobile\index.html'
if (-not (Test-Path -LiteralPath $indexPath)) { throw '构建未产生 build/web-mobile/index.html，请检查日志。' }
if ((Get-Item -LiteralPath $indexPath).LastWriteTime -lt $startedAt) { throw '构建输出不是本次运行产生的文件。' }
Write-Host "构建完成: $indexPath"
