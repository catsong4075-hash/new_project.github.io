@echo off
chcp 65001 >nul
title 브라우저 자동 열기

:: 로그 파일 설정
set LOG_FILE=%~dp0logs\browser_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%.log
set LOG_FILE=%LOG_FILE: =0%

echo [%date% %time%] 브라우저 자동 열기 스크립트 시작 > "%LOG_FILE%"

echo.
echo ========================================
echo    브라우저 자동 열기
echo ========================================
echo.

:: 서버 상태 확인
echo [정보] 서버 상태를 확인합니다... >> "%LOG_FILE%"
echo [정보] 서버 상태를 확인합니다...

:: 프론트엔드 서버 상태 확인 (포트 5173)
netstat -an | findstr ":5173" >nul 2>&1
if %errorlevel% equ 0 (
    echo [성공] 프론트엔드 서버가 실행 중입니다. >> "%LOG_FILE%"
    echo [성공] 프론트엔드 서버가 실행 중입니다.
    
    :: 브라우저 열기 시도
    echo [정보] 브라우저를 열기 위해 http://localhost:5173에 접속합니다... >> "%LOG_FILE%"
    echo [정보] 브라우저를 열기 위해 http://localhost:5173에 접속합니다...
    
    :: 여러 방법으로 브라우저 열기 시도
    echo [정보] 방법 1: start 명령어로 브라우저 열기 시도... >> "%LOG_FILE%"
    start http://localhost:5173 >> "%LOG_FILE%" 2>&1
    
    :: 잠시 대기
    timeout /t 2 /nobreak >nul
    
    :: 브라우저가 열렸는지 확인
    tasklist | findstr /i "chrome.exe\|firefox.exe\|msedge.exe\|iexplore.exe" >nul 2>&1
    if %errorlevel% equ 0 (
        echo [성공] 브라우저가 열렸습니다! >> "%LOG_FILE%"
        echo [성공] 브라우저가 열렸습니다!
    ) else (
        echo [경고] 브라우저 자동 열기에 실패했습니다. >> "%LOG_FILE%"
        echo [경고] 브라우저 자동 열기에 실패했습니다.
        echo [정보] 수동으로 브라우저를 열어주세요: http://localhost:5173
    )
    
) else (
    echo [실패] 프론트엔드 서버가 실행되지 않았습니다. >> "%LOG_FILE%"
    echo [실패] 프론트엔드 서버가 실행되지 않았습니다.
    echo [정보] 먼저 start.bat을 실행하여 서버를 시작해주세요.
)

echo.
echo ========================================
echo    로그 정보
echo ========================================
echo 로그 파일: %LOG_FILE%
echo ========================================
echo.

echo [%date% %time%] 브라우저 자동 열기 스크립트 종료 >> "%LOG_FILE%"
pause
