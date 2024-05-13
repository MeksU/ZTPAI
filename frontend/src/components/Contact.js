import React from 'react';
import styles from '../index.module.css';

const Contact = () => {
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
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.937172086792!2d20.975883576933636!3d52.22635925792799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc9ead6f113f%3A0xbe0db51d29a1f026!2sPrzyokopowa%2010%2C%2001-208%20Warszawa%2C%20Poland!5e0!3m2!1sen!2sus!4v1708108507567!5m2!1sen!2sus" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade" loading="lazy"></iframe>
          </div>
          <div className={styles.contactBox}>
          <h1 style={{ fontSize: '50px', textAlign: 'center' }}>Napisz do nas</h1>
              <form className={styles.contactForm} action="contact" method="post">
                  <div className={styles.message} style={{ textAlign: 'center' }}>
                      {/* Tutaj mogą być wyświetlane wiadomości */}
                  </div>
                  <input name="title" id="title" type="text" placeholder="Temat" /><br />
                  <textarea name="content" id="content" type="text" placeholder="Wiadomość"></textarea><br />
                  <div className={styles.cont}>
                      <input name="mail" id="mail" type="text" placeholder="E-mail" readOnly />
                      <input name="phone" id="phone" type="text" placeholder="Numer telefonu" /><br />
                  </div>
                  <button type="submit" className={styles.wyslij}>WYŚLIJ</button><br />
              </form>
          </div>
      </div>
    </>
  );
};

export default Contact;
