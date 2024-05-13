import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function Logout({ setLoggedIn, setUserType, setUserId }) {
  useEffect(() => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserType('');
    setUserId('');
  }, [setLoggedIn, setUserType, setUserId]);

  return <Navigate to="/" replace />;
}

export default Logout;