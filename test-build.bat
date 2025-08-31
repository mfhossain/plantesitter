@echo off
echo Testing Angular build for GitHub Pages deployment...

REM Change to the Angular project directory
cd application\web

REM Install dependencies
echo Installing dependencies...
call npm install

REM Build the application
echo Building Angular application...
call npm run build

REM Check if build was successful
if %ERRORLEVEL% EQU 0 (
    echo ✅ Build successful!
    echo 📁 Built files are in: dist\plantesitter\browser\
    echo 🌐 You can test locally by serving the dist folder
    echo.
    echo To test locally, run:
    echo cd dist\plantesitter\browser
    echo npx http-server -p 8080
    echo.
    echo Then visit: http://localhost:8080
) else (
    echo ❌ Build failed!
    echo Please check the error messages above and fix any issues before deploying.
    exit /b 1
)
