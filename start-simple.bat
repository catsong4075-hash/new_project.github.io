@echo off
chcp 65001 >nul
title 오늘의 행운지수 - 간단 시작

echo.
echo ========================================
echo    오늘의 행운지수 개발 서버 시작
echo ========================================
echo.

:: frontend 디렉토리로 이동
cd /d "%~dp0frontend"

:: 의존성 설치
echo [정보] 의존성을 설치합니다...
npm install

:: 백엔드 서버 시작 (새 창)
echo [정보] 백엔드 서버를 시작합니다...
start "백엔드" cmd /k "npm run mock:api"

:: 잠시 대기
timeout /t 2 /nobreak >nul

:: 프론트엔드 서버 시작
echo [정보] 프론트엔드 서버를 시작합니다...
npm run dev

pause
