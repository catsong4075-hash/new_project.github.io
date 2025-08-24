@echo off
chcp 65001 >nul
title 오늘의 행운지수 - 개발 서버

:: 로그 파일 설정
set LOG_FILE=%~dp0logs\start_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%.log
set LOG_FILE=%LOG_FILE: =0%

:: 로그 시작
echo [%date% %time%] 서버 시작 스크립트 실행 > "%LOG_FILE%"

echo.
echo ========================================
echo    오늘의 행운지수 개발 서버 시작
echo ========================================
echo.

:: 로그에 출력
echo [%date% %time%] 서버 시작 스크립트 실행 >> "%LOG_FILE%"

:: Node.js 설치 확인
echo [정보] Node.js 설치 상태를 확인합니다... >> "%LOG_FILE%"
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [오류] Node.js가 설치되지 않았습니다. >> "%LOG_FILE%"
    echo [오류] Node.js가 설치되지 않았습니다.
    echo https://nodejs.org 에서 Node.js를 다운로드하여 설치해주세요.
    echo [%date% %time%] Node.js 설치 오류로 종료 >> "%LOG_FILE%"
    pause
    exit /b 1
)

:: npm 설치 확인
echo [정보] npm 설치 상태를 확인합니다... >> "%LOG_FILE%"
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [오류] npm이 설치되지 않았습니다. >> "%LOG_FILE%"
    echo [오류] npm이 설치되지 않았습니다.
    echo [%date% %time%] npm 설치 오류로 종료 >> "%LOG_FILE%"
    pause
    exit /b 1
)

echo [정보] Node.js 버전: >> "%LOG_FILE%"
node --version >> "%LOG_FILE%" 2>&1
echo [정보] Node.js 버전: 
node --version
echo [정보] npm 버전: >> "%LOG_FILE%"
npm --version >> "%LOG_FILE%" 2>&1
echo [정보] npm 버전: 
npm --version
echo.

:: frontend 디렉토리로 이동
echo [정보] frontend 디렉토리로 이동합니다... >> "%LOG_FILE%"
cd /d "%~dp0frontend"
echo [정보] 현재 디렉토리: %CD% >> "%LOG_FILE%"

:: 의존성 설치 확인
if not exist "node_modules" (
    echo [정보] 프론트엔드 의존성을 설치합니다... >> "%LOG_FILE%"
    echo [정보] 프론트엔드 의존성을 설치합니다...
    npm install >> "%LOG_FILE%" 2>&1
    if %errorlevel% neq 0 (
        echo [오류] 의존성 설치에 실패했습니다. >> "%LOG_FILE%"
        echo [오류] 의존성 설치에 실패했습니다.
        echo [%date% %time%] 의존성 설치 실패로 종료 >> "%LOG_FILE%"
        pause
        exit /b 1
    )
    echo [성공] 의존성 설치 완료 >> "%LOG_FILE%"
    echo [성공] 의존성 설치 완료
    echo.
)

:: .env 파일 확인
if not exist ".env" (
    echo [경고] .env 파일이 없습니다. >> "%LOG_FILE%"
    echo [경고] .env 파일이 없습니다.
    echo OpenAI API 키를 사용하려면 .env 파일을 생성해주세요.
    echo.
    echo .env 파일 예시:
    echo VITE_OPENAI_API_KEY=your_api_key_here
    echo VITE_OPENAI_API_BASE_URL=https://api.openai.com/v1
    echo.
    echo 계속 진행하시겠습니까? (y/n)
    set /p continue=
    if /i not "%continue%"=="y" (
        echo [정보] 사용자가 서버 시작을 취소했습니다. >> "%LOG_FILE%"
        echo 서버 시작을 취소했습니다.
        echo [%date% %time%] 사용자 취소로 종료 >> "%LOG_FILE%"
        pause
        exit /b 0
    )
    echo.
)

:: 백엔드 서버 시작 (새 창에서)
echo [정보] 백엔드 서버를 시작합니다... >> "%LOG_FILE%"
echo [정보] 백엔드 서버를 시작합니다...
start "백엔드 서버" cmd /k "cd /d \"%~dp0frontend\" && npm run mock:api"

:: 잠시 대기
echo [정보] 백엔드 서버 시작 후 3초 대기... >> "%LOG_FILE%"
timeout /t 3 /nobreak >nul

:: 브라우저 자동 열기 시도
echo [정보] 브라우저 자동 열기를 시도합니다... >> "%LOG_FILE%"
echo [정보] 브라우저 자동 열기를 시도합니다...

:: 프론트엔드 서버가 시작될 때까지 대기
echo [정보] 프론트엔드 서버 시작을 기다립니다... >> "%LOG_FILE%"
echo [정보] 프론트엔드 서버 시작을 기다립니다...

:: 서버 시작 후 5초 대기
timeout /t 5 /nobreak >nul

:: 기본 브라우저로 localhost:5173 열기
echo [정보] 브라우저를 열기 위해 http://localhost:5173에 접속합니다... >> "%LOG_FILE%"
start http://localhost:5173 >> "%LOG_FILE%" 2>&1
if %errorlevel% equ 0 (
    echo [성공] 브라우저가 자동으로 열렸습니다. >> "%LOG_FILE%"
    echo [성공] 브라우저가 자동으로 열렸습니다.
) else (
    echo [경고] 브라우저 자동 열기에 실패했습니다. >> "%LOG_FILE%"
    echo [경고] 브라우저 자동 열기에 실패했습니다.
    echo [정보] 수동으로 브라우저를 열어주세요: http://localhost:5173
)

:: 프론트엔드 서버 시작
echo [정보] 프론트엔드 서버를 시작합니다... >> "%LOG_FILE%"
echo [정보] 프론트엔드 서버를 시작합니다...
echo [정보] 브라우저가 자동으로 열립니다...
echo.
echo ========================================
echo    서버 정보
echo ========================================
echo 프론트엔드: http://localhost:5173
echo 백엔드 API: http://localhost:3001
echo ========================================
echo.
echo 서버를 중지하려면 이 창을 닫거나 Ctrl+C를 누르세요.
echo 로그 파일: %LOG_FILE%
echo.

:: 프론트엔드 서버 시작 (로그와 함께)
echo [%date% %time%] 프론트엔드 서버 시작 >> "%LOG_FILE%"
npm run dev >> "%LOG_FILE%" 2>&1

echo.
echo [%date% %time%] 서버가 종료되었습니다. >> "%LOG_FILE%"
echo [정보] 서버가 종료되었습니다.
echo [정보] 로그 파일: %LOG_FILE%
pause
