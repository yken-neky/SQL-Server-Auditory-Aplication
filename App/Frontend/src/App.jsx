// App.js
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Dashboard } from './pages/Dashboard';
import { LoginForm } from './pages/Login';
import { RegisterForm } from './pages/Register';
import { UserProfile } from './pages/Profile';
import ProtectedRoute from './components/navigation/ProtectedRoute';
import PublicRoute from './components/navigation/PublicRoute';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './pages/Layout/Layout';

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" /> },
  { path: "/login", element: <PublicRoute><LoginForm /></PublicRoute> },
  { path: "/register", element: <PublicRoute><RegisterForm /></PublicRoute> },
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      { path: "profile", element: <UserProfile /> },
      { path: "dashboard", element: <Dashboard /> }
    ]
  }
], {
  future: { v7_relativeSplatPath: true, v7_startTransition: true },
});

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;
