import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import OfferList from './OfferList';
import OfferForm from './OfferForm';
import { decodeJWT } from '../utils';

const AdminPanel = () => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/');
    }else {
      const decodedToken = decodeJWT(token);
      const userType = decodedToken.userType;
      console.log(userType)
      if (userType != "admin") {
        navigate('/');
      } else {
        fetch('http://localhost:8080/api/offers')
          .then(response => response.json())
          .then(data => setOffers(data))
          .catch(error => console.error('Error fetching offers:', error));
      }
    }
  }, [navigate]);

  return (
    <div>
      <OfferForm setOffers={setOffers} />
      <OfferList offers={offers} setOffers={setOffers} />
    </div>
  );
};

export default AdminPanel;
