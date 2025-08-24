import React from 'react';
import styles from './HoroscopePreviewCard.module.css';

const HoroscopePreviewCard = () => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>오늘의 운세 미리보기</h3>
      <p className={styles.content}>
        당신의 이름과 생년월일을 입력하고, AI가 분석하는 신년 운세를 확인해보세요.
      </p>
      <ul className={styles.features}>
        <li>종합 운세</li>
        <li>재물운</li>
        <li>건강운</li>
        <li>행운의 아이템 추천</li>
      </ul>
    </div>
  );
};

export default HoroscopePreviewCard;
