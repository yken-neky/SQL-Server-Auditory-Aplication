'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const token = Cookies.get('authToken');
            setIsAuthenticated(!!token);
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = (token: string) => {
        Cookies.set('authToken', token, { 
            expires: 7, // El token expira en 7 días
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        });
        setIsAuthenticated(true);
        router.push('/dashboard');
    };

    const logout = () => {
        Cookies.remove('authToken');
        setIsAuthenticated(false);
        router.push('/auth/login');
    };

    if (isLoading) {
        return null; // O un componente de carga si lo prefieres
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 