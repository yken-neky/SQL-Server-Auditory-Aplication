import { NavegationBar } from "./NavegationBar";
import { Footer } from './Footer';
import { UserProvider } from '../../contexts/UserContext';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <UserProvider>
      <div className="fixed top-0 left-0 w-full h-12 bg-white shadow-md shadow-gray-400/50 z-50">
        <NavegationBar />
      </div>
      <div className="flex flex-col min-h-screen pt-12">
        <div className="flex-grow flex justify-center items-center">
          <div className="w-full container mx-auto bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
            <main className="p-5">
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
