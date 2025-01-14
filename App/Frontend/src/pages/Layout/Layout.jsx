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
      <div className="flex flex-col h-screen pt-12">
        <div className="flex-grow flex justify-center items-center">
          <main className="p-6 bg-stone-100 bg-opacity-80 rounded-lg w-4/5">
              <Outlet />
            </main>
        </div>
      <Footer />
      </div>
    </UserProvider>
  );
};

export default Layout;
