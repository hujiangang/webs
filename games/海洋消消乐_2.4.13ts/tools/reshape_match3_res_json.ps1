Param()

$ErrorActionPreference = "Stop"

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$jsonPath = Join-Path $root "assets/resources/config/match3_res/default.json"

function Normalize-Path([string]$value) {
    if ($null -eq $value) { return "" }
    return ($value.Trim() -replace "\\", "/")
}

function Strip-Ext([string]$value) {
    return (Normalize-Path $value) -replace "\.(png|jpg|jpeg|json|prefab)$", ""
}

function New-OrderedObject {
    return [ordered]@{}
}

$metaMap = @{}
Get-ChildItem -Path (Join-Path $root "assets") -Recurse -File -Filter "*.meta" | ForEach-Object {
    $assetPath = $_.FullName.Substring(0, $_.FullName.Length - 5)
    $rel = (Resolve-Path $assetPath).Path.Substring($root.Length + 1).Replace("\", "/")
    try {
        $meta = Get-Content $_.FullName -Raw | ConvertFrom-Json
    } catch {
        return
    }

    if ($meta.uuid) {
        $metaMap[$meta.uuid] = $rel
    }
    if ($meta.subMetas) {
        foreach ($sub in $meta.subMetas.PSObject.Properties) {
            $subMeta = $sub.Value
            if ($subMeta.uuid) {
                $metaMap[$subMeta.uuid] = $rel
            }
        }
    }
}

$data = Get-Content $jsonPath -Raw | ConvertFrom-Json

function Convert-Entry($entry) {
    if ($null -eq $entry) { return $null }

    $obj = New-OrderedObject
    if ($entry -is [string]) {
        $uuid = Normalize-Path $entry
        if ($uuid) {
            $obj.uuid = $uuid
            if ($metaMap.ContainsKey($uuid)) {
                $sourcePath = $metaMap[$uuid]
                $obj.sourcePath = $sourcePath
                if ($sourcePath.StartsWith("assets/resources/")) {
                    $obj.path = Strip-Ext($sourcePath.Substring("assets/resources/".Length))
                }
            }
        }
        return $obj
    }

    if ($entry.PSObject.Properties.Name -contains "uuid") {
        $uuid = Normalize-Path $entry.uuid
        if ($uuid) { $obj.uuid = $uuid }
    }
    if ($entry.PSObject.Properties.Name -contains "path") {
        $path = Normalize-Path $entry.path
        if ($path) { $obj.path = $path }
    }
    if ($entry.PSObject.Properties.Name -contains "sourcePath") {
        $sourcePath = Normalize-Path $entry.sourcePath
        if ($sourcePath) { $obj.sourcePath = $sourcePath }
    }

    if (-not $obj.sourcePath -and $obj.uuid -and $metaMap.ContainsKey($obj.uuid)) {
        $sourcePath = $metaMap[$obj.uuid]
        $obj.sourcePath = $sourcePath
        if (-not $obj.path -and $sourcePath.StartsWith("assets/resources/")) {
            $obj.path = Strip-Ext($sourcePath.Substring("assets/resources/".Length))
        }
    }

    return $obj
}

$result = New-OrderedObject
foreach ($prop in $data.PSObject.Properties) {
    $value = $prop.Value
    if ($value -is [System.Array]) {
        $arr = @()
        foreach ($item in $value) {
            $arr += Convert-Entry $item
        }
        $result[$prop.Name] = $arr
    } else {
        $result[$prop.Name] = Convert-Entry $value
    }
}

$result | ConvertTo-Json -Depth 20 | Set-Content -Path $jsonPath -Encoding UTF8

Write-Host "rewritten: $jsonPath"
