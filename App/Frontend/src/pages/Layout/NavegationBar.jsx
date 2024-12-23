import { LogOutUser } from "../../api/log-reg.api";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { FcCancel } from "react-icons/fc";

export function NavegationBar() {
  const { logout } = useAuth();

  const handleLogout = async () => { 
      await LogOutUser();
      logout();
      toast.error("Logged Out");
    }

  return (

    <div className="w-full h-full px-4 flex justify-between items-center text-blue-900 font-semibold">
      <div className="flex">
        <a className="btn btn-ghost text-xl">
        <img src="/icon.png" className="h-10"/>
        S.H.I.E.L.D.
        </a>
      </div>
      <div className="w-3/4 flex justify-end">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost m-1">Click to Open</div>
        <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </div>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost m-1">Click to Open</div>
        <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </div>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost m-1">Click to Open</div>
        <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </div>
        <div className="flex items-center" onClick={handleLogout}>
          <button className="text-red-500 font-bold mr-3 hover:underline">Cerrar sesión</button>
          <FcCancel className="text-red-500 text-xl" />
        </div>
      </div>
    </div>


  )
}
