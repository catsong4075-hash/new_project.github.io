import { OPENAI_API_KEY, OPENAI_API_BASE_URL, isApiKeyValid } from '../config/apiKeys.js';

/**
 * OpenAI API 서비스
 * 행운지수 계산을 위한 AI 분석 기능을 제공합니다.
 */

class OpenAIService {
  constructor() {
    if (!isApiKeyValid()) {
      console.warn('OpenAI API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.');
    }
  }

  /**
   * OpenAI API 호출을 위한 기본 설정
   */
  getApiConfig() {
    return {
      baseURL: OPENAI_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
    };
  }

  /**
   * 행운지수 계산을 위한 AI 분석
   * @param {Object} userData - 사용자 정보
   * @param {string} userData.name - 이름
   * @param {string} userData.birthDate - 생년월일
   * @param {string} userData.birthTime - 태어난 시간
   * @param {string} userData.gender - 성별
   * @param {string} userData.calendarType - 달력 유형 (양력/음력)
   * @returns {Promise<Object>} AI 분석 결과
   */
  async calculateLuckIndex(userData) {
    if (!isApiKeyValid()) {
      throw new Error('OpenAI API 키가 설정되지 않았습니다.');
    }

    try {
      const prompt = this.buildLuckIndexPrompt(userData);
      
      const response = await fetch(`${OPENAI_API_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: '당신은 전문적인 사주 분석가입니다. 사용자의 생년월일과 시간을 바탕으로 오늘의 행운지수를 분석하고, 구체적인 행운 강화법을 제시합니다.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API 오류: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      return this.parseLuckIndexResponse(data);
    } catch (error) {
      console.error('OpenAI API 호출 오류:', error);
      throw error;
    }
  }

  /**
   * 행운지수 계산을 위한 프롬프트 생성
   */
  buildLuckIndexPrompt(userData) {
    const { name, birthDate, birthTime, gender, calendarType } = userData;
    
    return `
사용자 정보:
- 이름: ${name}
- 생년월일: ${birthDate} (${calendarType})
- 태어난 시간: ${birthTime || '모름'}
- 성별: ${gender}

위 정보를 바탕으로 오늘의 행운지수를 분석해주세요.

응답 형식:
{
  "luckIndex": 85,
  "luckScore": "상",
  "analysis": "오늘의 운세 분석 내용...",
  "recommendations": [
    "행운 강화법 1",
    "행운 강화법 2",
    "행운 강화법 3"
  ],
  "luckyColor": "파란색",
  "luckyNumber": 7,
  "luckyDirection": "동쪽"
}

JSON 형식으로만 응답해주세요.
    `.trim();
  }

  /**
   * OpenAI API 응답을 파싱하여 행운지수 결과로 변환
   */
  parseLuckIndexResponse(apiResponse) {
    try {
      const content = apiResponse.choices[0]?.message?.content;
      if (!content) {
        throw new Error('API 응답에서 내용을 찾을 수 없습니다.');
      }

      // JSON 파싱 시도
      const parsedData = JSON.parse(content);
      
      // 기본값 설정
      return {
        luckIndex: parsedData.luckIndex || 75,
        luckScore: parsedData.luckScore || '중',
        analysis: parsedData.analysis || '오늘은 평범한 하루입니다.',
        recommendations: parsedData.recommendations || ['긍정적인 마음가짐을 유지하세요.'],
        luckyColor: parsedData.luckyColor || '빨간색',
        luckyNumber: parsedData.luckyNumber || 1,
        luckyDirection: parsedData.luckyDirection || '남쪽',
        timestamp: new Date().toISOString(),
      };
    } catch (parseError) {
      console.error('API 응답 파싱 오류:', parseError);
      
      // 파싱 실패 시 기본 응답 반환
      return {
        luckIndex: 75,
        luckScore: '중',
        analysis: 'AI 분석 중 오류가 발생했습니다. 기본 운세를 제공합니다.',
        recommendations: ['긍정적인 마음가짐을 유지하세요.', '주변 사람들과의 소통을 늘리세요.'],
        luckyColor: '빨간색',
        luckyNumber: 1,
        luckyDirection: '남쪽',
        timestamp: new Date().toISOString(),
        error: 'AI 분석 실패',
      };
    }
  }

  /**
   * API 키 상태 확인
   */
  checkApiKeyStatus() {
    return {
      isValid: isApiKeyValid(),
      hasKey: !!OPENAI_API_KEY,
      baseURL: OPENAI_API_BASE_URL,
    };
  }
}

// 싱글톤 인스턴스 생성
export const openAIService = new OpenAIService();

// 개별 함수들도 export
export const calculateLuckIndex = (userData) => openAIService.calculateLuckIndex(userData);
export const checkApiKeyStatus = () => openAIService.checkApiKeyStatus();
