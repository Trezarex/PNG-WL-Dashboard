# PowerShell script to host the PNG-WL-Dashboard
# Usage: .\host-powershell.ps1

param(
    [int]$Port = 8000
)

Write-Host "🚀 Starting PNG-WL-Dashboard server..." -ForegroundColor Green

# Check if dist folder exists
if (-not (Test-Path "dist")) {
    Write-Host "❌ dist folder not found. Building the application first..." -ForegroundColor Yellow
    npm run build
}

# Change to dist directory
Set-Location dist

Write-Host "📁 Serving files from: $(Get-Location)" -ForegroundColor Cyan
Write-Host "🌐 Dashboard available at: http://localhost:$Port" -ForegroundColor Green

# Get local IP address for network access
$localIP = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Wi-Fi" | Where-Object {$_.IPAddress -notlike "169.254.*"}).IPAddress
if ($localIP) {
    Write-Host "🌐 Network access: http://$localIP`:$Port" -ForegroundColor Cyan
}

Write-Host "`nPress Ctrl+C to stop the server" -ForegroundColor Yellow

# Start Python HTTP server if available
try {
    python -m http.server $Port
} catch {
    Write-Host "❌ Python not found. Trying alternative methods..." -ForegroundColor Yellow
    
    # Try Node.js http-server if available
    try {
        npx http-server -p $Port
    } catch {
        Write-Host "❌ No suitable server found. Please install Python or http-server." -ForegroundColor Red
        Write-Host "💡 Install Python: https://python.org" -ForegroundColor Cyan
        Write-Host "💡 Or install http-server: npm install -g http-server" -ForegroundColor Cyan
    }
} 