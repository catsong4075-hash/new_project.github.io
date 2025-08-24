import React from 'react';
import styles from './RecommendationCard.module.css';

const RecommendationCard = ({ item, reason }) => {
  return (
    <div className={styles.card}>
      <h4 className={styles.item}>{item}</h4>
      <p className={styles.reason}>{reason}</p>
    </div>
  );
};

export default RecommendationCard;
