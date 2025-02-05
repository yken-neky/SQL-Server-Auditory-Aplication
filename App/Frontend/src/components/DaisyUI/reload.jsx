// Agregar este botón en tu JSX

import { FcRefresh } from "react-icons/fc";


export function ReloadComponent() {
  return (
    <>
        <button onClick={() => window.location.reload()} className="btn btn-ghost mt-2">
        <FcRefresh/>
            Actualizar
        </button>
    </>
  )
}
