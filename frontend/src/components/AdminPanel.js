import React, { useState, useEffect } from 'react';
import OfferList from './OfferList';
import OfferForm from './OfferForm';
import styles from '../index.module.css';

const AdminPanel = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/offers')
      .then(response => response.json())
      .then(data => setOffers(data))
      .catch(error => console.error('Error fetching offers:', error));
  }, []);

  return (
    <div>
      <OfferForm setOffers={setOffers} />
      <OfferList offers={offers} setOffers={setOffers} />
    </div>
  );
};

export default AdminPanel;
