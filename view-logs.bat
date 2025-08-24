@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title 로그 뷰어

echo.
echo ========================================
echo    로그 파일 뷰어
echo ========================================
echo.

:: logs 디렉토리 확인
if not exist "logs" (
    echo [오류] logs 디렉토리가 없습니다.
    echo 먼저 start.bat을 실행하여 로그를 생성해주세요.
    pause
    exit /b 1
)

:: 로그 파일 목록 표시
echo [정보] 사용 가능한 로그 파일들:
echo.

set count=0
for %%f in (logs\*.log) do (
    set /a count+=1
    echo !count!. %%~nf
)

if %count% equ 0 (
    echo [정보] 로그 파일이 없습니다.
    echo start.bat을 실행하여 로그를 생성해주세요.
    pause
    exit /b 0
)

echo.
echo [정보] 확인할 로그 파일 번호를 입력하세요 (1-%count%):
set /p choice=

:: 입력 검증
set /a choice_num=%choice% 2>nul
if %choice_num% leq 0 (
    echo [오류] 유효하지 않은 번호입니다.
    pause
    exit /b 1
)

if %choice_num% gtr %count% (
    echo [오류] 범위를 벗어난 번호입니다.
    pause
    exit /b 1
)

:: 선택된 로그 파일 찾기
set current=0
for %%f in (logs\*.log) do (
    set /a current+=1
    if !current! equ %choice_num% (
        echo.
        echo ========================================
        echo    로그 파일: %%~nf
        echo ========================================
        echo.
        
        :: 로그 내용 표시
        type "%%f"
        
        echo.
        echo ========================================
        echo 로그 파일 끝
        echo ========================================
        echo.
        
        :: 로그 파일을 메모장으로 열기 옵션
        echo [정보] 이 로그 파일을 메모장으로 열시겠습니까? (y/n)
        set /p open_editor=
        if /i "%open_editor%"=="y" (
            notepad "%%f"
        )
        
        goto :end
    )
)

:end
pause
