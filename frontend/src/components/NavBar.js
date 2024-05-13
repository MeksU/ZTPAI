import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../index.module.css';

const Navbar = ({ userType, user }) => {
  return (
    <nav>
      <div className={styles.logo}>
        <h2><Link to="/" className={styles.logoLink}>RentCar</Link></h2>
      </div>
      <ul>
        <li><Link to="/about" className={styles.navLink}>O nas</Link></li>
        <li><Link to="/offers" className={styles.navLink}>Oferta</Link></li>
        {userType === 'user' && (
          <li><Link to="/reservations" className={styles.navLink}>Rezerwacje</Link></li>
        )}
        <li><Link to="/contact" className={styles.navLink}>Kontakt</Link></li>
        {userType === 'admin' && (
          <li>
            <Link to="/admin" className={`${styles.navLink} ${styles.adminButton}`}>ADMIN</Link>
          </li>
        )}
        <li>
          {user ? (
            <Link to="/logout" className={`${styles.navLink} ${styles.loginButton}`}>Wyloguj</Link>
          ) : (
            <Link to="/login" className={`${styles.navLink} ${styles.loginButton}`}>Zaloguj</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
