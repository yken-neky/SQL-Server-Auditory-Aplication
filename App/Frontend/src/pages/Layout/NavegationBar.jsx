import { LogOutUser } from "../../api/log-reg.api";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { Menu } from "./Menu";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export function NavegationBar() {
  const { logout } = useAuth();
  const userData = useUser();

  const handleLogout = async () => { 
      await LogOutUser();
      logout();
      toast.error("Logged Out");
  }

  return (
    <div className="navbar bg-base-100 rounded-l shadow-lg text-white">
      <div className="flex-1">
        <Menu />
      </div>
      <div className="flex-none gap-2">
        <div className="form-control text-end">
          <p className="text-gray-300">{userData.first_name} {userData.last_name}</p>
          <p className="text-blue-400 font-bold text-xs">{userData.role}</p>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to="/profile" className="justify-between">Mi Perfil</Link></li>
            <li><a className="text-red-500" onClick={handleLogout}>Cerrar Sesión</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
