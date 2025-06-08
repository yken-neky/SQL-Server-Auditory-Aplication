// App.js
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Dashboard } from './pages/Dashboard';
import { RegisterForm } from './pages/Register';
import { UserProfile } from './pages/Profile';
import ProtectedRoute from './components/navigation/ProtectedRoute';
import PublicRoute from './components/navigation/PublicRoute';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './pages/Layout/Layout';
import { EditProfileForm } from './components/Profile/EditProfileForm';
import LoginForm from './pages/Login';
import ConnectionForm from './pages/OnService/LoginDB';
import { AccessDenied } from './components/navigation/DeniedAccess';
import { HomeDB } from './pages/OnService/HomeDB';
import ProtectedWithServiceRoute from './components/navigation/ProtectedWithServiceRoute'
import { ServiceProvider } from './contexts/ServiceContext';
import NoOnService from './components/navigation/NoOnService';
import { Landing } from './pages/Landing';
import { AuditoryReport } from './pages/AuditoryReport';

const router = createBrowserRouter([
  { path: "/", element: <Landing/> },
  { path: "/report", element: <AuditoryReport/>,
    // Modern layout wrapper for report page
    loader: async () => {},
    handle: {
      layout: 'modern',
      theme: 'cyber',
    }
  },
  { path: "/login", element: <PublicRoute><LoginForm /></PublicRoute> },
  { path: "/register", element: <PublicRoute><RegisterForm /></PublicRoute> },
  { path: "access-denied", element:<AccessDenied/>},
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      { path: "profile", element: <UserProfile /> },
      { path: "edit_profile", element: <EditProfileForm/> },
      { path: "dashboard", element: <NoOnService><Dashboard /></NoOnService> },
      { path: "logDB", element: <ConnectionForm/> },
    ]
  },
  {
    path: "/onService/",
    element: <ProtectedWithServiceRoute><Layout /></ProtectedWithServiceRoute>,
    children: [
      { path: "home", element: <HomeDB/> },
    ]
  }
], {
  future: { v7_relativeSplatPath: true, v7_startTransition: true },
});

function App() {
  return (
    <>
    <ServiceProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </ServiceProvider>
    </>
  );
}

export default App;
