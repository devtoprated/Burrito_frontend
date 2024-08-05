
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { auth } = useContext(AuthContext);

  return auth.isLoggedIn ? Element : <Navigate to="/login" />;
};

export default ProtectedRoute;
