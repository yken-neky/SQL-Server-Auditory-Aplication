import React from 'react';
import { Link } from 'react-router-dom';
import { FcDatabase, FcLock, FcApproval, FcStatistics, FcSettings } from 'react-icons/fc';

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-base-200 to-stone-300 flex flex-col">
      {/* Sticky Navbar */}
      <nav className="navbar sticky top-0 z-50 bg-base-200/80 backdrop-blur-md shadow-lg flex justify-between items-center px-8 py-4 border-b border-stone-300">
        <div className="flex items-center gap-3">
          <FcDatabase className="text-3xl drop-shadow" />
          <span className="text-2xl font-extrabold text-slate-300 tracking-tight">Auditoría SQL Server</span>
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="btn btn-outline btn-primary font-semibold shadow hover:scale-105 transition-transform duration-200">Iniciar sesión</Link>
          <Link to="/register" className="btn btn-primary font-semibold shadow hover:scale-105 transition-transform duration-200">Registrarse</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gradient-to-b from-white via-blue-50 to-blue-100 shadow-inner">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 drop-shadow-lg">Plataforma de Auditoría de Seguridad para SQL Server</h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mb-8 font-medium">
          Una plataforma web especializada en auditorías de seguridad tecnológica, diseñada para evaluar vulnerabilidades en sistemas gestionados. Actualmente, ofrece soporte exclusivo para Microsoft SQL Server, con planes de expansión a otros gestores.
        </p>
        <div className="flex gap-6 justify-center">
          <Link to="/register" className="btn btn-primary btn-lg text-lg px-8 py-3 shadow-lg animate-bounce-slow">Comienza ahora</Link>
          <Link to="/login" className="btn btn-outline btn-primary btn-lg text-lg px-8 py-3 shadow-lg">Ya tengo cuenta</Link>
        </div>
      </section>

      {/* Sección: ¿Qué hace? */}
      <section className="py-12 px-4 max-w-5xl mx-auto w-full">
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700/90 rounded-2xl shadow-xl flex flex-col md:flex-row gap-10 items-center p-8 border border-blue-900 hover:shadow-2xl transition-shadow duration-300">
          <FcLock className="text-8xl mb-4 md:mb-0 drop-shadow-md" />
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">¿Qué puedes hacer?</h2>
            <ul className="list-disc list-inside text-blue-100 text-lg mb-3 space-y-2">
              <li><b>Ejecutar auditorías de seguridad en tiempo real</b> sobre servidores Microsoft SQL Server, identificando vulnerabilidades y configuraciones críticas.</li>
              <li><b>Consultar el historial completo de auditorías</b> realizadas, con acceso a reportes detallados y trazabilidad de cada acción.</li>
              <li><b>Gestionar tu perfil</b>: edita tu información, cambia tu contraseña o elimina tu cuenta de forma segura.</li>
              <li><b>Próximamente</b>: comparación de resultados entre auditorías y exportación de reportes en PDF.</li>
            </ul>
            <div className="bg-blue-950/60 rounded-lg p-4 mt-4 text-blue-200 text-sm">
              <b>Acceso seguro:</b> El registro es obligatorio para llevar un control forense sobre quién realiza cada auditoría y cuándo.
            </div>
            <div className="mt-6">
              <Link to="/register" className="btn btn-primary btn-wide font-semibold shadow hover:scale-105 transition-transform duration-200">Regístrate para auditar</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: ¿Cómo funciona? */}
      <section className="py-12 px-4 max-w-5xl mx-auto w-full">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700/90 rounded-2xl shadow-xl flex flex-col md:flex-row-reverse gap-10 items-center p-8 border border-slate-900 hover:shadow-2xl transition-shadow duration-300">
          <FcSettings className="text-8xl mb-4 md:mb-0 drop-shadow-md" />
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">¿Cómo funciona?</h2>
            <ul className="list-disc list-inside text-slate-100 text-lg mb-3 space-y-2">
              <li><b>Registro e inicio de sesión</b> obligatorios para acceder al dashboard y funcionalidades.</li>
              <li><b>Requisitos técnicos:</b> debes estar en la misma red que el servidor SQL Server, tener acceso remoto y credenciales de administrador.</li>
              <li><b>Flujo seguro:</b> al iniciar una auditoría, la navegación fuera del servicio se bloquea hasta finalizar, garantizando la integridad del proceso.</li>
              <li><b>Interfaz guiada</b> para seleccionar y ejecutar controles de seguridad, con resultados almacenados automáticamente en tu historial.</li>
              <li><b>Validación de privilegios:</b> solo usuarios con permisos de administrador pueden ejecutar auditorías efectivas.</li>
              <li className="text-yellow-300"><b>Nota:</b> Si intentas auditar sin privilegios de administrador, la conexión será posible pero la auditoría fallará. Pronto se implementará validación y manejo de errores para este caso.</li>
            </ul>
            <div className="bg-slate-950/60 rounded-lg p-4 mt-4 text-slate-200 text-sm">
              <b>Recomendación:</b> Usa credenciales de administrador y asegúrate de que la red permita conexiones remotas.
            </div>
            <div className="mt-6">
              <Link to="/login" className="btn btn-outline btn-primary btn-wide font-semibold shadow hover:scale-105 transition-transform duration-200">Inicia sesión para comenzar</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Cumplimiento y Seguridad */}
      <section className="py-12 px-4 max-w-5xl mx-auto w-full">
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700/90 rounded-2xl shadow-xl flex flex-col md:flex-row gap-10 items-center p-8 border border-emerald-900 hover:shadow-2xl transition-shadow duration-300">
          <FcApproval className="text-8xl mb-4 md:mb-0 drop-shadow-md" />
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">Cumplimiento y Seguridad</h2>
            <ul className="list-disc list-inside text-emerald-100 text-lg mb-3 space-y-2">
              <li><b>Evaluación integral</b> basada en el estándar internacional <b>CIS Microsoft SQL Server Benchmark 2019 & 2022</b>, cubriendo el 100% de los controles definidos.</li>
              <li><b>Mapeo técnico preciso:</b> cada hallazgo incluye ID de control, descripción, criticidad y evidencia técnica.</li>
              <li><b>Priorización inteligente:</b> clasificación automática de vulnerabilidades según impacto y riesgo.</li>
              <li><b>Beneficios:</b> cumplimiento normativo (ISO 27001, PCI-DSS, GDPR), reducción de superficie de ataque y heatmaps de riesgos.</li>
              <li><b>Ejemplo de control:</b> "CIS MSSQL 2022 2.3: Ensure CLR Enabled Server Configuration Option is set to 0" (Severidad: Alto).</li>
            </ul>
            <div className="bg-emerald-950/60 rounded-lg p-4 mt-4 text-emerald-200 text-sm">
              <b>Protección de datos:</b> nunca se almacenan credenciales, todo dato sensible se cifra con AES-256 y solo se recibe información cifrada.
            </div>
            <div className="mt-6">
              <Link to="/register" className="btn btn-primary btn-wide font-semibold shadow hover:scale-105 transition-transform duration-200">Crea tu cuenta segura</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Flexibilidad y Auditorías */}
      <section className="py-12 px-4 max-w-5xl mx-auto w-full">
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700/90 rounded-2xl shadow-xl flex flex-col md:flex-row gap-10 items-center p-8 border border-indigo-900 hover:shadow-2xl transition-shadow duration-300">
          <FcStatistics className="text-8xl mb-4 md:mb-0 drop-shadow-md" />
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">Flexibilidad, Escaneos y Resumen Ejecutivo</h2>
            <ul className="list-disc list-inside text-indigo-100 text-lg mb-3 space-y-2">
              <li><b>Auditorías ilimitadas</b>: ejecuta tantas auditorías como necesites, sin restricciones de frecuencia.</li>
              <li><b>Escaneos personalizados</b>: elige entre auditoría completa (100% de controles CIS) o parcial (selecciona capítulos específicos como Cifrado o Autenticación).</li>
              <li><b>Comparación avanzada</b> (en desarrollo): compara auditorías del mismo tipo y detecta desviaciones entre ejecuciones históricas.</li>
              <li><b>Priorización por severidad</b>: heatmaps y resúmenes ejecutivos que muestran el nivel global de seguridad y porcentaje de controles cumplidos por categoría de riesgo.</li>
              <li><b>Gestión segura de datos</b>: historial de auditorías sin almacenar credenciales, cifrado en tránsito y registro forense detallado de cada conexión.</li>
              <li><b>Ejemplo de flujo:</b> selecciona 15 controles críticos de Cifrado y recibe un resumen: "Protección global: 68% (11/15 controles cumplidos), 3 controles críticos no cumplidos".</li>
            </ul>
            <div className="bg-indigo-950/60 rounded-lg p-4 mt-4 text-indigo-200 text-sm">
              <b>Ventajas clave:</b> flexibilidad operativa, trazabilidad total y priorización de riesgos basada en severidad CIS.
            </div>
            <div className="mt-6">
              <Link to="/register" className="btn btn-primary btn-wide font-semibold shadow hover:scale-105 transition-transform duration-200">Empieza a auditar gratis</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Arquitectura y Tecnología */}
      <section className="py-12 px-4 max-w-5xl mx-auto w-full">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700/90 rounded-2xl shadow-xl flex flex-col md:flex-row gap-10 items-center p-8 border border-gray-900 hover:shadow-2xl transition-shadow duration-300">
          <FcDatabase className="text-8xl mb-4 md:mb-0 drop-shadow-md" />
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">Arquitectura y Seguridad Técnica</h2>
            <ul className="list-disc list-inside text-gray-100 text-lg mb-3 space-y-2">
              <li><b>Backend:</b> Django REST Framework con <b>django-mssql-backend</b> y <b>pyodbc</b> para conexión nativa y consultas de alto rendimiento a SQL Server 2022.</li>
              <li><b>Seguridad por defecto:</b> protección CSRF, autenticación por token y sesión, CORS estricto, validación de datos y consultas parametrizadas.</li>
              <li><b>Rendimiento:</b> consultas optimizadas, caché de resultados y arquitectura escalable (Docker/Kubernetes).</li>
              <li><b>Frontend:</b> React 18 + Vite + TailwindCSS/DaisyUI para una experiencia rápida, moderna y responsive.</li>
              <li><b>Base de datos:</b> SQL Server 2022 con auto-auditoría y cifrado Always Encrypted para metadatos sensibles.</li>
              <li><b>Comparativa de seguridad:</b> DRF ofrece protección CSRF, validación y autenticación integradas, superando alternativas típicas.</li>
              <li><b>Escalabilidad:</b> solución pensada para subredes pequeñas (menos de 50 usuarios concurrentes), con posibilidad de migrar a Go para concurrencia masiva en el futuro.</li>
            </ul>
            <div className="bg-gray-950/60 rounded-lg p-4 mt-4 text-gray-200 text-sm">
              <b>Conclusión técnica:</b> máxima compatibilidad y eficiencia en auditorías CIS Benchmark, con alto cumplimiento de estándares y seguridad avanzada.
            </div>
            <div className="mt-6">
              <Link to="/register" className="btn btn-primary btn-wide font-semibold shadow hover:scale-105 transition-transform duration-200">Crea tu cuenta y explora la tecnología</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-base-200/90 text-center text-gray-500 text-base border-t border-stone-300 shadow-inner">
        <span className="font-semibold text-slate-700">&copy; {new Date().getFullYear()} Auditoría SQL Server</span> &mdash; Plataforma informativa y de auditoría tecnológica.
      </footer>
    </div>
  );
}
