# 환경변수 설정 가이드

## OpenAI API 키 설정

이 프로젝트는 OpenAI API를 사용하여 행운지수를 AI로 분석합니다.

### 1. .env 파일 생성

프로젝트 루트 디렉토리(`frontend/`)에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# OpenAI API Configuration
VITE_OPENAI_API_KEY=your_actual_openai_api_key_here

# API Base URL (OpenAI)
VITE_OPENAI_API_BASE_URL=https://api.openai.com/v1

# Other API configurations
VITE_API_TIMEOUT=30000
```

### 2. OpenAI API 키 발급

1. [OpenAI 웹사이트](https://platform.openai.com/)에 가입/로그인
2. API Keys 섹션에서 새 API 키 생성
3. 생성된 키를 복사하여 `.env` 파일의 `VITE_OPENAI_API_KEY` 값으로 설정

### 3. 환경변수 확인

프로젝트를 실행하기 전에 다음을 확인하세요:

- `.env` 파일이 `frontend/` 디렉토리에 있는지 확인
- API 키가 올바르게 설정되었는지 확인
- `.env` 파일이 `.gitignore`에 포함되어 있는지 확인 (보안상 중요)

### 4. 개발 서버 실행

```bash
cd frontend
npm run dev
```

### 5. API 키 상태 확인

브라우저 개발자 도구 콘솔에서 다음 명령어로 API 키 상태를 확인할 수 있습니다:

```javascript
import { getApiStatus } from './src/services/luckApi.js';
console.log(getApiStatus());
```

### 주의사항

- **절대 API 키를 코드에 직접 하드코딩하지 마세요**
- **API 키를 GitHub 등에 공개하지 마세요**
- **`.env` 파일은 항상 `.gitignore`에 포함되어야 합니다**
- **프로덕션 환경에서는 서버 사이드에서 API 키를 관리하세요**

### 문제 해결

#### API 키가 인식되지 않는 경우:
1. `.env` 파일이 올바른 위치에 있는지 확인
2. 개발 서버를 재시작
3. 브라우저 캐시 삭제
4. `VITE_` 접두사가 올바르게 설정되었는지 확인

#### API 호출 실패 시:
1. API 키가 유효한지 확인
2. OpenAI 계정에 충분한 크레딧이 있는지 확인
3. 네트워크 연결 상태 확인
4. 브라우저 개발자 도구에서 오류 메시지 확인
