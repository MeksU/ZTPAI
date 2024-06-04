import React, { useState } from 'react';
import styles from '../index.module.css';

const OfferForm = ({ setOffers }) => {
  const initialFormState = {
    model: '',
    engine: '',
    type: '',
    seats: '',
    price: '',
    image: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.model) errors.push('Model jest wymagany.');
    if (!formData.engine) errors.push('Pojemność silnika jest wymagana.');
    if (!formData.type) errors.push('Typ jest wymagany.');
    if (!formData.seats) errors.push('Ilość miejsc jest wymagana.');
    if (!formData.price) errors.push('Cena jest wymagana.');
    if (!formData.image) errors.push('URL obrazka jest wymagany.');

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    fetch('http://localhost:8080/api/offers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      setOffers(prevOffers => [...prevOffers, data]);
      setFormData(initialFormState); // Czyszczenie formularza po dodaniu oferty
    })
    .catch(error => console.error('Error adding offer:', error));
  };

  return (
    <div className={styles.dodaj}>
        <h1>Dodaj ofertę</h1>
        <form onSubmit={handleSubmit} className={styles.addForm}>
            <input name="model" value={formData.model} onChange={handleChange} placeholder="Marka i model" className={styles.input} />
            <input name="engine" value={formData.engine} onChange={handleChange} placeholder="Pojemność silnika" className={styles.input} /><br></br>
            <input name="type" value={formData.type} onChange={handleChange} placeholder="Typ" className={styles.input} />
            <input name="seats" type="number" value={formData.seats} onChange={handleChange} placeholder="Ilość miejsc" className={styles.input} /><br></br>
            <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Cena za dzień" className={styles.input} />
            <input name="image" value={formData.image} onChange={handleChange} placeholder="URL obrazka" className={styles.input} /><br></br>
            <button type="submit" className={styles.dodajOferte}>DODAJ</button>
        </form>
        <h1>Usuń ofertę</h1>
    </div>
  );
};

export default OfferForm;
