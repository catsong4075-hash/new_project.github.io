import React from 'react'

function LuckGauge({ score }) {
  // 점수를 0-100 범위로 정규화
  const normalizedScore = Math.min(Math.max(score, 0), 100)
  
  // 점수에 따른 색상 결정
  const getColor = (score) => {
    if (score >= 80) return '#4CAF50' // 녹색
    if (score >= 60) return '#FF9800' // 주황색
    if (score >= 40) return '#FFC107' // 노란색
    return '#F44336' // 빨간색
  }
  
  // 점수에 따른 메시지
  const getMessage = (score) => {
    if (score >= 80) return '매우 좋은 행운!'
    if (score >= 60) return '좋은 행운!'
    if (score >= 40) return '보통의 행운'
    return '조금 아쉬운 행운'
  }

  const color = getColor(normalizedScore)
  const message = getMessage(normalizedScore)

  return (
    <div className="luck-gauge">
      <div className="gauge-container">
        <div className="gauge-circle">
          <svg className="gauge-svg" viewBox="0 0 120 120">
            {/* 배경 원 */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="8"
            />
            {/* 진행 원 */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeDasharray={`${(normalizedScore / 100) * 314} 314`}
              strokeDashoffset="78.5"
              transform="rotate(-90 60 60)"
              className="gauge-progress"
            />
          </svg>
          <div className="gauge-text">
            <span className="gauge-score">{normalizedScore}</span>
            <span className="gauge-unit">점</span>
          </div>
        </div>
      </div>
      
      <div className="gauge-message">
        <p className="message-text">{message}</p>
      </div>
      
      <div className="gauge-details">
        <div className="detail-item">
          <span className="detail-label">전체 점수</span>
          <span className="detail-value">{score}점</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">등급</span>
          <span className="detail-value">
            {normalizedScore >= 80 ? 'A' : 
             normalizedScore >= 60 ? 'B' : 
             normalizedScore >= 40 ? 'C' : 'D'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default LuckGauge 