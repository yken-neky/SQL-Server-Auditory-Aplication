import { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(Cookies.get('authToken'));

  const login = (token) => {
    Cookies.set('authToken', token, { expires: 7 }); // La cookie expirará en 7 días
    setAuthToken(token);
  };

  const logout = () => {
    Cookies.remove('authToken');
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
