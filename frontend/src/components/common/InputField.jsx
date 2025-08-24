import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ label, type = 'text', name, value, onChange, placeholder, error }) => {
  return (
    <div className={styles.inputGroup}>
      {label && <label htmlFor={name} className={styles.label}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default InputField;
