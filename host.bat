@echo off
echo 🚀 Starting PNG-WL-Dashboard server...

REM Check if dist folder exists
if not exist "dist" (
    echo ❌ dist folder not found. Building the application first...
    npm run build
)

REM Change to dist directory
cd dist

echo 📁 Serving files from: %CD%
echo 🌐 Dashboard available at: http://localhost:8000

REM Try to get local IP address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set "localIP=%%a"
    set "localIP=!localIP: =!"
    if not "!localIP!"=="" (
        echo 🌐 Network access: http://!localIP!:8000
        goto :found_ip
    )
)

:found_ip
echo.
echo Press Ctrl+C to stop the server

REM Try Python first, then http-server
python -m http.server 8000 2>nul
if errorlevel 1 (
    echo Python not found, trying http-server...
    npx http-server -p 8000
)

pause 