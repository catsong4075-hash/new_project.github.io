# 오늘의 행운지수 🍀

사주를 기반으로 AI가 분석한 행운지수와 행운 강화법을 제공하는 웹 애플리케이션입니다.

## 🚀 빠른 시작

### 1. 서버 시작 (권장)

가장 간단한 방법으로 서버를 시작하려면:

```bash
# Windows
start.bat

# 또는 간단 버전
start-simple.bat
```

### 2. 수동으로 서버 시작

```bash
# 의존성 설치
cd frontend
npm install

# 백엔드 서버 시작 (새 터미널)
npm run mock:api

# 프론트엔드 서버 시작 (다른 터미널)
npm run dev
```

## 🌐 서버 정보

- **프론트엔드**: http://localhost:5173
- **백엔드 API**: http://localhost:3001
- **API 테스트**: http://localhost:3001/contents/1

## 🛠️ 개발 도구

### 배치 파일들

- `start.bat` - 전체 서버 시작 (권장)
- `start-simple.bat` - 간단한 서버 시작
- `check-servers.bat` - 서버 상태 확인
- `stop-servers.bat` - 모든 서버 중지
- `open-browser.bat` - 브라우저 자동 열기
- `view-logs.bat` - 로그 파일 뷰어
- `diagnose.bat` - 시스템 문제 진단

### npm 스크립트

```bash
npm run dev          # 프론트엔드 개발 서버
npm run mock:api     # 백엔드 모의 API 서버
npm run start:all    # 프론트엔드 + 백엔드 동시 시작
npm run build        # 프로덕션 빌드
npm run test         # 테스트 실행
```

## 🔑 OpenAI API 설정

AI 기능을 사용하려면:

1. `frontend/.env` 파일 생성
2. OpenAI API 키 설정:

```bash
VITE_OPENAI_API_KEY=your_api_key_here
VITE_OPENAI_API_BASE_URL=https://api.openai.com/v1
```

자세한 설정 방법은 `frontend/ENV_SETUP.md`를 참조하세요.

## 📁 프로젝트 구조

```
new_project/
├── frontend/                 # React + Vite 프론트엔드
│   ├── src/
│   │   ├── components/      # React 컴포넌트
│   │   ├── services/        # API 서비스
│   │   ├── config/          # 설정 파일
│   │   └── styles/          # CSS 스타일
│   ├── public/              # 정적 파일
│   └── package.json         # 의존성 및 스크립트
├── start.bat                # 서버 시작 스크립트
├── check-servers.bat        # 서버 상태 확인
└── stop-servers.bat         # 서버 중지
```

## 🎯 주요 기능

- **AI 기반 행운지수 분석** - OpenAI GPT 모델 사용
- **사주 기반 운세** - 생년월일, 시간, 성별 기반 분석
- **행운 강화법 제안** - 구체적인 실천 방법 제시
- **반응형 디자인** - 모바일/데스크톱 최적화
- **Fallback 시스템** - AI 실패 시 로컬 데이터 사용

## 🔧 기술 스택

- **프론트엔드**: React 19, Vite, CSS3
- **백엔드**: json-server (모의 API)
- **AI**: OpenAI GPT-3.5-turbo
- **개발 도구**: ESLint, Vitest

## 📱 사용법

1. `start.bat` 실행
2. 브라우저에서 http://localhost:5173 접속
3. 이름, 생년월일, 시간, 성별 입력
4. 개인정보 수집 동의 체크
5. "행운지수 확인하기" 클릭
6. AI 분석 결과 확인 및 공유

## 🚨 문제 해결

### 브라우저가 자동으로 열리지 않는 경우

1. **`diagnose.bat` 실행** - 시스템 문제 진단
2. **`open-browser.bat` 실행** - 브라우저 수동 열기
3. **로그 확인** - `view-logs.bat`로 오류 로그 확인
4. **수동 브라우저 열기** - http://localhost:5173 직접 접속

### 서버가 시작되지 않는 경우

1. **`diagnose.bat` 실행** - 시스템 환경 진단
2. Node.js 설치 확인: `node --version`
3. 포트 충돌 확인: `check-servers.bat` 실행
4. 의존성 재설치: `npm install`

### API 키 관련 문제

1. `.env` 파일 위치 확인
2. API 키 유효성 확인
3. 개발 서버 재시작

### 로그 확인 방법

모든 실행 과정은 `logs/` 디렉토리에 자동으로 저장됩니다:
- `start.bat` 실행 시: `start_YYYYMMDD_HHMMSS.log`
- `diagnose.bat` 실행 시: `diagnose_YYYYMMDD_HHMMSS.log`
- `open-browser.bat` 실행 시: `browser_YYYYMMDD_HHMMSS.log`

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

버그 리포트나 기능 제안은 이슈로 등록해주세요.

---

**즐거운 행운지수 확인하세요! 🍀✨**
