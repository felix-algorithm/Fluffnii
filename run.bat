@echo off
cd /d "%~dp0"
title Studio Gioia - Local Server

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

if exist ".next-dev" (
    rmdir /s /q ".next-dev"
)

echo Starting server and opening http://localhost:3000 ...
start "" cmd /c "timeout /t 3 /nobreak >nul & start http://localhost:3000"
call npm run dev
pause
