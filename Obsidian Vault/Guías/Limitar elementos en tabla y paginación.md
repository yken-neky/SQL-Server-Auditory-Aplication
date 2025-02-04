
Para agregar scroll a la tabla manteniendo los headers fijos y limitando la altura visible, puedes hacer estos cambios:

1. **Agregar altura máxima y scroll a la tabla:**
```jsx
<div className="overflow-x-auto mt-8 max-h-96 overflow-y-auto"> {/* Agregadas max-h-96 y overflow-y-auto */}
  <p className="mx-5 mb-2 text-2xl text-slate-700 font-bold">Actividad de conexión a SQL Server</p>
  <hr className="border-stone-400 mb-4"/>
  <table className="table bg-base-300 rounded-lg relative"> {/* Agregado relative */}
    <thead className="text-gray-500 font-bold sticky top-0 bg-base-300"> {/* Agregado sticky top-0 y bg */}
      <tr>
        <th></th>
        <th>Servidor</th>
        <th>Usuario en la base de datos</th>
        <th>Estado de conexión</th>
        <th>Fecha y hora</th>
      </tr>
    </thead>
    <tbody className="text-white font-bold block max-h-80 overflow-y-auto"> {/* Nuevas clases */}
      {/* ... tu contenido actual del tbody ... */}
    </tbody>
  </table>
</div>
```

2. **Agregar estos estilos personalizados en tu CSS global:**
```css
/* Para mantener el header sticky */
.table thead tr {
  position: sticky;
  top: 0;
  z-index: 10;
}

/* Asegurar que la tabla mantenga su layout */
.table {
  display: table;
  width: 100%;
}

/* Mejorar apariencia del scroll */
.table-container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.table-container::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

.table-container::-webkit-scrollbar-track {
  background: #1f2937;
}
```

Los cambios clave son:
- `max-h-96`: Limita la altura máxima del contenedor a 384px (24rem)
- `overflow-y-auto`: Habilita scroll vertical
- `sticky top-0`: Mantiene los headers visibles al hacer scroll
- `bg-base-300`: Fondo para que los headers no se superpongan con el contenido

Si quieres una altura diferente, puedes ajustar las clases de altura:
- `max-h-80` = 320px (20rem)
- `max-h-96` = 384px (24rem)
- `max-h-[500px]` = Altura personalizada

También puedes considerar agregar paginación si prefieres no usar scroll:
```jsx
// Estado adicional para paginación
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

// Filtrar logs
const paginatedLogs = logs.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

// Controles de paginación en el JSX
<div className="join grid grid-cols-2 mt-4">
  <button
    className="join-item btn btn-outline"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(p => p - 1)}
  >
    Anterior
  </button>
  <button
    className="join-item btn btn-outline"
    disabled={logs.length <= currentPage * itemsPerPage}
    onClick={() => setCurrentPage(p => p + 1)}
  >
    Siguiente
  </button>
</div>
```

¿Qué enfoque prefieres? ¿Scroll infinito, paginación o el scroll tradicional que propuse inicialmente? Puedo ajustar la solución según lo necesites.