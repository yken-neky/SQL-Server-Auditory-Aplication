import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [serviceCookie, setServiceActive] = useState(false);

  useEffect(() => {
    const isActive = Cookies.get('OnService') === 'TRUE';
    setServiceActive(isActive);
  }, []);

  const login = () => {
    Cookies.set('OnService', 'TRUE', { expires: 7, secure: true, sameSite: 'strict' });
    setServiceActive(true);
  };

  const logout = () => {
    Cookies.remove('OnService');
    setServiceActive(false);
  };

  return (
    <ServiceContext.Provider value={{ serviceCookie, login, logout }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => useContext(ServiceContext);
