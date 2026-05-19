import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import DeliveryLayout from './DeliveryLayout'
import DeliveryLogin from './DeliveryLogin'
import DeliveryRegister from './DeliveryRegister'
import DeliveryHome from './DeliveryHome'
import DeliveryHistory from './DeliveryHistory'
import DeliveryEarnings from './DeliveryEarnings'

import DeliveryProfile from './DeliveryProfile'

function DeliveryApp() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('rider_logged_in') === 'true';
    const isRegistered = localStorage.getItem('rider_registered') === 'true';

    // If rider is not logged in and trying to access main tabs, redirect to login
    if (!isLoggedIn && 
        location.pathname !== '/delivery/login' && 
        location.pathname !== '/delivery/register') {
      
      // If new register bypass logic is not present
      if (!isRegistered) {
        navigate('/delivery/register');
      } else {
        navigate('/delivery/login');
      }
    }

    // Redirect to home if logged in and accessing base path
    if (isLoggedIn && (location.pathname === '/delivery' || location.pathname === '/delivery/')) {
      navigate('/delivery/home');
    }
  }, [location.pathname, navigate]);

  return (
    <Routes>
      {/* Onboarding / Auth */}
      <Route path="login" element={<DeliveryLogin />} />
      <Route path="register" element={<DeliveryRegister />} />

      {/* Main Tab Interface under Layout */}
      <Route path="" element={<DeliveryLayout />}>
        <Route path="home" element={<DeliveryHome />} />
        <Route path="history" element={<DeliveryHistory />} />
        <Route path="earnings" element={<DeliveryEarnings />} />
        <Route path="profile" element={<DeliveryProfile />} />

        
        {/* Redirect for base route or unhandled children */}
        <Route path="*" element={<Navigate to="home" replace />} />
      </Route>
    </Routes>
  )
}

export default DeliveryApp
