# Creación de una API RESTful con Express

Una **API REST** (Representational State Transfer) es una interfaz que permite a diferentes aplicaciones comunicarse entre sí. En el desarrollo web, el backend (nuestro servidor Express) actúa como una API que recibe peticiones del frontend (o de aplicaciones móviles) y devuelve los datos solicitados, habitualmente en formato **JSON**.

## 1. Los 4 Pilares de una API (Operaciones CRUD)

Toda API gira en torno a la manipulación de recursos o datos (usuarios, libros, tareas, usuarios, etc.). Estas operaciones se conocen como **CRUD** y se mapean directamente con los verbos HTTP:

*   **C**reate (Crear): Se usa el verbo HTTP **POST**.
*   **R**ead (Leer): Se usa el verbo HTTP **GET**.
*   **U**pdate (Actualizar): Se usan los verbos HTTP **PUT** (reemplaza todo el objeto) o **PATCH** (modifica solo una parte).
*   **D**elete (Borrar): Se usa el verbo HTTP **DELETE**.

## 2. Preparación del Servidor para una API

Para que Express funcione correctamente como una API que recibe y envía datos, es estrictamente necesario configurar el middleware nativo que parsea los JSON. Si no ponemos esto, el servidor no podrá leer lo que el cliente envíe en las peticiones POST o PUT.

```javascript
const express = require('express');
const app = express();

// IMPORTANTE: Middleware para que Express entienda el formato JSON que viene en el body
app.use(express.json()); 
```

## 3. Códigos de Estado HTTP (Status Codes)

Una buena API no solo devuelve datos, sino que avisa al cliente de cómo ha ido la operación utilizando los códigos de estado HTTP. Los más importantes son:

**FAMILIA 2xx: EXITO** Indican que la petición fué recibida, entendida y procesada correctamente:
  *   **200 (OK):** Todo ha ido bien (por defecto en las respuestas de Express).
  *   **201 (Created):** Se ha creado un recurso nuevo con éxito (ideal para peticiones POST).
  *   **204 (No Content):** La petición tuvo éxito, pero no hay nada que devolver en el body. Es el código ideal para responder a un DELETE exitoso.

**FAMILIA 3xx: REDIRECCIÓN** Indican al cliente que debe realizar una acción adicional para completar la petición (normalmente ir a otra URL).
  *   **301 (Moved Permanently):** El recurso (o la ruta de la API) ha cambiado de URL de forma definitiva.
  *   **304 (Not Modified):** El recurso no ha cambiado desde la última vez que el cliente lo pidió. Se usa mucho para sistemas de caché ahorrando ancho de banda al no volver a enviar el mismo JSON.

**FAMILIA 4xx: ERRORES DE CLIENTE** El error está en la petición que ha hecho el frontend (le faltan datos, está mal escrita, no tiene permisos).
  *   **400 (Bad Request):** El cliente ha enviado datos incorrectos o incompletos.
  *   **401 (Unauthorized):** El cliente no está autenticado (ej. falta el JWT).
  *   **403 (Forbidden):** El usuario sí está autenticado, pero no tiene los permisos o el rol necesario para esa acción (ej. un usuario normal intentando borrar datos de otro usuario). Esta es la diferencia clave con el 401.
  *   **404 (Not Found):** El recurso que se busca no existe (ej. un usuario con un ID que no está en la base de datos).
  *   **405 (Method Not Allowed):** La ruta existe, pero no con ese verbo. Por ejemplo, intentas hacer un POST /usuarios, pero en Express solo tienes definido app.get('/usuarios').
  *   **409 (Conflict):** La petición entra en conflicto con el estado actual del servidor. El ejemplo clásico es intentar registrar un usuario con un email que ya existe en la base de datos.
  *   **422 (Unprocessable Entity):** El formato del JSON es correcto, pero su contenido es semánticamente inválido (ej. mandas un campo "edad" con el valor "-5"). Es el código estándar cuando fallan las validaciones de datos.
  *   **429 (Too Many Requests):** El cliente ha superado el límite de peticiones permitidas en un tiempo determinado. Se usa para evitar ataques de fuerza bruta o de denegación de servicio (DDoS).

