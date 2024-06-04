import React from 'react';
import styles from '../index.module.css';

const OfferList = ({ offers, setOffers }) => {
  const handleDelete = (id) => {
    if (window.confirm('Czy na pewno chcesz usunąć ofertę?')) {
      const token = localStorage.getItem('token');
      fetch(`http://localhost:8080/api/offers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            setOffers(offers.filter(offer => offer.id !== id));
          } else {
            console.error('Failed to delete offer:', response.statusText);
          }
        })
        .catch(error => console.error('Error deleting offer:', error));
    }
  };

  return (
    <div className={styles.allOffers}>
      {offers.map(offer => (
        <div key={offer.id} className={styles.offer} style={{ carType: offer.type }}>
          <img src={`${process.env.PUBLIC_URL}/img/${offer.image}`} alt="offer" style={{ width: 300, height: 168, objectFit: 'cover' }} />
          <div className={styles.rezerwacja}>
            <h3 style={{ textTransform: 'uppercase' }}>{offer.model}</h3>
            <a onClick={() => handleDelete(offer.id)} style={{ color: 'red', textDecoration: 'none', cursor: 'pointer' }}>
              Usuń
            </a>
          </div>
          <div className={styles.offerBottom}>
            <div className={styles.offerLeft}>
              <p>{offer.type}, {offer.engine}L, {offer.power}KM</p>
              <p>Ilość miejsc: {offer.seats}</p>
            </div>
            <div className={styles.offerRight}>
              <p style={{ color: '#2CB67D', fontWeight: 'bold' }}>{offer.price} zł</p>
              <p style={{ fontSize: '80%' }}>/dzień</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfferList;
