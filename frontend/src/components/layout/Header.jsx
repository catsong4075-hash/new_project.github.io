import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          오늘의 운세
        </Link>
      </h1>
      <nav className={styles.nav}>
        <Link to="/">홈</Link>
        <Link to="/about">소개</Link>
      </nav>
    </header>
  );
};

export default Header;
