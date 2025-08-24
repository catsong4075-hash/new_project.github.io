import React from 'react'
import { useKiro } from '../../contexts/KiroProvider'
import { koreanAccessibility, validateKoreanInput } from '../../utils/kiroConfig'

function InputField({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  required = false, 
  placeholder = '',
  className = '',
  context = 'text',
  validateKorean = false
}) {
  const { locale } = useKiro()
  const inputId = `input-${label.toLowerCase().replace(/\s+/g, '-')}`
  
  const handleChange = (e) => {
    let newValue = e.target.value
    
    // 한국어 입력 검증
    if (validateKorean && type === 'text') {
      // 한글 입력 중일 때는 검증하지 않음
      if (e.nativeEvent.isComposing) {
        onChange(newValue)
        return
      }
      
      // 한국어 이름 검증
      if (context === 'name' && newValue) {
        if (!validateKoreanInput.koreanName(newValue)) {
          // 에러 처리는 상위 컴포넌트에서
        }
      }
      
      // 한국 전화번호 검증
      if (context === 'phone' && newValue) {
        if (!validateKoreanInput.koreanPhone(newValue)) {
          // 에러 처리는 상위 컴포넌트에서
        }
      }
    }
    
    onChange(newValue)
  }

  // 한국어 접근성 라벨 생성
  const getAccessibilityLabel = () => {
    const screenReaderLabel = koreanAccessibility.getScreenReaderLabel('input', context)
    return locale === 'ko-KR' ? screenReaderLabel : label
  }

  return (
    <div className={`input-field ${className}`}>
      <label htmlFor={inputId} className="input-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className={`input ${error ? 'input--error' : ''}`}
        aria-label={getAccessibilityLabel()}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error && (
        <span id={`${inputId}-error`} className="error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

export default InputField 