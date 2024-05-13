import React, { useState, useEffect } from 'react';
import styles from '../index.module.css';
import axios from 'axios'; 

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [filterType, setFilterType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/offers');
                setOffers(response.data);
            } catch (error) {
                console.error('Failed to fetch offers:', error);
            }
        };

        fetchOffers();
    }, []);

    const handleTypeChange = (event) => {
        setFilterType(event.target.value);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
        <h1 className={styles.offerHeader} style={{ fontSize: '50px', textAlign: 'center' }}>Nasza oferta</h1>
        <div className={styles.filters}>
            <input type="text" placeholder="Wyszukaj model" value={searchQuery} onChange={handleSearchInputChange} />
            <select value={filterType} onChange={handleTypeChange} className={styles.carTypeSelector}>
            <option value="">Wybierz typ pojazdu</option>
            <option value="SUV">SUV</option>
            <option value="Minivan">Minivan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Sedan">Sedan</option>
            <option value="Coupe">Coupe</option>
            <option value="VAN">VAN</option>
            <option value="Kombi">Kombi</option>
            <option value="Bus">Bus</option>
            </select>
        </div>
        <div className={styles.allOffers}>
            {offers.filter(offer =>
                (searchQuery === '' || offer.model.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (!filterType || offer.type === filterType)
            ).map((offer) => (
            <div key={offer.id} className={styles.offer} style={{ carType: offer.type }}>
                <img src={`${process.env.PUBLIC_URL}/img/${offer.image}`} alt="offer" style={{ width: 300, height: 168, objectFit: 'cover' }} />
                <div className={styles.rezerwacja}>
                <h3 style={{ textTransform: 'uppercase' }}>{offer.model}</h3>
                <a style={{ color: 'green', textDecoration: 'none' }}>
                Zarezerwuj
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
        </>
    );
};

export default Offers;