import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeJWT } from '../utils';
import styles from '../login.module.css';

const Login = ({ setLoggedIn, setUserType, setUserId }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessages([]);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mail: email, password })
      });

      if (!response.ok) {
        setMessages(["Niepoprawny login lub hasło!"]);
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.jwt);
      const decodedToken = decodeJWT(data.jwt);
      setUserType(decodedToken.userType);
      setUserId(decodedToken.userId);
      setLoggedIn(true);
      navigate('/');
    } catch (error) {
      setMessages(["Niepoprawny login lub hasło!"]);
    }
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
