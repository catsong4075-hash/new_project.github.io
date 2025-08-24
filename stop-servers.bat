@echo off
chcp 65001 >nul
title 서버 중지

echo.
echo ========================================
echo    서버 중지
echo ========================================
echo.

:: Node.js 프로세스 중지
echo [정보] Node.js 프로세스를 중지합니다...

:: 포트 5173 (Vite) 프로세스 중지
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173') do (
    echo 포트 5173 프로세스 중지: %%a
    taskkill /f /pid %%a >nul 2>&1
)

:: 포트 3001 (json-server) 프로세스 중지
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3001') do (
    echo 포트 3001 프로세스 중지: %%a
    taskkill /f /pid %%a >nul 2>&1
)

:: json-server 관련 프로세스 중지
taskkill /f /im node.exe >nul 2>&1

echo [완료] 모든 서버가 중지되었습니다.
echo.

pause
