// Layout.js
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { getUserProfile } from "../../api/log-reg.api";
import { NavegationBar } from "./NavegationBar";
import { Footer } from './Footer';
import { UserProvider } from '../../contexts/UserContext';
import { Outlet } from 'react-router-dom';

const Layout = () => {
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
    return (
      <button className="btn">
        <span className="loading loading-spinner"></span>
        loading
      </button>
    );
  }

  if (error) {
    return (
      <div role="alert" className="alert alert-error text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error! {error}</span>
      </div>
    );
  }

  return (
    <UserProvider value={userData}>
      <div className="fixed top-0 left-0 w-full h-12 bg-white shadow-md shadow-gray-400/50 z-50">
        <NavegationBar />
      </div>
      <div className="flex flex-col min-h-screen pt-12">
        <div className="flex-grow flex justify-center items-center">
          <div className="w-full max-w-7xl p-5 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
            <main className="m-5">
              <Outlet />
            </main>
          </div>
        </div>
        <Footer />
      </div>
    </UserProvider>
  );
};

export default Layout;
