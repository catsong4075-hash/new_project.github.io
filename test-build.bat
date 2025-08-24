@echo off
chcp 65001 >nul
echo ========================================
echo   로컬 빌드 테스트 스크립트
echo ========================================

echo.
echo 1. 의존성 설치 확인...
cd frontend
if not exist "node_modules" (
    echo node_modules가 없습니다. 의존성을 설치합니다...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ 의존성 설치 실패
        pause
        exit /b 1
    )
) else (
    echo ✅ 의존성 이미 설치됨
)

echo.
echo 2. 프로젝트 빌드 중...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ 빌드 실패
    pause
    exit /b 1
)
echo ✅ 빌드 완료

echo.
echo 3. 빌드 결과 확인...
if exist "dist" (
    echo ✅ dist 폴더 생성됨
    dir dist /b
) else (
    echo ❌ dist 폴더가 생성되지 않음
    pause
    exit /b 1
)

echo.
echo 4. 정적 자산 확인...
if exist "dist\index.html" (
    echo ✅ index.html 생성됨
) else (
    echo ❌ index.html이 생성되지 않음
)

if exist "dist\assets" (
    echo ✅ assets 폴더 생성됨
    dir dist\assets /b
) else (
    echo ❌ assets 폴더가 생성되지 않음
)

echo.
echo 5. 빌드 크기 확인...
for /f "tokens=3" %%i in ('dir dist /s ^| find "File(s)"') do (
    echo 총 파일 수: %%i
)

echo.
echo ✅ 빌드 테스트 완료!
echo.
echo 다음 단계:
echo 1. Vercel CLI 설치: npm install -g vercel
echo 2. 배포 실행: deploy-vercel.bat
echo.
pause
