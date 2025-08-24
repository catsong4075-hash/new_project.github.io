import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import HoroscopePreviewCard from '../components/specific/HoroscopePreviewCard';
import { getHoroscope } from '../services/luckApi';

const LandingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = '이름을 입력해주세요.';
    if (!formData.birthdate) {
      newErrors.birthdate = '생년월일을 입력해주세요.';
    } else if (!/^\d{8}$/.test(formData.birthdate)) {
      newErrors.birthdate = '생년월일 8자리를 입력해주세요. (예: 19900101)';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const resultData = await getHoroscope(formData.name, formData.birthdate);
        navigate('/result', { state: { resultData } });
      } catch (error) {
        console.error('Failed to get horoscope:', error);
        setErrors({ api: '운세 정보를 가져오는데 실패했습니다. 잠시 후 다시 시도해주세요.' });
      }
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>신년 운세 확인</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <InputField
          label="이름"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="이름을 입력하세요"
          error={errors.name}
        />
        <InputField
          label="생년월일"
          name="birthdate"
          type="text"
          value={formData.birthdate}
          onChange={handleChange}
          placeholder="생년월일 8자리 (예: 19950101)"
          error={errors.birthdate}
        />
        {errors.api && <p className={styles.apiError}>{errors.api}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? '로딩중...' : '운세 확인하기'}
        </Button>
      </form>
      <HoroscopePreviewCard />
    </div>
  );
};

export default LandingPage;