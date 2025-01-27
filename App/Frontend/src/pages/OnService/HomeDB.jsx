import { LogOutDB } from "../../api/log-reg.api";
import {useNavigate} from 'react-router-dom';
import toast from "react-hot-toast";

export function HomeDB() {
  const navigate = useNavigate();
  const handleLogOut =  async () => {
    await LogOutDB();
    navigate('/Dashboard')
    toast.success("Desconexión exitosa de SQL Server 2022.")
  }

  return (
    <>
    <div>HomeDB</div>
    <button onClick={handleLogOut} className="btn btn-error">Cerrar Sesión en BD</button>
    </>
  )
}

