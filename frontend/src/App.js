import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Offers from './components/Offers';
import Register from './components/Register';
import Contact from './components/Contact';
import styles from './index.module.css';
import loginStyles from './login.module.css';

function App() {
  const userType = '';
  const user = false;

  return (
    <Router>
      <div>
        <Routes>
          <Route element={<LayoutWithoutNavbar />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<LayoutWithNavbar userType={userType} user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Home />} />
            <Route path="/offers" element={<Offers />} />
            {userType === 'user' && <Route path="/reservations" element={<Home />} />}
            <Route path="/contact" element={<Contact />} />
            {userType === 'admin' && <Route path="/admin" element={<Home />} />}
            {user ? <Route path="/logout" element={<Home />} /> : <Route path="/login" element={<Home />} />}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}


function LayoutWithNavbar({ userType, user }) {
  return (
    <>
      <div className={styles.container}>
        <Navbar userType={userType} user={user} />
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

function LayoutWithoutNavbar() {
  return (
    <div className={loginStyles.container}>
      <Outlet />
    </div>
  );
}

export default App;
