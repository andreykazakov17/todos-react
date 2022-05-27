import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IChildren {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: IChildren) => {
  const location = useLocation();
  const user = localStorage.getItem('userId');
  return user ? <>{children}</> : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
