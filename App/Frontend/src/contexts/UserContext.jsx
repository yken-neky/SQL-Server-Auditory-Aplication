import { createContext, useContext, useState, useEffect } from 'react';
import { getUserProfile } from '../api/log-reg.api';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { authToken } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data);
      } catch {
        setError('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      fetchUserProfile();
    }
  }, [authToken]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
