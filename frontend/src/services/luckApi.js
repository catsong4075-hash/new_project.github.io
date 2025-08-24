import { calculateLuckIndex, checkApiKeyStatus } from './openaiApi.js';

const API_URL = 'http://localhost:3001';

/**
 * 행운지수 계산 API
 * OpenAI API를 우선 사용하고, 실패 시 로컬 모의 데이터를 사용합니다.
 */
export const getHoroscope = async (userData) => {
  try {
    // OpenAI API 키 상태 확인
    const apiStatus = checkApiKeyStatus();
    
    if (apiStatus.isValid) {
      console.log('OpenAI API를 사용하여 행운지수를 계산합니다:', userData);
      
      try {
        // OpenAI API를 통한 AI 분석
        const aiResult = await calculateLuckIndex(userData);
        console.log('AI 분석 결과:', aiResult);
        return aiResult;
      } catch (aiError) {
        console.warn('OpenAI API 호출 실패, 로컬 모의 데이터를 사용합니다:', aiError);
        // AI API 실패 시 로컬 데이터로 fallback
        return await getLocalHoroscope(userData);
      }
    } else {
      console.log('OpenAI API 키가 설정되지 않았습니다. 로컬 모의 데이터를 사용합니다.');
      return await getLocalHoroscope(userData);
    }
  } catch (error) {
    console.error('행운지수 계산 오류:', error);
    throw error;
  }
};

/**
 * 로컬 모의 데이터를 사용한 행운지수 계산 (fallback)
 */
async function getLocalHoroscope(userData) {
  try {
    console.log('로컬 모의 데이터를 사용합니다:', userData);
    
    // 기존 로컬 API 호출
    const response = await fetch(`${API_URL}/contents/1`);
    if (!response.ok) {
      throw new Error('Failed to fetch horoscope');
    }
    const data = await response.json();

    // 추천사항도 가져오기
    const recResponse = await fetch(`${API_URL}/recommendations?content_id=1`);
    if (!recResponse.ok) {
      throw new Error('Failed to fetch recommendations');
    }
    const recommendations = await recResponse.json();

    return { ...data, recommendations };
  } catch (error) {
    console.error('로컬 API 호출 오류:', error);
    throw error;
  }
}

/**
 * API 키 상태 확인
 */
export const getApiStatus = () => {
  return checkApiKeyStatus();
};
