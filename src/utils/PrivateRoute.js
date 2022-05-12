import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('userId');
    if (!user) {
      return navigate('/login', { replace: true, state: { from: location } });
    }
  }, []);

  return children;
};

export default PrivateRoute;
