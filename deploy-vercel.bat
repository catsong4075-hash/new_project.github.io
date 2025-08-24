@echo off
chcp 65001 >nul
echo ========================================
echo   Vercel 배포 스크립트
echo ========================================

echo.
echo 1. 프로젝트 빌드 중...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ 빌드 실패
    pause
    exit /b 1
)
echo ✅ 빌드 완료

echo.
echo 2. Vercel CLI 설치 확인...
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI가 설치되지 않았습니다. 설치 중...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ Vercel CLI 설치 실패
        pause
        exit /b 1
    )
)
echo ✅ Vercel CLI 확인됨

echo.
echo 3. Vercel 배포 중...
cd ..
vercel --prod
if %errorlevel% neq 0 (
    echo ❌ 배포 실패
    pause
    exit /b 1
)

echo.
echo ✅ Vercel 배포 완료!
echo.
echo 다음 단계:
echo 1. Vercel 대시보드에서 환경 변수 설정
echo 2. 도메인 설정 확인
echo 3. API 엔드포인트 테스트
echo.
pause
