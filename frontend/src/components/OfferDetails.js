import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import styles from '../index.module.css';
import { decodeJWT } from '../utils';

const OfferDetails = () => {
    const { offerId } = useParams();
    const [offer, setOffer] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const fetchReservations = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/reservations/offer/${offerId}`);
            setReservations(response.data);
        } catch (error) {
            console.error('Failed to fetch reservations:', error);
        }
    };

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/offers/${offerId}`);
                setOffer(response.data);
            } catch (error) {
                console.error('Failed to fetch offer:', error);
            }
        };

        if (token) {
            setIsLoggedIn(true);
        }

        fetchOffer();
        fetchReservations();
    }, [offerId, token]);

    const handleDateChange = (dates) => {
        if (Array.isArray(dates)) {
            setSelectedDates(dates);
        } else {
            setSelectedDates([dates, dates]);
        }
    };

    const handleReservation = async () => {
        if (!selectedDates || selectedDates.length === 0) {
            setMessage('Proszę wybrać prawidłowy zakres dat.');
            return;
        }

        const [startDate, endDate] = selectedDates;
        const isInvalidRange = reservations.some(reservation => {
            const resStart = new Date(reservation.startDate);
            const resEnd = new Date(reservation.endDate);
            return (startDate <= resEnd && endDate >= resStart);
        });

        if (isInvalidRange) {
            setMessage('Wybierz inny zakres.');
            return;
        }

        const decodedToken = decodeJWT(token);
        const userId = decodedToken.userId;

        const reservationData = {
            user: userId,
            offer: offerId,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        };

        try {
            await axios.post('http://localhost:8080/api/reservations', reservationData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage('Pomyślnie zarezerwowano pojazd!');
            setSelectedDates([]);
            fetchReservations();
        } catch (error) {
            console.error('Failed to make reservation:', error);
            setMessage('Nie udało się dokonać rezerwacji.');
        }
    };

    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 3);

    return (
        <div className={styles.offerDetails}>
            {offer && (
                <>
                    <div className={styles.detailsLeft}>
                        <p className={styles.detailHeader}>{offer.model}</p>
                        <div className={styles.detailsImg}>
                            <img src={`${process.env.PUBLIC_URL}/img/${offer.image}`} alt="offer" style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '30px' }} />
                            <div className={styles.detailsInfo}>
                                <p>Typ: <b>{offer.type}</b></p>
                                <p>Pojemność silnika: <b>{offer.engine}L</b></p>
                                <p>Moc: <b>{offer.power}KM</b></p>
                                <p>Ilość miejsc: <b>{offer.seats}</b></p>
                                <p>Cena: <b>{offer.price} zł/dzień</b></p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.detailsRight}>
                        <p className={styles.detailHeader}>Zrezerwuj</p>
                        <h3>Rezerwacje na najbliższe 3 miesiące:</h3>
                        <Calendar
                            selectRange
                            onChange={handleDateChange}
                            minDate={today}
                            maxDate={maxDate}
                            tileDisabled={({ date, view }) => {
                                if (view === 'month') {
                                    return reservations.some(reservation => {
                                        const start = new Date(reservation.startDate);
                                        start.setDate(start.getDate() - 1);
                                        const end = new Date(reservation.endDate);
                                        return date >= start && date <= end;
                                    });
                                }
                            }}
                            className={styles.customCalendar}
                        />
                        {isLoggedIn ? (
                            <button onClick={handleReservation} className={styles.rezerwujButton}>ZAREZERWUJ</button>
                        ) : (
                            <p className={styles.loginMessage}>Musisz być zalogowany, aby dokonać rezerwacji.</p>
                        )}
                        {message && <p>{message}</p>}
                        <p className={styles.pDetail}>Chcesz zarezerwować pojazd na dłużej?</p>
                        <a style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/contact')}>
                            Napisz do nas
                        </a>
    
                    </div>
                </>
            )}
        </div>
    );
};

export default OfferDetails;