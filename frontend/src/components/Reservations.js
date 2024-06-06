import React, { useState, useEffect } from 'react';
import styles from '../index.module.css';
import axios from 'axios'; 
import { decodeJWT } from '../utils';
import { useNavigate } from 'react-router-dom';

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const [showActiveOnly, setShowActiveOnly] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
        
        const decodedToken = decodeJWT(token);
        setUserId(decodedToken.userId);
    }, [token, navigate]);

    useEffect(() => {
        const fetchReservations = async () => {
            if (!userId) return;
            
            try {
                const response = await axios.get(`http://localhost:8080/api/reservations/user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setReservations(response.data);
            } catch (error) {
                console.error('Failed to fetch reservations:', error);
                setMessage('Failed to fetch reservations');
            }
        };

        fetchReservations();
    }, [userId, token]);

    const handleDelete = async (reservationId) => {
        if (window.confirm('Czy na pewno chcesz usunąć tę rezerwację?')) {
            try {
                await axios.delete(`http://localhost:8080/api/reservations/${reservationId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setReservations(reservations.filter(reservation => reservation.id !== reservationId));
                setMessage('Rezerwacja została usunięta.');
            } catch (error) {
                console.error('Failed to delete reservation:', error);
                setMessage('Błąd! Nie udało się usunąć rezerwacji.');
            }
        }
    };

    const handleCheckboxChange = () => {
        setShowActiveOnly(!showActiveOnly);
    };

    const filteredReservations = showActiveOnly
        ? reservations.filter(reservation => new Date(reservation.endDate) >= new Date())
        : reservations;

    return (
        <>
        <h1 className={styles.offerHeader} style={{ fontSize: '50px', textAlign: 'center' }}>Twoje rezerwacje</h1>
        <div className={styles.resFilters}>
            <label>
                Pokaż tylko aktywne rezerwacje &nbsp;
                <input 
                    type="checkbox" 
                    checked={showActiveOnly} 
                    onChange={handleCheckboxChange} 
                />
            </label>
        </div>
        <div className={styles.allOffers}>
            <div className={styles.resMess}>
                {message && <p>{message}</p>}
            </div>
            {filteredReservations.map((reservation) => (
            <div key={reservation.id} className={styles.offer}>
                <img src={`${process.env.PUBLIC_URL}/img/${reservation.offer.image}`} alt="offer" style={{ width: 300, height: 168, objectFit: 'cover' }} />
                <div className={styles.rezerwacja}>
                <h3 style={{ textTransform: 'uppercase' }}>{reservation.offer.model}</h3>
                <a onClick={() => handleDelete(reservation.id)} style={{ color: 'red', textDecoration: 'none', cursor: 'pointer' }}>
                    Usuń
                </a>
                </div>
                <div className={styles.offerBottom}>
                <div className={styles.offerLeft}>
                    <p>{reservation.offer.type}, {reservation.offer.engine}L, {reservation.offer.power}KM</p>
                    <p>Ilość miejsc: {reservation.offer.seats}</p>
                </div>
                <div className={styles.offerRight}>
                    <p style={{fontWeight: 'bold' }}>Od: {new Date(reservation.startDate).toLocaleDateString()}</p>
                    <p style={{fontWeight: 'bold' }}>Do: {new Date(reservation.endDate).toLocaleDateString()}</p>
                </div>
                </div>
            </div>
            ))}
        </div>
        </>
    );
};

export default ReservationList;