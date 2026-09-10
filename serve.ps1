$port = 5173
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Server running on http://localhost:$port/"

$mimeMap = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".mjs"  = "application/javascript; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".webp" = "image/webp"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

$baseDir = $PSScriptRoot

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $response.AddHeader("Access-Control-Allow-Headers", "Content-Type")

        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.OutputStream.Close()
            continue
        }

        $path = $request.Url.LocalPath

        # Handle Secret Leaderboard Upload Endpoint
        if ($request.HttpMethod -eq "POST" -and $path -eq "/api/upload-leaderboard") {
            try {
                $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
                $body = $reader.ReadToEnd()
                $json = ConvertFrom-Json $body

                if ($json.image) {
                    $base64Data = $json.image
                    # Remove data URL header if present (e.g. data:image/png;base64,...)
                    if ($base64Data -match "^data:image\/\w+;base64,(.+)$") {
                        $base64Data = $Matches[1]
                    }
                    $imageBytes = [System.Convert]::FromBase64String($base64Data)
                    
                    $uploadPath = [System.IO.Path]::Combine($baseDir, "src", "data", "leaderboard_current.png")
                    [System.IO.File]::WriteAllBytes($uploadPath, $imageBytes)

                    # Also save metadata json if passed
                    if ($json.metadata) {
                        $metaJson = ConvertTo-Json $json.metadata -Depth 10
                        $metaPath = [System.IO.Path]::Combine($baseDir, "src", "data", "leaderboard_state.json")
                        [System.IO.File]::WriteAllText($metaPath, $metaJson, [System.Text.Encoding]::UTF8)
                    }

                    $resObj = @{
                        success = $true
                        message = "Leaderboard PNG uploaded and saved successfully"
                        url = "./src/data/leaderboard_current.png?t=" + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
                    }
                    $resBytes = [System.Text.Encoding]::UTF8.GetBytes((ConvertTo-Json $resObj))
                    $response.ContentType = "application/json; charset=utf-8"
                    $response.StatusCode = 200
                    $response.ContentLength64 = $resBytes.Length
                    $response.OutputStream.Write($resBytes, 0, $resBytes.Length)
                } else {
                    $resObj = @{ success = $false; message = "No image data provided in payload" }
                    $resBytes = [System.Text.Encoding]::UTF8.GetBytes((ConvertTo-Json $resObj))
                    $response.ContentType = "application/json; charset=utf-8"
                    $response.StatusCode = 400
                    $response.ContentLength64 = $resBytes.Length
                    $response.OutputStream.Write($resBytes, 0, $resBytes.Length)
                }
            } catch {
                $errObj = @{ success = $false; error = $_.Exception.Message }
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes((ConvertTo-Json $errObj))
                $response.ContentType = "application/json; charset=utf-8"
                $response.StatusCode = 500
                $response.ContentLength64 = $errBytes.Length
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            }
            $response.OutputStream.Close()
            continue
        }

        if ($path -eq "/" -or $path -eq "") {
            $path = "/index.html"
        }

        $localPath = [System.IO.Path]::Combine($baseDir, $path.TrimStart('/').Replace('/', '\'))

        if (Test-Path $localPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            $contentType = if ($mimeMap.ContainsKey($ext)) { $mimeMap[$ext] } else { "application/octet-stream" }
            
            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200

            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            }
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
            $response.ContentLength64 = $errBytes.Length
            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            }
        }
        $response.OutputStream.Close()
    } catch {
        # ignore context errors
    }
}
