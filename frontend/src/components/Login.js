import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Logowanie:", { email, password });
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <a href="/">
          <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="Logo" style={{ width: 200, height: 'auto' }} />
          <h1>RentCar</h1>
        </a>
      </div>
      <div className={styles.logowanie}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          {messages.length > 0 && (
            <div className={styles.message}>
              {messages.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </div>
          )}
          <input 
            name="mail" 
            id="mail" 
            type="text" 
            placeholder="Adres E-mail" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          /><br />
          <input 
            name="password" 
            id="password" 
            type="password" 
            placeholder="Hasło"
            value={password}
            onChange={e => setPassword(e.target.value)}
          /><br />
          <button type="submit" className={styles.zaloguj}>ZALOGUJ</button><br />
          <button type="button" onClick={() => navigate('/register')} className={styles.rejestracja}>ZAREJESTRUJ</button><br />
        </form>
      </div>
    </div>
  );
};

export default Login;