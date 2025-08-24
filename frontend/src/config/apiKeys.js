// OpenAI API Configuration
// API 키는 .env 파일에서 VITE_OPENAI_API_KEY로 설정됩니다.
// Vite의 define 옵션을 통해 클라이언트에 노출됩니다.

export const OPENAI_API_KEY = __OPENAI_API_KEY__;
export const OPENAI_API_BASE_URL = __OPENAI_API_BASE_URL__;

// API 키 유효성 검사
export const isApiKeyValid = () => {
  return OPENAI_API_KEY && OPENAI_API_KEY !== 'your_openai_api_key_here' && OPENAI_API_KEY !== 'undefined';
};

// API 기본 설정
export const OPENAI_API_CONFIG = {
  baseURL: OPENAI_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
  },
};
