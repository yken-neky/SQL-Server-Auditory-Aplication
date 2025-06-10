import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";
import { DBConnectionProvider } from '@/contexts/DBConnectionContext';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SQL Server Auditor",
  description: "Aplicación para auditar servidores SQL Server",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-slate-950 min-h-screen`}>
        <AuthProvider>
          <UserProvider>
            <DBConnectionProvider>
              <Toaster 
                position="top-center"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#1e293b',
                    color: '#fff',
                  }
                }}
              />
              {children}
            </DBConnectionProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
