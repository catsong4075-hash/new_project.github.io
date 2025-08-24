/* ========================================
   LUCK INDEX API - Vercel Function
   ======================================== */

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // OPTIONS 요청 처리 (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // POST 요청만 허용
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({
      error: 'Method Not Allowed',
      message: '행운지수 API는 POST 요청만 지원합니다.',
      allowedMethods: ['POST']
    });
    return;
  }
  
  try {
    const { name, birthDate, birthTime, gender, calendarType } = req.body;
    
    // 필수 필드 검증
    if (!name || !birthDate || !birthTime || !gender || !calendarType) {
      res.status(400).json({
        error: 'Bad Request',
        message: '필수 필드가 누락되었습니다.',
        required: ['name', 'birthDate', 'birthTime', 'gender', 'calendarType'],
        received: Object.keys(req.body)
      });
      return;
    }
    
    // 나이 검증 (14세 미만 제한)
    const age = calculateAge(birthDate);
    if (age < 14) {
      res.status(400).json({
        error: 'Age Restriction',
        message: '14세 미만은 서비스를 이용할 수 없습니다.',
        age: age,
        minimumAge: 14
      });
      return;
    }
    
    // OpenAI API 키 확인
    const openaiApiKey = process.env.VITE_OPENAI_API_KEY;
    let luckResult;
    
    if (openaiApiKey && openaiApiKey !== 'your_openai_api_key_here') {
      try {
        // OpenAI API 호출
        luckResult = await callOpenAI({
          name,
          birthDate,
          birthTime,
          gender,
          calendarType,
          age
        });
      } catch (openaiError) {
        console.warn('OpenAI API 호출 실패, 로컬 모의 데이터 사용:', openaiError);
        luckResult = generateLocalLuckData({
          name,
          birthDate,
          birthTime,
          gender,
          calendarType,
          age
        });
      }
    } else {
      // 로컬 모의 데이터 사용
      luckResult = generateLocalLuckData({
        name,
        birthDate,
        birthTime,
        gender,
        calendarType,
        age
      });
    }
    
    // 응답 데이터 구성
    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        user: {
          name,
          birthDate,
          birthTime,
          gender,
          calendarType,
          age
        },
        luckIndex: luckResult.luckIndex,
        analysis: luckResult.analysis,
        recommendations: luckResult.recommendations,
        source: luckResult.source
      }
    };
    
    res.status(200).json(response);
    
  } catch (error) {
    console.error('Luck API error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: '행운지수 계산 중 오류가 발생했습니다.',
      timestamp: new Date().toISOString(),
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal error'
    });
  }
}

// 나이 계산 함수
function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

