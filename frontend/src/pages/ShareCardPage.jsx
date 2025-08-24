import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import styles from './ShareCardPage.module.css';

const ShareCardPage = () => {
  const location = useLocation();
  const resultData = location.state?.resultData;

  if (!resultData) {
    return <Navigate to="/" replace />;
  }

  const handleSocialShare = (platform) => {
    console.log(`${platform} share button clicked!`);
    alert(`${platform} 공유 기능은 개발 중입니다!`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.shareCard}>
        <h1 className={styles.title}>오늘의 운세</h1>
        <h2 className={styles.subTitle}>{resultData.title}</h2>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: resultData.content_html }}
        />
        {resultData.luckScore && (
          <div className={styles.luckScore}>
            종합 행운 지수: <strong>{resultData.luckScore}점</strong>
          </div>
        )}
        {resultData.recommendations && resultData.recommendations.length > 0 && (
          <div className={styles.recommendations}>
            <h3>행운의 아이템</h3>
            <ul>
              {resultData.recommendations.map((rec) => (
                <li key={rec.id}>{rec.item}</li>
              ))}
            </ul>
          </div>
        )}
        <p className={styles.footerText}>AI가 분석한 당신의 신년 운세</p>
      </div>
    </div>
  );
};

export default ShareCardPage;
