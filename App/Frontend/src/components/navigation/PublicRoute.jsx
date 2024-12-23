import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PublicRoute = ({ children }) => {
  const { authToken } = useAuth();

  if (authToken) {
    return <Navigate to="/profile" />;
  }

  return children;
};

export default PublicRoute;