// OpenAI API 호출 함수
async function callOpenAI(userData) {
  const openaiApiKey = process.env.VITE_OPENAI_API_KEY;
  const openaiApiUrl = process.env.VITE_OPENAI_API_BASE_URL || 'https://api.openai.com/v1';
  
  const prompt = buildLuckIndexPrompt(userData);
  
  const response = await fetch(`${openaiApiUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '당신은 전문적인 사주 운세 분석가입니다. 사용자의 생년월일, 시간, 성별을 바탕으로 행운지수를 분석하고 구체적인 조언을 제공합니다.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    })
  });
  
  if (!response.ok) {
    throw new Error(`OpenAI API 오류: ${response.status}`);
  }
  
  const data = await response.json();
  const content = data.choices[0].message.content;
  
  return parseOpenAIResponse(content, userData);
}

// 프롬프트 구성 함수
function buildLuckIndexPrompt(userData) {
  const { name, birthDate, birthTime, gender, calendarType, age } = userData;
  
  return `
사용자 정보:
- 이름: ${name}
- 생년월일: ${birthDate}
- 태어난 시간: ${birthTime}
- 성별: ${gender}
- 달력 유형: ${calendarType}
- 나이: ${age}세

위 정보를 바탕으로 다음 형식으로 응답해주세요:

행운지수: [0-100 사이의 숫자]
분석: [사주 기반 상세 분석]
추천사항: [구체적인 행운 강화 방법 3가지]

응답은 JSON 형식으로 해주세요:
{
  "luckIndex": 숫자,
  "analysis": "분석 내용",
  "recommendations": ["추천1", "추천2", "추천3"]
}
`;
}

// OpenAI 응답 파싱 함수
function parseOpenAIResponse(content, userData) {
  try {
    // JSON 추출 시도
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        luckIndex: parsed.luckIndex || generateRandomLuckIndex(),
        analysis: parsed.analysis || 'AI 분석 결과를 파싱할 수 없습니다.',
        recommendations: parsed.recommendations || generateDefaultRecommendations(),
        source: 'openai'
      };
    }
  } catch (error) {
    console.warn('OpenAI 응답 파싱 실패:', error);
  }
  
  // 파싱 실패 시 기본값 반환
  return {
    luckIndex: generateRandomLuckIndex(),
    analysis: content || 'AI 분석 결과를 처리할 수 없습니다.',
    recommendations: generateDefaultRecommendations(),
    source: 'openai_fallback'
  };
}

// 로컬 모의 데이터 생성 함수
function generateLocalLuckData(userData) {
  const { name, birthDate, birthTime, gender, calendarType, age } = userData;
  
  // 생년월일과 시간을 기반으로 일관된 행운지수 생성
  const dateHash = hashString(`${birthDate}${birthTime}${gender}`);
  const luckIndex = 50 + (dateHash % 51); // 50-100 사이
  
  const analysis = generateLocalAnalysis(userData, luckIndex);
  const recommendations = generateLocalRecommendations(luckIndex);
  
  return {
    luckIndex,
    analysis,
    recommendations,
    source: 'local_mock'
  };
}

// 문자열 해시 함수
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32비트 정수로 변환
  }
  return Math.abs(hash);
}

// 로컬 분석 생성 함수
function generateLocalAnalysis(userData, luckIndex) {
  const { name, birthDate, birthTime, gender, calendarType, age } = userData;
  
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = parseInt(birthTime.split(':')[0]);
  
  let analysis = `${name}님의 ${month}월 ${day}일 ${birthTime} 출생 운세를 분석한 결과, `;
  
  if (luckIndex >= 80) {
    analysis += '매우 좋은 행운의 기운이 감지됩니다. 특히 금년은 성공과 번영의 해가 될 것입니다.';
  } else if (luckIndex >= 60) {
    analysis += '양호한 행운의 기운이 감지됩니다. 노력하면 좋은 결과를 얻을 수 있을 것입니다.';
  } else if (luckIndex >= 40) {
    analysis += '보통 수준의 행운입니다. 차분히 준비하면 기회를 잡을 수 있을 것입니다.';
  } else {
    analysis += '현재는 행운이 다소 부족하지만, 인내와 노력으로 극복할 수 있습니다.';
  }
  
  // 시간대별 특성 추가
  if (hour >= 6 && hour < 12) {
    analysis += ' 아침 시간대 출생으로 활발하고 긍정적인 에너지를 가지고 있습니다.';
  } else if (hour >= 12 && hour < 18) {
    analysis += ' 오후 시간대 출생으로 안정적이고 신중한 성격을 가지고 있습니다.';
  } else if (hour >= 18 && hour < 24) {
    analysis += ' 저녁 시간대 출생으로 창의적이고 직관적인 능력을 가지고 있습니다.';
  } else {
    analysis += ' 새벽 시간대 출생으로 독창적이고 혁신적인 아이디어를 가지고 있습니다.';
  }
  
  return analysis;
}

// 로컬 추천사항 생성 함수
function generateLocalRecommendations(luckIndex) {
  const recommendations = [];
  
  if (luckIndex >= 80) {
    recommendations.push(
      '현재의 좋은 기운을 활용하여 새로운 도전을 시도해보세요.',
      '주변 사람들과의 소통을 활발히 하여 더 큰 기회를 만들어보세요.',
      '긍정적인 마음가짐을 유지하여 행운을 지속시켜보세요.'
    );
  } else if (luckIndex >= 60) {
    recommendations.push(
      '꾸준한 노력과 준비로 더 좋은 결과를 만들어보세요.',
      '주변의 도움을 받아 함께 성장해보세요.',
      '작은 성공을 축하하며 자신감을 키워보세요.'
    );
  } else if (luckIndex >= 40) {
    recommendations.push(
      '차분히 상황을 파악하고 계획을 세워보세요.',
      '기존의 경험과 지식을 활용하여 새로운 방법을 찾아보세요.',
      '인내심을 가지고 기회를 기다려보세요.'
    );
  } else {
    recommendations.push(
      '현재의 어려움을 극복할 수 있는 방법을 찾아보세요.',
      '주변의 도움을 요청하고 함께 해결해보세요.',
      '긍정적인 마음가짐으로 새로운 시작을 준비해보세요.'
    );
  }
  
  return recommendations;
}

// 랜덤 행운지수 생성 함수
function generateRandomLuckIndex() {
  return Math.floor(Math.random() * 41) + 30; // 30-70 사이
}

// 기본 추천사항 생성 함수
function generateDefaultRecommendations() {
  return [
    '매일 작은 목표를 세우고 달성해보세요.',
    '주변 사람들과의 관계를 소중히 여기세요.',
    '긍정적인 마음가짐을 유지하세요.'
  ];
}
