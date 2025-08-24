# 행운지수 계산기 Frontend

생년월일과 출생시간을 기반으로 개인의 행운지수를 계산하고, 오늘의 운세와 추천 사항을 제공하는 웹 애플리케이션입니다.

## 🚀 주요 기능

- **행운지수 계산**: 생년월일과 출생시간을 입력하여 개인별 행운지수 계산
- **운세 제공**: 오늘의 운세와 각 분야별 운세 정보 제공
- **추천 사항**: 개인별 맞춤 추천 사항 제공
- **결과 공유**: 계산된 결과를 카드 형태로 공유 가능
- **반응형 디자인**: 모바일과 데스크톱에서 모두 사용 가능

## 🛠 기술 스택

- **Frontend**: React 18, Vite
- **라우팅**: React Router DOM
- **상태 관리**: React Context API
- **스타일링**: CSS Variables, CSS Modules
- **개발 도구**: ESLint, Vite

## 📁 프로젝트 구조

```
frontend/
├── public/                    # 정적 파일
│   └── index.html
├── src/
│   ├── assets/               # 이미지, 아이콘, 폰트
│   │   ├── images/
│   │   └── icons/
│   ├── components/           # 재사용 가능한 UI 컴포넌트
│   │   ├── common/          # 버튼, 입력창 등 범용 컴포넌트
│   │   ├── layout/          # Header, Footer 등 레이아웃 컴포넌트
│   │   └── specific/        # 행운지수 게이지, 추천 카드 등 특화 컴포넌트
│   ├── pages/               # 페이지 단위 라우팅 구성
│   ├── services/            # API 호출 로직
│   ├── hooks/               # 커스텀 훅
│   ├── utils/               # 유틸 함수
│   ├── contexts/            # 전역 상태관리
│   ├── styles/              # 전역 스타일 및 변수
│   ├── router/              # 라우팅 설정
│   ├── App.jsx              # 최상위 컴포넌트
│   └── main.jsx             # 진입점
├── SITEMAP/                 # 사이트맵 관리
├── vite.config.js           # Vite 설정
└── package.json             # 프로젝트 의존성
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 16.0.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```

3. **브라우저에서 확인**
   ```
   http://localhost:3000
   ```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 📱 페이지 구성

- **홈페이지** (`/`): 행운지수 계산 폼
- **결과 페이지** (`/result`): 계산된 행운지수와 운세 결과
- **공유 페이지** (`/share`): 결과 공유 카드 생성
- **소개 페이지** (`/about`): 서비스 소개
- **에러 페이지** (`/error`): 예외처리 페이지

## 🎨 컴포넌트 구조

### 공통 컴포넌트 (common/)
- `Button.jsx`: 재사용 가능한 버튼 컴포넌트
- `InputField.jsx`: 입력 필드 컴포넌트

### 레이아웃 컴포넌트 (layout/)
- `Header.jsx`: 헤더 네비게이션
- `Footer.jsx`: 푸터 정보

### 특화 컴포넌트 (specific/)
- `LuckGauge.jsx`: 행운지수 게이지 표시
- `RecommendationCard.jsx`: 추천 사항 카드
- `HoroscopePreviewCard.jsx`: 운세 미리보기 카드

## 🔧 개발 가이드

### 새로운 컴포넌트 추가

1. 적절한 디렉토리에 컴포넌트 파일 생성
2. 컴포넌트 스타일링 (CSS 모듈 또는 인라인 스타일)
3. 필요한 경우 Storybook 스토리 추가

### API 연동

1. `src/services/` 디렉토리에 API 함수 추가
2. 환경 변수 설정 (`.env` 파일)
3. 에러 처리 및 로딩 상태 관리

### 스타일링

- CSS Variables를 사용한 일관된 디자인 시스템
- 반응형 디자인 지원
- 접근성 고려

## 📦 배포

### 정적 호스팅 (Netlify, Vercel 등)

```bash
npm run build
```

빌드된 `dist` 폴더를 호스팅 서비스에 업로드

### Docker 배포

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

- 이메일: support@luckcalculator.com
- 문의: 02-1234-5678 