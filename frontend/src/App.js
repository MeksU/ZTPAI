import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Offers from './components/Offers';
import Register from './components/Register';
import Contact from './components/Contact';
import Logout from './components/Logout';
import AdminPanel from './components/AdminPanel';
import NotFound from './components/NotFound';
import styles from './index.module.css';
import loginStyles from './login.module.css';
import { decodeJWT } from './utils';

function App() {
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = decodeJWT(token);
        console.log(decodedToken)
        setUserType(decodedToken.userType);
        setUserId(decodedToken.userId);
        setLoggedIn(true);
      } catch (error) {
        console.error('Błąd dekodowania tokena:', error);
      }
    }
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route element={<LayoutWithoutNavbar loggedIn={loggedIn} />}>
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUserType={setUserType} setUserId={setUserId} />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<LayoutWithNavbar userType={userType} userId={userId} loggedIn={loggedIn} />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Home />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/offers" element={<Offers />} />
            {userType === 'user' && <Route path="/reservations" element={<Home />} />}
            <Route path="/contact" element={<Contact />} />
            {loggedIn ? <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} setUserType={setUserType} setUserId={setUserId} />} /> : <Route path="/login" element={<Home />} />}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

function LayoutWithNavbar({ userType, userId, loggedIn }) {
  return (
    <>
      <div className={styles.container}>
        <Navbar userType={userType} userId={userId} loggedIn={loggedIn} />
        <Outlet />
      </div>
      <footer className={styles.footer}>
        <div className={styles.containerr}>
          <p>&copy; ZTPAI 2024 &nbsp; Maksymilian Toczek</p>
          <p>&nbsp;</p>
          <p>Wszelkie prawa zastrzeżone</p>
        </div>
      </footer>
    </>
  );
}

function LayoutWithoutNavbar({ loggedIn }) {
  return (
    <div className={loginStyles.container}>
      <Outlet />
      {loggedIn && <Navigate to="/" replace />}
    </div>
  );
}

export default App;