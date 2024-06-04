import React from 'react';
import styles from '../index.module.css';

const NotFound = () => {
  return (
    <div className={styles.pageNotFound}>
      <h1>404 - Nie znaleziono strony</h1>
      <h3>Strona której szukasz nie istnieje</h3>
    </div>
  );
};

export default NotFound;