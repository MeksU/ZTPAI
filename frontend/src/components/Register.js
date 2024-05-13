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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessages([]);

    if (!name || !surname || !email || !password || !confirmPassword) {
      setMessages(['Wypełnij wszystkie pola formularza.']);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setMessages(['Podaj poprawny adres email.']);
      return;
    }
    if (password.length < 8) {
      setMessages(['Hasło musi mięc minimum 8 znaków.']);
      return;
    }
    if (password !== confirmPassword) {
      setMessages(['Hasła nie są takie same.']);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, surname, mail: email, password, type: 'user' })
      });

      if (!response.ok) {
        const error = await response.text();
        setMessages([`${error}`]);
        return;
      }

      setMessages(['Pomyślnie zarejestrowano']);
      navigate('/login');
    } catch (error) {
      setMessages([error.message]);
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