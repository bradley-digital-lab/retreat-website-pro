$port = 9001
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
try {
    $listener.Start()
    Write-Host "Vibrant Server started on http://localhost:$port/"
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $path = $request.Url.LocalPath.TrimStart('/')
        if ($path -eq "") { $path = "index.html" }
        $filePath = Join-Path (Get-Location) $path
        
        if (Test-Path $filePath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            
            # Basic MIME types
            if ($path.EndsWith(".html")) { $response.ContentType = "text/html" }
            elseif ($path.EndsWith(".css")) { $response.ContentType = "text/css" }
            elseif ($path.EndsWith(".js")) { $response.ContentType = "application/javascript" }
            elseif ($path.EndsWith(".png")) { $response.ContentType = "image/png" }
            elseif ($path.EndsWith(".jpg") -or $path.EndsWith(".jpeg")) { $response.ContentType = "image/jpeg" }
            
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        }
        else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
}
catch {
    Write-Host "Failed to start server: $_"
}
finally {
    if ($listener.IsListening) { $listener.Stop() }
}
