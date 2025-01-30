import { useService } from "../../contexts/ServiceContext"
import { useNavigate } from "react-router-dom";

  export function AccessDenied() {
    const { login, logout } = useService();
    const navigate = useNavigate();

    const handleLogin = () => {
      login();
      navigate('/onservice/home');
    }

    const handleLogout = () => {
      logout();
      navigate('/dashboard'); // Redirecciona al login después de cerrar sesión
    };

    return (
      <>
        <main className="grid min-h-screen place-items-center bg-white rounded-lg p-9 sm:p-9 lg:p-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">403</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Permission Error
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Sorry, you can not reach this page. 
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/onservice/home"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go home DB
              </a>
              <a href="/dashboard" className="text-sm font-semibold text-gray-900">
                dashboard <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            <button className="btn btn-warning" onClick={handleLogout}>Logout</button>
          </div>
        </main>
      </>
    )
  }
  
