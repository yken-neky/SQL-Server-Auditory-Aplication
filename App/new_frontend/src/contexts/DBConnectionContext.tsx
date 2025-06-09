"use client";
import { useEffect, useState, createContext, useContext } from 'react';
import { connectToDB, logoutDB } from '@/lib/axios';

interface DBConnectionContextType {
  isConnected: boolean;
  setConnected: (v: boolean) => void;
  checkConnection: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const DBConnectionContext = createContext<DBConnectionContextType | undefined>(undefined);

export function DBConnectionProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Inicializar desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem('db_is_connected');
    setIsConnected(stored === 'true');
  }, []);

  // Guardar en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('db_is_connected', isConnected ? 'true' : 'false');
  }, [isConnected]);

  const setConnected = (v: boolean) => {
    setIsConnected(v);
    localStorage.setItem('db_is_connected', v ? 'true' : 'false');
  };

  // Chequeo inicial: ¿hay conexión activa? (opcional, si tienes endpoint de status)
  const checkConnection = async () => {
    try {
      await connectToDB({ ping: true });
      setConnected(true);
    } catch {
      setConnected(false);
    }
  };

  const disconnect = async () => {
    await logoutDB();
    setConnected(false);
  };

  return (
    <DBConnectionContext.Provider value={{ isConnected, setConnected, checkConnection, disconnect }}>
      {children}
    </DBConnectionContext.Provider>
  );
}

export function useDBConnection() {
  const ctx = useContext(DBConnectionContext);
  if (!ctx) throw new Error('useDBConnection must be used within DBConnectionProvider');
  return ctx;
}
