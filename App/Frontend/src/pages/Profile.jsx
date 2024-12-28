import { useEffect, useState } from 'react';
import { getUserProfile } from '../api/log-reg.api';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../pages/Layout/Layout';

export function UserProfile() {
  const { authToken } = useAuth();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUserData(response.data);
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

  if (loading) {
    return (<Layout>
              <div>Loading...</div>
            </Layout>)
  }

  if (error) {
    return (<Layout>
              <div>{error}</div>
            </Layout>)
  }

  return (
    <Layout>
      <div>
      <h1 className='font-bold text-3xl mb-9'>User Profile</h1>
      <hr/>
      {userData && (
        <>
          <p className='text-xl'><span className='font-bold text-xl'>Username: </span>{userData.username}</p>
          <p className='text-xl'><span className='font-bold text-xl'>Email: </span>{userData.email}</p>
          <p className='text-xl'><span className='font-bold text-xl'>Rol: </span>{userData.role}</p>
        </>
        )}
    </div>
    </Layout>
  )
}
