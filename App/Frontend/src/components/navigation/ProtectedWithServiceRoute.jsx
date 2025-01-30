// ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useService } from '../../contexts/ServiceContext';

const ProtectedWithServiceRoute = ({ children }) => {
  const { serviceCookie }  = useService();

  if (!serviceCookie) {
    // Si el servicio no está activo, redirecciona al usuario
    return <Navigate to="/access-denied" replace />;
  }

  // Si el servicio está activo, muestra el componente hijo
  return children;
};

export default ProtectedWithServiceRoute;
