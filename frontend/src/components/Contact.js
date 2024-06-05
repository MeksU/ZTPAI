import React, { useState, useEffect } from 'react';
import styles from '../index.module.css';
import { decodeJWT } from '../utils';

const Contact = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    phone: ''
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeJWT(token);
      if (decodedToken && decodedToken.userId) {
        setLoggedIn(true);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.title || !formData.content || !formData.phone) errors.push('Wszystkie pola są wymagane.');

    if (errors.length > 0) {
      setMessage(errors.join('\n'));
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem('token');
    const decodedToken = decodeJWT(token);
    const userId = decodedToken.userId;

    const messageData = {
      ...formData,
      user: userId,
      sentDate: new Date().toISOString()
    };

    fetch('http://localhost:8080/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(messageData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setMessage('Wiadomość została wysłana pomyślnie!');
      setFormData({
        title: '',
        content: '',
        phone: ''
      });
    })
    .catch(error => {
      setMessage('Wystąpił błąd podczas wysyłania wiadomości.');
      console.error('There was an error!', error);
    });
  };

  return (
    <>
      <div className={styles.contact}>
        <div className={styles.dane}>
          <h1 style={{ fontSize: '50px', textAlign: 'center' }}>Dane firmy</h1>
          <p><b>Nazwa firmy: </b>RentCar</p>
          <p><b>Adres: </b>ul. Przykopowa 10, 01-208 Warszawa</p>
          <p><b>NIP: </b>132-486-11-90</p>
          <p><b>Telefon: </b>+48 603 756 789</p>
          <p><b>Email: </b>info@rentcar.com</p><br /><br />
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.937172086792!2d20.975883576933636!3d52.22635925792799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc9ead6f113f%3A0xbe0db51d29a1f026!2sPrzyokopowa%2010%2C%2001-208%20Warszawa%2C%20Poland!5e0!3m2!1sen!2sus!4v1708108507567!5m2!1sen!2sus" title="mapa" allowFullScreen="" referrerPolicy="no-referrer-when-downgrade" loading="lazy"></iframe>
        </div>
        <div className={styles.contactBox}>
          <h1 style={{ fontSize: '50px', textAlign: 'center' }}>Napisz do nas</h1>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.message} style={{ textAlign: 'center' }}>
              {message && <p>{message}</p>}
            </div>
            <input name="title" id="title" type="text" placeholder="Temat" value={formData.title} onChange={handleChange}/><br />
            <textarea name="content" id="content" type="text" placeholder="Wiadomość" value={formData.content} onChange={handleChange}></textarea><br />
            <div className={styles.cont}>
              <input name="phone" id="phone" type="number" placeholder="Numer telefonu" value={formData.phone} onChange={handleChange} /><br />
            </div>
            {loggedIn ? (
              <button type="submit" className={styles.wyslij}>WYŚLIJ</button>
            ) : (
              <p className={styles.loggedOutMessage}>Musisz być zalogowany, aby wysłać wiadomość.</p>
            )}
            <br />
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
