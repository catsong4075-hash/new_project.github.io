import React from 'react';
import styles from './AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>서비스 소개</h1>
      <p className={styles.content}>
        이 서비스는 인공지능을 활용하여 개인의 이름과 생년월일을 기반으로 신년 운세를 분석하고 예측합니다.
        사용자에게 맞춤형 운세 정보와 행운 아이템 추천을 제공하여, 다가오는 한 해를 더욱 풍요롭고 긍정적으로
        계획할 수 있도록 돕는 것을 목표로 합니다.
      </p>
      <p className={styles.content}>
        저희는 최신 AI 기술과 전통적인 운세 분석 기법을 결합하여, 흥미롭고 유익한 경험을 제공하고자 노력하고 있습니다.
        여러분의 삶에 긍정적인 에너지를 더하고, 미래를 준비하는 데 도움이 되기를 바랍니다.
      </p>
      <p className={styles.contact}>문의: support@kiro.com</p>
    </div>
  );
};

export default AboutPage;
