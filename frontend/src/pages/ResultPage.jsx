import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import styles from './ResultPage.module.css';
import LuckGauge from '../components/specific/LuckGauge';
import RecommendationCard from '../components/specific/RecommendationCard';

const ResultPage = () => {
  const location = useLocation();
  const resultData = location.state?.resultData;

  // If there's no result data, redirect to the home page
  if (!resultData) {
    return <Navigate to="/" replace />;
  }

  const handleShare = () => {
    navigate('/share', { state: { resultData } });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{resultData.title}</h1>
      
      <LuckGauge score={resultData.luckScore} /> {/* Assuming resultData has a luckScore */}

      <div 
        className={styles.contentWrapper}
        dangerouslySetInnerHTML={{ __html: resultData.content_html }}
      />
      
      {resultData.recommendations && resultData.recommendations.length > 0 && (
        <div className={styles.recommendations}>
          <h2 className={styles.recTitle}>행운의 아이템</h2>
          <ul className={styles.recList}>
            {resultData.recommendations.map(rec => (
              <li key={rec.id} className={styles.recItem}>
                <strong>{rec.item}</strong>: {rec.reason}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultPage;
