import React from 'react';
import styles from '../index.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.home}>
        <div className={styles.box}>
          <h1>Wynajmij</h1>
          <h1>samochód</h1>
        </div>
        <div className={styles.box1} style={{ textAlign: 'center' }}>
          <h3>15 tys.</h3>
          <p style={{ margin: 0 }}>zadowolonych klientów</p>
        </div>
        <div className={styles.box}>
          Wynajmij samochód bezproblemowo z RentCar. W naszej flocie znajdziesz dla różnych potrzeb. Od osobowych po dostawcze.
        </div>
      </div>
      <img src={`${process.env.PUBLIC_URL}/img/home-speedometer.jpg`} alt="Speedometer" className={styles.speed} />
    </div>
  );
};

export default Home;