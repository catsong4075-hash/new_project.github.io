// 행운지수 계산 API 서비스

// 임시 데이터 생성 함수 (실제로는 서버 API 호출)
const generateMockLuckData = (formData) => {
  const { name, birthDate, birthTime } = formData
  
  // 생년월일을 기반으로 행운지수 계산 (임시 로직)
  const birthYear = new Date(birthDate).getFullYear()
  const birthMonth = new Date(birthDate).getMonth() + 1
  const birthDay = new Date(birthDate).getDate()
  
  // 간단한 행운지수 계산 (실제로는 복잡한 알고리즘 사용)
  const baseScore = (birthYear + birthMonth + birthDay) % 100
  const timeBonus = birthTime ? parseInt(birthTime.split(':')[0]) * 2 : 0
  const luckScore = Math.min(baseScore + timeBonus, 100)
  
  // 추천 항목 생성
  const recommendations = [
    {
      title: '운동하기 좋은 날',
      description: '오늘은 특히 유산소 운동이 행운을 가져올 것입니다.',
      category: 'health',
      priority: 'high',
      icon: '🏃‍♂️'
    },
    {
      title: '새로운 도전',
      description: '새로운 프로젝트나 학습에 도전해보세요.',
      category: 'career',
      priority: 'medium',
      icon: '💼'
    },
    {
      title: '친구와 만남',
      description: '오랜 친구와 연락하거나 만나면 좋은 일이 있을 것입니다.',
      category: 'social',
      priority: 'low',
      icon: '👥'
    }
  ]
  
  // 운세 데이터 생성
  const zodiacSigns = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
  const randomSign = zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)]
  
  const horoscope = {
    sign: randomSign,
    date: new Date().toLocaleDateString('ko-KR'),
    general: '오늘은 전반적으로 좋은 기운이 감지됩니다. 긍정적인 마음가짐으로 하루를 시작하세요.',
    love: '연애운이 상승하는 날입니다. 솔직한 마음을 표현해보세요.',
    career: '업무에서 새로운 아이디어가 떠오를 수 있습니다. 창의성을 발휘해보세요.',
    health: '건강운이 양호합니다. 규칙적인 생활을 유지하세요.',
    finance: '재물운이 안정적입니다. 투자보다는 절약에 집중하세요.',
    luckyColor: '#4CAF50',
    luckyNumber: Math.floor(Math.random() * 9) + 1
  }
  
  return {
    name,
    luckScore,
    description: `오늘 ${name}님의 행운지수는 ${luckScore}점입니다. ${luckScore >= 70 ? '매우 좋은 하루가 될 것 같습니다!' : luckScore >= 50 ? '평온한 하루가 될 것 같습니다.' : '조금 신중하게 행동하시면 좋겠습니다.'}`,
    recommendations,
    horoscope
  }
}

// 실제 API 호출 함수 (현재는 목업 데이터 반환)
export const getLuckData = async (formData) => {
  try {
    // 실제 구현에서는 서버 API 호출
    // const response = await fetch('/api/luck-calculate', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData)
    // })
    // 
    // if (!response.ok) {
    //   throw new Error('API 호출 실패')
    // }
    // 
    // return await response.json()
    
    // 임시로 목업 데이터 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockLuckData(formData))
      }, 1500) // 로딩 효과를 위한 지연
    })
  } catch (error) {
    console.error('행운지수 계산 API 오류:', error)
    throw new Error('행운지수 계산에 실패했습니다.')
  }
}

// 공유 카드 생성 API
export const generateShareCard = async (luckData) => {
  try {
    // 실제 구현에서는 이미지 생성 API 호출
    // const response = await fetch('/api/share-card', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(luckData)
    // })
    // 
    // if (!response.ok) {
    //   throw new Error('카드 생성 실패')
    // }
    // 
    // return await response.json()
    
    // 임시로 더미 URL 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          imageUrl: '/api/share-card',
          downloadUrl: '/api/share-card/download'
        })
      }, 2000)
    })
  } catch (error) {
    console.error('공유 카드 생성 오류:', error)
    throw new Error('공유 카드 생성에 실패했습니다.')
  }
} 