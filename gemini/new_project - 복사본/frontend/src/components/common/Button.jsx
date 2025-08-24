import React from 'react'
import { useKiro } from '../../contexts/KiroProvider'
import { koreanAccessibility } from '../../utils/kiroConfig'

function Button({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  disabled = false, 
  className = '',
  ariaLabel,
  context = 'default'
}) {
  const { locale } = useKiro()
  const baseClass = 'btn'
  const variantClass = `btn--${variant}`
  const disabledClass = disabled ? 'btn--disabled' : ''
  
  const buttonClass = `${baseClass} ${variantClass} ${disabledClass} ${className}`.trim()

  // 한국어 접근성 라벨 생성
  const getAccessibilityLabel = () => {
    if (ariaLabel) return ariaLabel
    
    // 기본 한국어 라벨 생성
    const screenReaderLabel = koreanAccessibility.getScreenReaderLabel('button', context)
    return locale === 'ko-KR' ? screenReaderLabel : children
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
      aria-label={getAccessibilityLabel()}
      aria-disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button 