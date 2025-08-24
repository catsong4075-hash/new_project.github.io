import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">행운지수 계산기</h3>
            <p className="footer-description">
              생년월일과 출생시간을 기반으로 개인의 행운지수를 계산하고 
              오늘의 운세를 제공하는 서비스입니다.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">바로가기</h4>
            <ul className="footer-links">
              <li><a href="/" className="footer-link">홈</a></li>
              <li><a href="/about" className="footer-link">서비스 소개</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">연락처</h4>
            <p className="footer-contact">
              이메일: support@luckcalculator.com<br />
              문의: 02-1234-5678
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} 행운지수 계산기. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 