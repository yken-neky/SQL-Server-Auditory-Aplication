// src/components/ConnectionForm.jsx
import { useState } from 'react';
import { ConnectToDB } from '../../api/log-reg.api'; // Asegúrate de importar la función desde tu archivo de configuración de axios
import { useNavigate } from 'react-router-dom';

const ConnectionForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      driver: '',
      server: '',
      db_user: '',
      password: ''
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ConnectToDB(formData);
      console.log('Conexión exitosa:', response.data);
      // Puedes redirigir o mostrar un mensaje de éxito aquí
      navigate('/home')
    } catch (error) {
      console.error('Error de conexión:', error.response.data);
      // Puedes mostrar un mensaje de error aquí
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Conexión a SQL Server</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="driver" className="block text-sm font-medium text-gray-700">Driver</label>
          <input
            type="text"
            id="driver"
            name="driver"
            value={formData.driver}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="server" className="block text-sm font-medium text-gray-700">Servidor</label>
          <input
            type="text"
            id="server"
            name="server"
            value={formData.server}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="db_user" className="block text-sm font-medium text-gray-700">Usuario de BD</label>
          <input
            type="text"
            id="db_user"
            name="db_user"
            value={formData.db_user}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Conectar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConnectionForm;
