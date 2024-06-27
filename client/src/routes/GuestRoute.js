import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('access_token');

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return !isLoggedIn ? children : null;
};

export default GuestRoute;
