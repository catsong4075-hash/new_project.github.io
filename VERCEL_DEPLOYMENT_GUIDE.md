# Vercel 배포 가이드 🚀

## 개요
이 프로젝트는 Vite 기반 React SPA + 서버리스 API 구조로 설계되었으며, Vercel에 최적화되어 배포됩니다.

## 🏗️ 프로젝트 구조
```
new_project/
├── frontend/                 # Vite React 프론트엔드
│   ├── src/                 # 소스 코드
│   ├── public/              # 정적 자산
│   ├── package.json         # 의존성 및 스크립트
│   └── vite.config.js       # Vite 설정
├── api/                     # Vercel 서버리스 함수
│   ├── health.js           # 헬스체크 API
│   └── luck.js             # 행운지수 계산 API
├── vercel.json             # Vercel 배포 설정
├── index.html              # 메인 진입점
└── deploy-vercel.bat       # 배포 스크립트
```

## 🚀 배포 단계

### 1단계: 사전 준비
- [Vercel 계정 생성](https://vercel.com/signup)
- [GitHub 계정 연결](https://vercel.com/docs/git)
- Node.js 18+ 설치 확인

### 2단계: 로컬 빌드 테스트
```bash
cd frontend
npm install
npm run build
```
- `frontend/dist/` 폴더가 생성되는지 확인
- 빌드 오류가 없는지 확인

### 3단계: Vercel CLI 설치
```bash
npm install -g vercel
```

### 4단계: 프로젝트 배포
```bash
# 프로젝트 루트에서
vercel
```

또는 배포 스크립트 사용:
```bash
deploy-vercel.bat
```

### 5단계: 환경 변수 설정
Vercel 대시보드 → Project Settings → Environment Variables에서 다음 설정:

| 변수명 | 값 | 설명 |
|--------|-----|------|
| `VITE_OPENAI_API_KEY` | `your_api_key` | OpenAI API 키 |
| `VITE_OPENAI_API_BASE_URL` | `https://api.openai.com/v1` | OpenAI API 기본 URL |
| `NODE_ENV` | `production` | 환경 설정 |

### 6단계: 도메인 설정
- Vercel에서 제공하는 기본 도메인 확인
- 커스텀 도메인 연결 (선택사항)

## ⚙️ vercel.json 설정 설명

### 핵심 설정
- **framework**: `vite` - Vite 프레임워크 인식
- **buildCommand**: `cd frontend && npm run build` - 빌드 명령
- **outputDirectory**: `frontend/dist` - 빌드 출력 폴더
- **regions**: `["icn1", "hnd1"]` - 한국/일본 리전 우선

### 라우팅 설정
```json
"rewrites": [
  { "source": "/api/(.*)", "destination": "/api/$1" },     // API 라우팅
  { "source": "/assets/(.*)", "destination": "/assets/$1" }, // 정적 자산
  { "source": "/(.*)", "destination": "/index.html" }      // SPA 라우팅
]
```

### 보안 헤더
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### 캐시 전략
- **정적 자산**: `max-age=31536000, immutable` (1년)
- **HTML**: `no-cache` (항상 최신)
- **서비스워커**: `no-cache` (업데이트 보장)

## 🔧 API 엔드포인트

### 헬스체크
```
GET /api/health
```

### 행운지수 계산
```
POST /api/luck
Content-Type: application/json

{
  "name": "사용자명",
  "birthDate": "1990-01-01",
  "birthTime": "12:00",
  "gender": "남성",
  "calendarType": "양력"
}
```

## 📱 PWA 기능

### 서비스워커
- 오프라인 지원
- 백그라운드 동기화
- 푸시 알림

### 매니페스트
- 앱 설치 가능
- 홈 화면 추가
- 스플래시 스크린

## 🧪 배포 후 테스트

### 1. 기본 기능 테스트
- 메인 페이지 로딩
- API 엔드포인트 응답
- PWA 설치 기능

### 2. 성능 테스트
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)

### 3. 모바일 테스트
- 반응형 디자인
- 터치 인터페이스
- PWA 동작

## 🚨 문제 해결

### 빌드 실패
```bash
# 의존성 재설치
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API 오류
- 환경 변수 설정 확인
- CORS 설정 확인
- 함수 로그 확인

### 배포 실패
```bash
# Vercel CLI 재설치
npm uninstall -g vercel
npm install -g vercel

# 프로젝트 재연결
vercel --remove
vercel
```

## 📚 추가 리소스

- [Vercel 공식 문서](https://vercel.com/docs)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)
- [PWA 가이드](https://web.dev/progressive-web-apps/)
- [서버리스 함수](https://vercel.com/docs/functions)

## 🎯 최적화 팁

1. **이미지 최적화**: WebP 포맷 사용, 적절한 크기 제공
2. **코드 분할**: React.lazy() 사용하여 번들 크기 최적화
3. **캐싱 전략**: 정적 자산은 장기 캐시, 동적 콘텐츠는 적절한 TTL
4. **CDN 활용**: Vercel의 글로벌 CDN 자동 활용

---

**배포 완료 후**: 프로젝트 URL을 확인하고 모든 기능이 정상 작동하는지 테스트하세요! 🎉
