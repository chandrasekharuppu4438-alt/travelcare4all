import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authStorage } from '../services/api';

export default function ProtectedRoute({ children }) {
  const token = authStorage.getToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
