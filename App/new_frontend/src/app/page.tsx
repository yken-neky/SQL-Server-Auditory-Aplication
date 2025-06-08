import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header/Nav */}
      <nav className="fixed w-full bg-slate-900/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/icon.svg" alt="Logo" width={40} height={40} />
            <span className="text-sky-500 font-bold text-xl">SQL Auditor</span>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/auth/login"
              className="px-4 py-2 text-sky-500 hover:text-sky-400 transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-400 transition-colors"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Auditoría de Seguridad para
            <span className="text-sky-500"> SQL Server</span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-8">
            Plataforma web especializada en auditorías de seguridad tecnológica, 
            diseñada con un enfoque intuitivo para evaluar vulnerabilidades en sistemas gestionados.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/auth/register"
              className="px-8 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-400 transition-colors text-lg font-semibold group"
            >
              <span className="group-hover:translate-x-1 inline-block transition-transform">
                Comenzar Ahora →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Características Principales
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-6 rounded-xl transform hover:scale-105 transition-transform">
              <h3 className="text-sky-500 text-xl font-semibold mb-4">
                Auditorías Ilimitadas
              </h3>
              <p className="text-slate-300">
                Ejecuta tantas auditorías como necesites, sin restricciones de frecuencia o cantidad.
                Personaliza tus evaluaciones seleccionando controles específicos.
              </p>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl transform hover:scale-105 transition-transform">
              <h3 className="text-sky-500 text-xl font-semibold mb-4">
                Cumplimiento CIS
              </h3>
              <p className="text-slate-300">
                Evaluación completa basada en CIS Microsoft SQL Server 2019 & 2022 Benchmark, 
                cubriendo más de 200 controles de seguridad.
              </p>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl transform hover:scale-105 transition-transform">
              <h3 className="text-sky-500 text-xl font-semibold mb-4">
                Seguridad Garantizada
              </h3>
              <p className="text-slate-300">
                Cifrado AES-256 para credenciales y protección total de datos sensibles.
                Nunca almacenamos credenciales de servidores SQL.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Detalles Técnicos
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Marco de Cumplimiento
              </h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 mt-1">✓</span>
                  <span>Evaluación del 100% de los controles CIS</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 mt-1">✓</span>
                  <span>Mapeo técnico preciso con ID de control y descripción</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 mt-1">✓</span>
                  <span>Clasificación por niveles de criticidad</span>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Requisitos Técnicos
              </h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 mt-1">→</span>
                  <span>Acceso a la red del servidor SQL Server</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 mt-1">→</span>
                  <span>Configuración de red que permita conexiones remotas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 mt-1">→</span>
                  <span>Credenciales de administrador del servidor</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Beneficios
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-6 rounded-xl transform hover:-translate-y-2 transition-transform">
              <h3 className="text-sky-500 text-xl font-semibold mb-4">
                Cumplimiento Normativo
              </h3>
              <p className="text-slate-300">
                Facilita auditorías para ISO 27001, PCI-DSS y GDPR
              </p>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl transform hover:-translate-y-2 transition-transform">
              <h3 className="text-sky-500 text-xl font-semibold mb-4">
                Reducción de Riesgos
              </h3>
              <p className="text-slate-300">
                Implementación verificada de más de 200 controles de hardening
              </p>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl transform hover:-translate-y-2 transition-transform">
              <h3 className="text-sky-500 text-xl font-semibold mb-4">
                Priorización Inteligente
              </h3>
              <p className="text-slate-300">
                Heatmaps que destacan desviaciones de alto riesgo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Listo para mejorar la seguridad de tu SQL Server?
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Únete a nuestra plataforma y comienza a proteger tus bases de datos 
            con los estándares más altos de seguridad.
          </p>
          <Link
            href="/auth/register"
            className="inline-block px-8 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-400 transition-all hover:shadow-lg hover:shadow-sky-500/20 group"
          >
            <span className="inline-flex items-center gap-2 text-lg font-semibold group-hover:gap-3 transition-all">
              Registrarse Gratis
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 px-4">
        <div className="container mx-auto text-center text-slate-400">
          <p>© 2024 SQL Auditor. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
