import React from 'react';
import styles from './LuckGauge.module.css';

const LuckGauge = ({ score = 85 }) => { // Default score
  const scoreWidth = `${score}%`;

  return (
    <div className={styles.gaugeContainer}>
      <h3 className={styles.title}>종합 행운 지수</h3>
      <div className={styles.gaugeBackground}>
        <div className={styles.gaugeFill} style={{ width: scoreWidth }}>
          <span className={styles.scoreText}>{score}점</span>
        </div>
      </div>
    </div>
  );
};

export default LuckGauge;
