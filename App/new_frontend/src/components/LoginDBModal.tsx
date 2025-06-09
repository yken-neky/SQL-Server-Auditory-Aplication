"use client";

import { useState } from "react";
import { connectToDB } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useDBConnection } from "@/contexts/DBConnectionContext";

export default function LoginDBModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { setConnected } = useDBConnection();
  const [formData, setFormData] = useState({
    driver: "",
    server: "",
    db_user: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await connectToDB(formData);
      setConnected(true); // Marcar conexión activa
      router.push("/dashboard/auditory");
    } catch (err: any) {
      setError(
        err?.response?.data?.detail || "Error de conexión. Verifica los datos."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-slate-700">
        <button
          onClick={handleBack}
          className="absolute top-3 left-4 text-slate-400 hover:text-white text-2xl focus:outline-none"
          title="Volver al dashboard"
        >
          ←
        </button>
        <h2 className="text-2xl font-bold text-sky-400 mb-6 text-center">
          Conexión a SQL Server
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="driver" className="block text-sm font-medium text-slate-300">
              Driver
            </label>
            <input
              type="text"
              id="driver"
              name="driver"
              value={formData.driver}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-700 rounded-md bg-slate-800 text-slate-100 shadow-sm focus:ring-sky-500 focus:border-sky-500 text-base"
            />
          </div>
          <div>
            <label htmlFor="server" className="block text-sm font-medium text-slate-300">
              Servidor
            </label>
            <input
              type="text"
              id="server"
              name="server"
              value={formData.server}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-700 rounded-md bg-slate-800 text-slate-100 shadow-sm focus:ring-sky-500 focus:border-sky-500 text-base"
            />
          </div>
          <div>
            <label htmlFor="db_user" className="block text-sm font-medium text-slate-300">
              Usuario de BD
            </label>
            <input
              type="text"
              id="db_user"
              name="db_user"
              value={formData.db_user}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-700 rounded-md bg-slate-800 text-slate-100 shadow-sm focus:ring-sky-500 focus:border-sky-500 text-base"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-700 rounded-md bg-slate-800 text-slate-100 shadow-sm focus:ring-sky-500 focus:border-sky-500 text-base"
            />
          </div>
          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition disabled:opacity-60"
            >
              {loading ? "Conectando..." : "Conectar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
