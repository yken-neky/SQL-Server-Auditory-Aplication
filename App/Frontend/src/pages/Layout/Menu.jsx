import { Link } from "react-router-dom"
import { FcHome, FcBusinessman, FcDataEncryption } from "react-icons/fc";

export function Menu() {

  return (
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button flex justify-start w-48">
                <img className="w-10 h-10" src="icon.png"/>S.H.I.E.L.D.
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              <li><Link to="/dashboard"><FcHome className="w-5 h-5"/>Dashboard</Link></li>
              <li><Link to="/profile"><FcBusinessman className="w-5 h-5"/>Mi perfil</Link></li>
              <li><Link to="/db_login"><FcDataEncryption className="w-5 h-5"/>Auditar SQL Server</Link></li>
            </ul>
          </div>
        </div>

    )
}

