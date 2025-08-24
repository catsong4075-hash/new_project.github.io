import React from 'react'

function HoroscopePreviewCard({ horoscope }) {
  const { 
    sign, 
    date, 
    general, 
    love, 
    career, 
    health, 
    finance, 
    luckyColor, 
    luckyNumber 
  } = horoscope

  const getZodiacIcon = (sign) => {
    const icons = {
      'aries': '♈',
      'taurus': '♉',
      'gemini': '♊',
      'cancer': '♋',
      'leo': '♌',
      'virgo': '♍',
      'libra': '♎',
      'scorpio': '♏',
      'sagittarius': '♐',
      'capricorn': '♑',
      'aquarius': '♒',
      'pisces': '♓'
    }
    return icons[sign.toLowerCase()] || '⭐'
  }

  const getZodiacName = (sign) => {
    const names = {
      'aries': '양자리',
      'taurus': '황소자리',
      'gemini': '쌍둥이자리',
      'cancer': '게자리',
      'leo': '사자자리',
      'virgo': '처녀자리',
      'libra': '천칭자리',
      'scorpio': '전갈자리',
      'sagittarius': '궁수자리',
      'capricorn': '염소자리',
      'aquarius': '물병자리',
      'pisces': '물고기자리'
    }
    return names[sign.toLowerCase()] || sign
  }

  return (
    <div className="horoscope-card">
      <div className="horoscope-header">
        <div className="zodiac-info">
          <span className="zodiac-icon">{getZodiacIcon(sign)}</span>
          <div className="zodiac-details">
            <h3 className="zodiac-name">{getZodiacName(sign)}</h3>
            <span className="horoscope-date">{date}</span>
          </div>
        </div>
      </div>

      <div className="horoscope-content">
        <div className="general-fortune">
          <h4 className="fortune-title">전체 운세</h4>
          <p className="fortune-text">{general}</p>
        </div>

        <div className="fortune-details">
          <div className="fortune-item">
            <span className="fortune-icon">💕</span>
            <div className="fortune-content">
              <h5>연애운</h5>
              <p>{love}</p>
            </div>
          </div>

          <div className="fortune-item">
            <span className="fortune-icon">💼</span>
            <div className="fortune-content">
              <h5>직업운</h5>
              <p>{career}</p>
            </div>
          </div>

          <div className="fortune-item">
            <span className="fortune-icon">🏥</span>
            <div className="fortune-content">
              <h5>건강운</h5>
              <p>{health}</p>
            </div>
          </div>

          <div className="fortune-item">
            <span className="fortune-icon">💰</span>
            <div className="fortune-content">
              <h5>재물운</h5>
              <p>{finance}</p>
            </div>
          </div>
        </div>

        <div className="lucky-info">
          <div className="lucky-item">
            <span className="lucky-label">행운의 색</span>
            <span className="lucky-value" style={{ color: luckyColor }}>
              {luckyColor}
            </span>
          </div>
          <div className="lucky-item">
            <span className="lucky-label">행운의 숫자</span>
            <span className="lucky-value">{luckyNumber}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HoroscopePreviewCard 