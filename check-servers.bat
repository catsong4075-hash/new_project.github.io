@echo off
chcp 65001 >nul
title 서버 상태 확인

echo.
echo ========================================
echo    서버 상태 확인
echo ========================================
echo.

:: 프론트엔드 서버 상태 확인
echo [정보] 프론트엔드 서버 상태 확인 중... (포트 5173)
curl -s http://localhost:5173 >nul 2>&1
if %errorlevel% equ 0 (
    echo [성공] 프론트엔드 서버가 실행 중입니다.
) else (
    echo [실패] 프론트엔드 서버가 실행되지 않았습니다.
)

:: 백엔드 API 서버 상태 확인
echo [정보] 백엔드 API 서버 상태 확인 중... (포트 3001)
curl -s http://localhost:3001 >nul 2>&1
if %errorlevel% equ 0 (
    echo [성공] 백엔드 API 서버가 실행 중입니다.
) else (
    echo [실패] 백엔드 API 서버가 실행되지 않았습니다.
)

echo.
echo ========================================
echo    서버 URL 정보
echo ========================================
echo 프론트엔드: http://localhost:5173
echo 백엔드 API: http://localhost:3001
echo API 테스트: http://localhost:3001/contents/1
echo ========================================
echo.

pause
