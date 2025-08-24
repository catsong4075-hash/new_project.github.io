import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2025 Kiro Corp. All rights reserved.</p>
      <p>
        <Link to="/about">소개</Link>
      </p>
    </footer>
  );
};

export default Footer;
