import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

// Page imports
import Home from '../pages/Home';
import Prayer from '../pages/Prayer';
import Meditation from '../pages/Meditation';
import Community from '../pages/Community';
import Shop from '../pages/Shop';
import Profile from '../pages/Profile';
import Auth from '../pages/Auth';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route 
        path="/prayer" 
        element={
          <ProtectedRoute>
            <Prayer />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/meditation" 
        element={
          <ProtectedRoute>
            <Meditation />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/community" 
        element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/shop" 
        element={
          <ProtectedRoute>
            <Shop />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default AppRoutes;
