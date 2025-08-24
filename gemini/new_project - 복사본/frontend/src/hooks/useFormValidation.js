import { useState } from 'react'

export const useFormValidation = () => {
  const [errors, setErrors] = useState({})

  const validateForm = (formData) => {
    const newErrors = {}

    // 이름 검증
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = '이름을 입력해주세요.'
    } else if (formData.name.length < 2) {
      newErrors.name = '이름은 2글자 이상 입력해주세요.'
    } else if (formData.name.length > 20) {
      newErrors.name = '이름은 20글자 이하로 입력해주세요.'
    }

    // 생년월일 검증
    if (!formData.birthDate) {
      newErrors.birthDate = '생년월일을 입력해주세요.'
    } else {
      const birthDate = new Date(formData.birthDate)
      const today = new Date()
      
      if (birthDate > today) {
        newErrors.birthDate = '생년월일은 오늘 날짜보다 이전이어야 합니다.'
      } else if (birthDate < new Date('1900-01-01')) {
        newErrors.birthDate = '생년월일이 너무 이전입니다.'
      }
    }

    // 출생시간 검증 (선택사항이지만 입력된 경우 검증)
    if (formData.birthTime) {
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
      if (!timeRegex.test(formData.birthTime)) {
        newErrors.birthTime = '올바른 시간 형식으로 입력해주세요. (예: 14:30)'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const clearErrors = () => {
    setErrors({})
  }

  const setFieldError = (field, message) => {
    setErrors(prev => ({
      ...prev,
      [field]: message
    }))
  }

  const clearFieldError = (field) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  return {
    errors,
    validateForm,
    clearErrors,
    setFieldError,
    clearFieldError
  }
} 