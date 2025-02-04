import { NavegationBar } from "./NavegationBar";
import { Footer } from './Footer';
import { UserProvider } from '../../contexts/UserContext';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <header className="w-full h-12 bg-white shadow-md shadow-gray-400/50 z-50">
          <NavegationBar />
        </header>
        <main className="flex-grow flex justify-center items-center p-2 mt-4 bg-opacity-80 rounded-lg w-11/12 mx-auto">
          <Outlet/>
        </main>
        <footer className="w-full">
          <Footer />
        </footer>
      </div>
    </UserProvider>
  );
};

export default Layout;
