import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { FcHome, FcBusinessman, FcDataEncryption, FcSettings } from "react-icons/fc";

export function Menu() {
    const [activeItem, setActiveItem] = useState(() => {
        // Recuperar el estado de localStorage al cargar la página
        return localStorage.getItem('activeItem') || 'general';
      });

    const handleItemClick = (item) => {
      setActiveItem(item);
      localStorage.setItem('activeItem', item); // Guardar el estado en localStorage
    };

    useEffect(() => {
        // Recuperar el estado de localStorage al cargar la página
        const savedItem = localStorage.getItem('activeItem');
        if (savedItem) {
          setActiveItem(savedItem);
        }
      }, []);

  return (
     
        <div className="w-56 text-blue-900 sticky h-full bg-white p-4 shadow-lg shadow-gray-500/50 z-40">
            <div className={`mb-4 menu-item ${activeItem === 'general' ? 'active' : ''}`}>
                <Link to="/dashboard" onClick={() => handleItemClick('general')}>
                <div className="flex">
                    <FcHome className="text-xl"/>
                    <p className='ml-2'>Dashboard</p>
                </div>
                </Link>
            </div>
            <div className={`mb-4 menu-item ${activeItem === 'profile' ? 'active' : ''}`}>
                <Link to="/profile" onClick={() => handleItemClick('profile')}>
                <div className="flex">
                    <FcBusinessman className="text-xl"/>
                    <p className='ml-2'>Mi Perfil</p>
                </div>
                </Link>
            </div>
            <div className={`mb-4 menu-item ${activeItem === 'select_dbg' ? 'active' : ''}`}>
                <Link to="/" onClick={() => handleItemClick('select_dbg')}>
                <div className="flex">
                    <FcDataEncryption className="text-xl"/>
                    <p className='ml-2'>Auditar Base de Datos</p>
                </div>
                </Link>
            </div>
            <div className={`mb-4 menu-item ${activeItem === 'more_options' ? 'active' : ''}`}>
                <Link to="#" onClick={() => handleItemClick('more_options')}>
                <div className="flex">
                    <FcSettings className="text-xl"/>
                    <p className='ml-2'>Más Opciones</p>
                </div>
                </Link>
            </div>
        </div>
    )
}

