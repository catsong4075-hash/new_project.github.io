@echo off
chcp 65001 >nul
title 서버 테스트

echo.
echo ========================================
echo    서버 상태 테스트
echo ========================================
echo.

:: 백엔드 서버 테스트 (포트 3001)
echo [테스트] 백엔드 서버 상태 확인...
netstat -an | findstr ":3001" >nul 2>&1
if %errorlevel% equ 0 (
    echo [성공] 백엔드 서버가 실행 중입니다 (포트 3001)
) else (
    echo [실패] 백엔드 서버가 실행되지 않았습니다
)

:: 프론트엔드 서버 테스트 (포트 5173)
echo [테스트] 프론트엔드 서버 상태 확인...
netstat -an | findstr ":5173" >nul 2>&1
if %errorlevel% equ 0 (
    echo [성공] 프론트엔드 서버가 실행 중입니다 (포트 5173)
) else (
    echo [실패] 프론트엔드 서버가 실행되지 않았습니다
)

echo.
echo ========================================
echo    브라우저 테스트
echo ========================================
echo.

:: 브라우저 열기 테스트
echo [테스트] 브라우저 자동 열기...
start http://localhost:5173
if %errorlevel% equ 0 (
    echo [성공] 브라우저가 열렸습니다!
) else (
    echo [실패] 브라우저 열기에 실패했습니다
)

echo.
echo ========================================
echo    테스트 완료
echo ========================================
echo.
echo [정보] 모든 테스트가 완료되었습니다.
echo [정보] 문제가 있다면 diagnose.bat을 실행해보세요.
echo.

pause
