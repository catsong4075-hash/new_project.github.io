# 🚀 GitHub → Vercel 자동 배포 가이드

## 📋 개요

이 프로젝트는 GitHub Actions를 통해 Vercel로 자동 배포되도록 설정되어 있습니다. 
main 브랜치에 푸시하면 자동으로 빌드, 테스트, 배포가 실행됩니다.

## 🛠️ 사전 준비

### 1. Vercel 계정 및 프로젝트 설정

1. [Vercel](https://vercel.com)에 가입하고 로그인
2. 새 프로젝트 생성 (Import Git Repository)
3. GitHub 저장소 연결
4. 프로젝트 설정에서 다음 정보 확인:
   - **Organization ID** (`VERCEL_ORG_ID`)
   - **Project ID** (`VERCEL_PROJECT_ID`)

### 2. GitHub Secrets 설정

GitHub 저장소의 **Settings > Secrets and variables > Actions**에서 다음 시크릿을 추가:

```bash
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_org_id_here
VERCEL_PROJECT_ID=your_project_id_here
LHCI_GITHUB_APP_TOKEN=your_lighthouse_token_here
SNYK_TOKEN=your_snyk_token_here
```

#### Vercel Token 생성 방법:
1. Vercel 대시보드 → Settings → Tokens
2. "Create" 클릭
3. 토큰 이름 입력 (예: "GitHub Actions")
4. 토큰 복사하여 GitHub Secret에 저장

## 🔄 배포 프로세스

### 자동 배포 트리거
- `main` 또는 `develop` 브랜치에 푸시
- Pull Request 생성/업데이트
- 수동 워크플로우 실행

### 배포 단계
1. **코드 체크아웃** - GitHub 저장소에서 최신 코드 가져오기
2. **의존성 설치** - npm 패키지 설치
3. **프로젝트 빌드** - Vite 빌드 실행
4. **Vercel 배포** - 프로덕션 환경에 배포
5. **테스트 실행** - 단위 테스트 및 린팅
6. **성능 검사** - Lighthouse CI 실행
7. **보안 검사** - npm audit 및 Snyk 스캔
8. **상태 알림** - 배포 결과를 PR에 댓글로 알림

## 📁 프로젝트 구조

```
new_project/
├── index.html                 # 메인 진입점
├── vercel.json               # Vercel 설정
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions 워크플로우
├── api/                      # Vercel API 함수들
│   ├── health.js            # 헬스체크 API
│   └── luck.js              # 행운지수 API
├── frontend/
│   ├── public/              # 정적 파일들
│   │   ├── manifest.webmanifest
│   │   ├── service-worker.js
│   │   └── *.html          # 페이지들
│   ├── src/
│   │   └── styles/         # CSS 스타일 시스템
│   ├── package.json
│   └── .lighthouserc.js    # Lighthouse CI 설정
└── DEPLOYMENT.md            # 이 파일
```

## 🎯 주요 기능

### 1. 완전한 스타일 시스템
- **Design Tokens**: 색상, 타이포그래피, 간격, 그림자 등
- **Component Styles**: 버튼, 입력, 카드, 모달 등
- **Layout System**: 그리드, 플렉스박스, 반응형 유틸리티
- **Main Styles**: 통합된 메인 스타일시트

### 2. PWA 지원
- Service Worker로 오프라인 지원
- Web App Manifest
- 푸시 알림 지원
- 앱 설치 가능

### 3. API 엔드포인트
- `/api/health` - 시스템 상태 확인
- `/api/luck` - 행운지수 계산 (OpenAI 연동)

### 4. 자동화된 품질 관리
- 자동 테스트 실행
- Lighthouse 성능 검사
- 보안 취약점 스캔
- 코드 품질 검사

## 🔧 로컬 개발

### 1. 의존성 설치
```bash
cd frontend
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 빌드 테스트
```bash
npm run build
npm run preview
```

### 4. 테스트 실행
```bash
npm test
npm run lint
```

## 🚀 배포 확인

### 1. 배포 상태 확인
- GitHub Actions 탭에서 워크플로우 실행 상태 확인
- 각 단계별 성공/실패 여부 확인

### 2. Vercel 대시보드
- [Vercel 대시보드](https://vercel.com/dashboard)에서 프로젝트 상태 확인
- 배포된 URL에서 실제 동작 확인

### 3. 성능 모니터링
- Lighthouse CI 결과 확인
- Core Web Vitals 점수 모니터링
- 성능 지표 추적

## 🐛 문제 해결

### 일반적인 문제들

#### 1. 배포 실패
- GitHub Secrets가 올바르게 설정되었는지 확인
- Vercel 프로젝트가 올바르게 연결되었는지 확인
- 빌드 오류가 없는지 로그 확인

#### 2. API 오류
- 환경 변수가 올바르게 설정되었는지 확인
- CORS 설정 확인
- API 함수의 로직 오류 확인

#### 3. 성능 문제
- Lighthouse CI 결과 분석
- 번들 크기 최적화
- 이미지 최적화 확인

### 디버깅 방법

#### 1. 로그 확인
```bash
# GitHub Actions 로그
# Actions 탭 → 워크플로우 → 작업 → 로그

# Vercel 함수 로그
# Vercel 대시보드 → Functions → 로그
```

#### 2. 로컬 테스트
```bash
# Vercel CLI로 로컬 테스트
npm i -g vercel
vercel dev
```

#### 3. 환경 변수 확인
```bash
# Vercel 환경 변수 확인
vercel env ls
```

## 📈 성능 최적화

### 1. 이미지 최적화
- WebP/AVIF 포맷 사용
- 적절한 크기로 리사이징
- Lazy loading 적용

### 2. 코드 스플리팅
- 동적 import 사용
- 라우트별 코드 분할
- 번들 크기 모니터링

### 3. 캐싱 전략
- Service Worker 캐싱
- 정적 자산 캐싱
- API 응답 캐싱

## 🔒 보안 고려사항

### 1. 환경 변수
- 민감한 정보는 GitHub Secrets 사용
- 프로덕션 환경 변수는 Vercel에서 설정
- API 키 노출 방지

### 2. CORS 설정
- 필요한 도메인만 허용
- 적절한 HTTP 메서드 제한
- 보안 헤더 설정

### 3. 입력 검증
- 사용자 입력 데이터 검증
- XSS 공격 방지
- SQL 인젝션 방지

## 📚 추가 리소스

### 공식 문서
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)

### 유용한 도구
- [Vercel CLI](https://vercel.com/docs/cli)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Snyk](https://snyk.io/)

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

---

**문제가 있거나 질문이 있으시면 GitHub Issues를 통해 문의해주세요!** 🚀
