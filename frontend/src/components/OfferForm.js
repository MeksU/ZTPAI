import React, { useState } from 'react';
import styles from '../index.module.css';

const OfferForm = ({ setOffers }) => {
  const initialFormState = {
    model: '',
    engine: '',
    power: '',
    type: '',
    seats: '',
    price: '',
    image: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      setFormData({ ...formData, image: files[0].name });
      setFileName(files[0].name);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.model) errors.push('Model jest wymagany.');
    if (!formData.engine) errors.push('Pojemność silnika jest wymagana.');
    if (!formData.power) errors.push('Moc silnika jest wymagana.');
    if (!formData.type) errors.push('Typ jest wymagany.');
    if (!formData.seats) errors.push('Ilość miejsc jest wymagana.');
    if (!formData.price) errors.push('Cena jest wymagana.');
    if (!formData.image) errors.push('Obrazek jest wymagany.');

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
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      setOffers(prevOffers => [...prevOffers, data]);
      setFormData(initialFormState);
      setFileName('');
    })
    .catch(error => console.error('Error adding offer:', error));
  };

  return (
    <div className={styles.dodaj}>
        <h1>Dodaj ofertę</h1>
        <form onSubmit={handleSubmit} className={styles.addForm}>
            <input name="model" value={formData.model} onChange={handleChange} placeholder="Marka i model" className={styles.zwyklyInput} />
            <input name="engine" value={formData.engine} onChange={handleChange} placeholder="Pojemność silnika" className={styles.zwyklyInput} /><br />
            <input name="power" type="number" value={formData.power} onChange={handleChange} placeholder="Moc silnika (KM)" className={styles.zwyklyInput} />
            <input name="type" value={formData.type} onChange={handleChange} placeholder="Typ" className={styles.zwyklyInput} /><br />
            <input name="seats" type="number" value={formData.seats} onChange={handleChange} placeholder="Ilość miejsc" className={styles.zwyklyInput} />
            <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Cena za dzień" className={styles.zwyklyInput} /><br />
            <input name="image" type="file" onChange={handleChange}/><br></br>
            <button type="submit" className={styles.dodajOferte}>DODAJ</button>
        </form>
        <h1>Usuń ofertę</h1>
    </div>
  );
};

export default OfferForm;
