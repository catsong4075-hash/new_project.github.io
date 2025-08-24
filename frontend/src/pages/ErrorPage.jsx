import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>오류 발생!</h1>
      <p className={styles.message}>죄송합니다. 예상치 못한 오류가 발생했습니다.</p>
      <p className={styles.details}>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" className={styles.homeLink}>홈으로 돌아가기</Link>
    </div>
  );
};

export default ErrorPage;
