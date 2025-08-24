// 날짜 포맷 유틸리티 함수들

/**
 * 날짜를 한국어 형식으로 포맷팅
 * @param {Date|string} date - 포맷팅할 날짜
 * @returns {string} 포맷팅된 날짜 문자열
 */
export const formatKoreanDate = (date) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  
  return `${year}년 ${month}월 ${day}일`
}

/**
 * 날짜를 간단한 형식으로 포맷팅 (YYYY-MM-DD)
 * @param {Date|string} date - 포맷팅할 날짜
 * @returns {string} 포맷팅된 날짜 문자열
 */
export const formatSimpleDate = (date) => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}

/**
 * 시간을 한국어 형식으로 포맷팅
 * @param {string} time - 포맷팅할 시간 (HH:MM 형식)
 * @returns {string} 포맷팅된 시간 문자열
 */
export const formatKoreanTime = (time) => {
  if (!time) return ''
  
  const [hour, minute] = time.split(':')
  const hourNum = parseInt(hour)
  
  if (hourNum < 12) {
    return `오전 ${hourNum}시 ${minute}분`
  } else if (hourNum === 12) {
    return `오후 ${hourNum}시 ${minute}분`
  } else {
    return `오후 ${hourNum - 12}시 ${minute}분`
  }
}

/**
 * 현재 날짜를 한국어 형식으로 반환
 * @returns {string} 현재 날짜 문자열
 */
export const getCurrentKoreanDate = () => {
  const now = new Date()
  return formatKoreanDate(now)
}

/**
 * 날짜 차이를 계산하여 일수 반환
 * @param {Date|string} date1 - 첫 번째 날짜
 * @param {Date|string} date2 - 두 번째 날짜
 * @returns {number} 날짜 차이 (일수)
 */
export const getDaysDifference = (date1, date2) => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diffTime = Math.abs(d2 - d1)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

/**
 * 나이 계산
 * @param {Date|string} birthDate - 생년월일
 * @returns {number} 나이
 */
export const calculateAge = (birthDate) => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

/**
 * 요일을 한국어로 반환
 * @param {Date|string} date - 날짜
 * @returns {string} 한국어 요일
 */
export const getKoreanDayOfWeek = (date) => {
  const d = new Date(date)
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return days[d.getDay()]
}

/**
 * 날짜가 유효한지 검증
 * @param {string} dateString - 검증할 날짜 문자열
 * @returns {boolean} 유효성 여부
 */
export const isValidDate = (dateString) => {
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date)
} 