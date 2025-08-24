@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title 시스템 진단

:: 진단 결과 로그 파일
set DIAGNOSE_LOG=%~dp0logs\diagnose_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%.log
set DIAGNOSE_LOG=%DIAGNOSE_LOG: =0%

echo [%date% %time%] 시스템 진단 시작 > "%DIAGNOSE_LOG%"

echo.
echo ========================================
echo    시스템 진단 도구
echo ========================================
echo.

echo [정보] 시스템 진단을 시작합니다...
echo [정보] 진단 결과는 %DIAGNOSE_LOG%에 저장됩니다.

:: 1. Node.js 진단
echo.
echo [1/6] Node.js 환경 진단...
echo [1/6] Node.js 환경 진단... >> "%DIAGNOSE_LOG%"

node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [성공] Node.js가 설치되어 있습니다. >> "%DIAGNOSE_LOG%"
    echo [성공] Node.js가 설치되어 있습니다.
    node --version >> "%DIAGNOSE_LOG%"
    node --version
) else (
    echo [실패] Node.js가 설치되지 않았습니다. >> "%DIAGNOSE_LOG%"
    echo [실패] Node.js가 설치되지 않았습니다.
)

:: 2. npm 진단
echo.
echo [2/6] npm 환경 진단...
echo [2/6] npm 환경 진단... >> "%DIAGNOSE_LOG%"

npm --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [성공] npm이 설치되어 있습니다. >> "%DIAGNOSE_LOG%"
    echo [성공] npm이 설치되어 있습니다.
    npm --version >> "%DIAGNOSE_LOG%"
    npm --version
) else (
    echo [실패] npm이 설치되지 않았습니다. >> "%DIAGNOSE_LOG%"
    echo [실패] npm이 설치되지 않았습니다.
)

:: 3. 프로젝트 구조 진단
echo.
echo [3/6] 프로젝트 구조 진단...
echo [3/6] 프로젝트 구조 진단... >> "%DIAGNOSE_LOG%"

if exist "frontend" (
    echo [성공] frontend 디렉토리가 존재합니다. >> "%DIAGNOSE_LOG%"
    echo [성공] frontend 디렉토리가 존재합니다.
    
    if exist "frontend\package.json" (
        echo [성공] package.json이 존재합니다. >> "%DIAGNOSE_LOG%"
        echo [성공] package.json이 존재합니다.
    ) else (
        echo [실패] package.json이 없습니다. >> "%DIAGNOSE_LOG%"
        echo [실패] package.json이 없습니다.
    )
) else (
    echo [실패] frontend 디렉토리가 없습니다. >> "%DIAGNOSE_LOG%"
    echo [실패] frontend 디렉토리가 없습니다.
)

:: 4. 포트 사용 상태 진단
echo.
echo [4/6] 포트 사용 상태 진단...
echo [4/6] 포트 사용 상태 진단... >> "%DIAGNOSE_LOG%"

:: 포트 5173 (Vite)
netstat -an | findstr ":5173" >nul 2>&1
if %errorlevel% equ 0 (
    echo [경고] 포트 5173이 이미 사용 중입니다. >> "%DIAGNOSE_LOG%"
    echo [경고] 포트 5173이 이미 사용 중입니다.
    netstat -an | findstr ":5173" >> "%DIAGNOSE_LOG%"
) else (
    echo [성공] 포트 5173이 사용 가능합니다. >> "%DIAGNOSE_LOG%"
    echo [성공] 포트 5173이 사용 가능합니다.
)

:: 포트 3001 (json-server)
netstat -an | findstr ":3001" >nul 2>&1
if %errorlevel% equ 0 (
    echo [경고] 포트 3001이 이미 사용 중입니다. >> "%DIAGNOSE_LOG%"
    echo [경고] 포트 3001이 이미 사용 중입니다.
    netstat -an | findstr ":3001" >> "%DIAGNOSE_LOG%"
) else (
    echo [성공] 포트 3001이 사용 가능합니다. >> "%DIAGNOSE_LOG%"
    echo [성공] 포트 3001이 사용 가능합니다.
)

:: 5. 브라우저 진단
echo.
echo [5/6] 브라우저 환경 진단...
echo [5/6] 브라우저 환경 진단... >> "%DIAGNOSE_LOG%"

:: 기본 브라우저 확인
reg query "HKEY_CURRENT_USER\Software\Microsoft\Windows\Shell\Associations\UrlAssociations\http\UserChoice" /v ProgId >nul 2>&1
if %errorlevel% equ 0 (
    echo [성공] 기본 브라우저가 설정되어 있습니다. >> "%DIAGNOSE_LOG%"
    echo [성공] 기본 브라우저가 설정되어 있습니다.
) else (
    echo [경고] 기본 브라우저 설정을 확인할 수 없습니다. >> "%DIAGNOSE_LOG%"
    echo [경고] 기본 브라우저 설정을 확인할 수 없습니다.
)

:: 6. 의존성 진단
echo.
echo [6/6] 프로젝트 의존성 진단...
echo [6/6] 프로젝트 의존성 진단... >> "%DIAGNOSE_LOG%"

if exist "frontend\node_modules" (
    echo [성공] node_modules가 존재합니다. >> "%DIAGNOSE_LOG%"
    echo [성공] node_modules가 존재합니다.
    
    :: package-lock.json 확인
    if exist "frontend\package-lock.json" (
        echo [성공] package-lock.json이 존재합니다. >> "%DIAGNOSE_LOG%"
        echo [성공] package-lock.json이 존재합니다.
    ) else (
        echo [경고] package-lock.json이 없습니다. >> "%DIAGNOSE_LOG%"
        echo [경고] package-lock.json이 없습니다.
    )
) else (
    echo [경고] node_modules가 없습니다. >> "%DIAGNOSE_LOG%"
    echo [경고] node_modules가 없습니다.
    echo [정보] npm install을 실행해야 합니다.
)

:: 진단 완료
echo.
echo ========================================
echo    진단 완료
echo ========================================
echo.
echo [정보] 진단이 완료되었습니다.
echo [정보] 결과는 %DIAGNOSE_LOG%에 저장되었습니다.
echo.
echo [권장사항]
if not exist "frontend\node_modules" (
    echo - npm install을 실행하여 의존성을 설치하세요.
)
if not exist "frontend\.env" (
    echo - .env 파일을 생성하여 OpenAI API 키를 설정하세요.
)
echo - start.bat을 실행하여 서버를 시작하세요.
echo.

echo [%date% %time%] 시스템 진단 완료 >> "%DIAGNOSE_LOG%"
pause
