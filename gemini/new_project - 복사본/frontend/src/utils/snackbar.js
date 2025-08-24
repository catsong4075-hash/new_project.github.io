// 스낵바 유틸리티 함수들

/**
 * 스낵바 메시지 타입
 */
export const SNACKBAR_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
}

/**
 * 스낵바 메시지 생성
 * @param {string} message - 메시지 내용
 * @param {string} type - 메시지 타입 (success, error, warning, info)
 * @param {number} duration - 표시 시간 (밀리초)
 * @returns {Object} 스낵바 메시지 객체
 */
export const createSnackbarMessage = (message, type = SNACKBAR_TYPES.INFO, duration = 3000) => {
  return {
    id: Date.now() + Math.random(),
    message,
    type,
    duration,
    timestamp: new Date()
  }
}

/**
 * 성공 메시지 생성
 * @param {string} message - 메시지 내용
 * @returns {Object} 성공 스낵바 메시지
 */
export const createSuccessMessage = (message) => {
  return createSnackbarMessage(message, SNACKBAR_TYPES.SUCCESS)
}

/**
 * 에러 메시지 생성
 * @param {string} message - 메시지 내용
 * @returns {Object} 에러 스낵바 메시지
 */
export const createErrorMessage = (message) => {
  return createSnackbarMessage(message, SNACKBAR_TYPES.ERROR, 5000)
}

/**
 * 경고 메시지 생성
 * @param {string} message - 메시지 내용
 * @returns {Object} 경고 스낵바 메시지
 */
export const createWarningMessage = (message) => {
  return createSnackbarMessage(message, SNACKBAR_TYPES.WARNING)
}

/**
 * 정보 메시지 생성
 * @param {string} message - 메시지 내용
 * @returns {Object} 정보 스낵바 메시지
 */
export const createInfoMessage = (message) => {
  return createSnackbarMessage(message, SNACKBAR_TYPES.INFO)
}

/**
 * 스낵바 메시지 타입에 따른 CSS 클래스 반환
 * @param {string} type - 메시지 타입
 * @returns {string} CSS 클래스명
 */
export const getSnackbarClass = (type) => {
  const classMap = {
    [SNACKBAR_TYPES.SUCCESS]: 'snackbar--success',
    [SNACKBAR_TYPES.ERROR]: 'snackbar--error',
    [SNACKBAR_TYPES.WARNING]: 'snackbar--warning',
    [SNACKBAR_TYPES.INFO]: 'snackbar--info'
  }
  return classMap[type] || classMap[SNACKBAR_TYPES.INFO]
}

/**
 * 스낵바 메시지 타입에 따른 아이콘 반환
 * @param {string} type - 메시지 타입
 * @returns {string} 아이콘 이모지
 */
export const getSnackbarIcon = (type) => {
  const iconMap = {
    [SNACKBAR_TYPES.SUCCESS]: '✅',
    [SNACKBAR_TYPES.ERROR]: '❌',
    [SNACKBAR_TYPES.WARNING]: '⚠️',
    [SNACKBAR_TYPES.INFO]: 'ℹ️'
  }
  return iconMap[type] || iconMap[SNACKBAR_TYPES.INFO]
}

/**
 * 스낵바 메시지 타입에 따른 색상 반환
 * @param {string} type - 메시지 타입
 * @returns {string} 색상 코드
 */
export const getSnackbarColor = (type) => {
  const colorMap = {
    [SNACKBAR_TYPES.SUCCESS]: '#4CAF50',
    [SNACKBAR_TYPES.ERROR]: '#F44336',
    [SNACKBAR_TYPES.WARNING]: '#FF9800',
    [SNACKBAR_TYPES.INFO]: '#2196F3'
  }
  return colorMap[type] || colorMap[SNACKBAR_TYPES.INFO]
} 