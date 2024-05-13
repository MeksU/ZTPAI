import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../login.module.css';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Tutaj można dodać logikę walidacji i rejestracji
    if (password !== confirmPassword) {
      setMessages(['Hasła nie są takie same.']);
      return;
    }
    console.log("Rejestracja:", { name, surname, email, password });
    navigate('/');  // Przekierowanie po pomyślnej rejestracji
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
            name="name"
            id="name"
            type="text"
            placeholder="Imię"
            value={name}
            onChange={e => setName(e.target.value)}
          /><br />
          <input
            name="surname"
            id="surname"
            type="text"
            placeholder="Nazwisko"
            value={surname}
            onChange={e => setSurname(e.target.value)}
          /><br />
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
            placeholder="Podaj hasło"
            value={password}
            onChange={e => setPassword(e.target.value)}
          /><br />
          <input
            name="password2"
            id="password2"
            type="password"
            placeholder="Potwierdź hasło"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          /><br />
          <button type="submit" className={styles.rejestracja}>ZAREJESTRUJ</button><br />
          <a href="/login" style={{ textDecoration: 'underline' }}>Masz już konto? Zaloguj się!</a>
        </form>
      </div>
    </div>
  );
};

export default Register;