**FAMILIA 5xx: ERRORES DE SERVIDOR** El cliente hizo todo bien, pero tu código en el backend ha fallado.
  *   **500 (Internal Server Error):** Ha fallado algo en nuestro servidor (ej. se ha caído la base de datos).
  *   **502 (Bad Gateway):** Muy común cuando tu aplicación Node.js está detrás de un servidor proxy (como Nginx o Apache) y la comunicación entre el proxy y Node.js falla.
  *   **503 (Service Unavailable):** El servidor no está listo para manejar la petición (ej. está en mantenimiento o completamente saturado).
  *   **504 (Gateway Timeout):** El servidor tardó demasiado tiempo en procesar la petición y el proxy cortó la conexión (ej. una consulta muy pesada a la base de datos que tarda más de 30 segundos).

Se envían encadenando el método `.status()` antes del `.json()`:
`res.status(404).json({ error: "Usuario no encontrado" });`

---

## 4. Ejemplo Práctico: API CRUD Completa (En Memoria)

A continuación, la estructura de una API básica que gestiona "Tareas". En un entorno real, estos datos se guardarían en una base de datos (como MySQL o MongoDB), pero para este ejemplo usaremos un array en memoria.

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Simulamos nuestra base de datos
let tareas = [
    { id: 1, titulo: 'Aprender Node', completada: false },
    { id: 2, titulo: 'Estudiar para el examen DAW', completada: true }
];

// ==========================================
// 1. READ (GET) - Obtener todas las tareas
// ==========================================
app.get('/api/tareas', (req, res) => {
    res.json(tareas);
});

// ==========================================
// 2. READ (GET) - Obtener una tarea por ID
// ==========================================
app.get('/api/tareas/:id', (req, res) => {
    const idParam = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === idParam);

    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    res.json(tarea);
});

// ==========================================
// 3. CREATE (POST) - Crear una nueva tarea
// ==========================================
app.post('/api/tareas', (req, res) => {
    const { titulo } = req.body;

    // Validación básica: comprobamos que nos envían el título
    if (!titulo) {
        return res.status(400).json({ error: 'El título es obligatorio' });
    }

    const nuevaTarea = {
        id: tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1, // Autoincrementamos el ID
        titulo: titulo,
        completada: false
    };

    tareas.push(nuevaTarea);
    
    // Respondemos con código 201 (Creado) y la tarea nueva
    res.status(201).json(nuevaTarea); 
});

// ==========================================
// 4. UPDATE (PUT) - Actualizar una tarea entera
// ==========================================
app.put('/api/tareas/:id', (req, res) => {
    const idParam = parseInt(req.params.id);
    const { titulo, completada } = req.body;

    const index = tareas.findIndex(t => t.id === idParam);

    if (index === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    // Actualizamos los datos
    tareas[index] = {
        id: idParam,
        titulo: titulo !== undefined ? titulo : tareas[index].titulo,
        completada: completada !== undefined ? completada : tareas[index].completada
    };

    res.json({ mensaje: 'Tarea actualizada', tarea: tareas[index] });
});

// ==========================================
// 5. DELETE (DELETE) - Borrar una tarea
// ==========================================
app.delete('/api/tareas/:id', (req, res) => {
    const idParam = parseInt(req.params.id);
    const index = tareas.findIndex(t => t.id === idParam);

    if (index === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    // Eliminamos 1 elemento en la posición 'index'
    tareas.splice(index, 1);

    res.json({ mensaje: 'Tarea eliminada correctamente' });
});

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`API de Tareas corriendo en http://localhost:${PORT}`);
});
```

## 5. Buenas prácticas al diseñar una API

*   **Usar sustantivos en plural, no verbos:** La ruta debe ser `/api/tareas`, NO `/api/getTareas` ni `/api/crearTarea`. El verbo (GET, POST) ya indica la acción.
*   **Mantener las URLs limpias y jerárquicas:** Si quieres ver los comentarios de una tarea concreta, la ruta ideal sería `/api/tareas/:id/comentarios`.
*   **Versiona tu API:** Es muy común prefijar las rutas con `/api/v1/...`. Así, si en el futuro haces cambios drásticos (v2), los clientes antiguos que usan la v1 no dejarán de funcionar repentinamente.
*   **Organización del código (Router):** A medida que la API crece, no puedes tener todas las rutas en el `index.js`. Express proporciona una herramienta llamada `express.Router()` para separar las rutas en distintos archivos (ej. `rutas/tareas.js`, `rutas/usuarios.js`).