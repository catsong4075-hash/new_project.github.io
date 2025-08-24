import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()
  
  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/" className="logo-link">
            <span className="logo-icon">🍀</span>
            <span className="logo-text">행운지수 계산기</span>
          </Link>
        </div>
        
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'nav-link--active' : ''}`}
              >
                홈
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/about" 
                className={`nav-link ${isActive('/about') ? 'nav-link--active' : ''}`}
              >
                소개
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header 