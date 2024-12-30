
¡Claro! Vamos a modificar el código para utilizar Axios en un archivo aparte. A continuación te muestro cómo hacerlo:

### Paso 1: Instalar Axios

Primero, asegúrate de tener Axios instalado en tu proyecto. Puedes instalarlo ejecutando el siguiente comando en tu terminal:

```bash
npm install axios
```

### Paso 2: Crear el Archivo de Utilidades para Axios

Crea un nuevo archivo llamado `api.js` en el directorio `src` y configura Axios:

```javascript
// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Authorization': 'Token tu_token_aqui', // Asegúrate de reemplazar esto con tu token real
        'Content-Type': 'application/json'
    }
});

export const executeQuery = (ids) => {
    const url = `/execute_query/?ids=${ids.join('&ids=')}`;
    return api.get(url);
};
```

### Paso 3: Modificar el Componente en React para Usar Axios

Ahora modifica tu componente en React para utilizar el archivo `api.js` que acabamos de crear:

```jsx
// src/App.jsx
import React, { useState } from 'react';
import { executeQuery } from './api';

function App() {
    const [selectedControls, setSelectedControls] = useState([]);

    const handleCheckboxChange = (event) => {
        const controlId = event.target.value;
        if (event.target.checked) {
            setSelectedControls([...selectedControls, controlId]);
        } else {
            setSelectedControls(selectedControls.filter(id => id !== controlId));
        }
    };

    const sendRequest = () => {
        if (selectedControls.length === 0) {
            alert("Selecciona al menos un control.");
            return;
        }

        executeQuery(selectedControls)
            .then(response => {
                console.log(response.data);
                // Aquí puedes manejar la respuesta del servidor
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <h3>Selecciona los controles:</h3>
            <div>
                <input type="checkbox" id="control1" value="1" onChange={handleCheckboxChange} />
                <label htmlFor="control1">Control 1</label>
            </div>
            <div>
                <input type="checkbox" id="control2" value="2" onChange={handleCheckboxChange} />
                <label htmlFor="control2">Control 2</label>
            </div>
            <div>
                <input type="checkbox" id="control3" value="3" onChange={handleCheckboxChange} />
                <label htmlFor="control3">Control 3</label>
            </div>
            {/* Agrega más controles según sea necesario */}
            <button type="button" onClick={sendRequest}>Enviar</button>
        </div>
    );
}

export default App;
```

En este ejemplo:
1. Creas un archivo `api.js` donde configuras Axios y defines una función `executeQuery` para enviar la solicitud GET.
2. Modificas tu componente React `App` para importar y usar la función `executeQuery` de `api.js`.

Ahora tu aplicación React debería funcionar correctamente utilizando Axios para enviar las solicitudes al backend según las selecciones del usuario. ¡Espero que esto te sea útil! Si necesitas más ayuda, ¡estoy aquí para ayudarte! 😊