### 1. Importaciones y Configuración Inicial

En el código original, las importaciones (`require`) están mezcladas a lo largo del archivo (Express arriba, Helmet a la mitad).

*   **Buena práctica:** Todas las dependencias de terceros y módulos internos deben requerirse **al principio del archivo**. Esto permite ver de un vistazo qué librerías necesita este script para funcionar.
*   **Declaración de constantes:** Hemos usado `let PORT = 4004;`. Como el puerto es un valor de configuración que no va a cambiar durante la ejecución del servidor, lo ideal es declararlo siempre con `const PORT = 4004;`.

---

### 2. El Orden en Express es Vital (El flujo de ejecución)

En el código de clase hemos puesto el `app.listen()` al principio y los middlewares y rutas después. Aunque en este caso concreto funciona porque Node.js procesa el archivo entero de forma asíncrona, la arquitectura estándar dicta el siguiente orden estricto de arriba a abajo:
1.  **Imports** (Librerías).
2.  **Configuración** (Inicializar `app`, declarar puertos).
3.  **Middlewares globales** (Helmet, Loggers, parseadores de JSON).
4.  **Ruteo / Endpoints** (Los métodos `.get`, `.post`, etc.).
5.  **Arranque del servidor** (`app.listen()`).

Express lee el código en cascada. Si una petición entra, pasará por los middlewares y rutas en el orden exacto en el que estén escritos. Poner `app.listen()` al final asegura que todas las rutas y protecciones estén cargadas en memoria antes de empezar a aceptar peticiones externas.

---

### 3. Análisis de los Middlewares implementados

Hemos implementado dos tipos de middlewares que ilustran perfectamente su utilidad:

*   **Middleware de Terceros (Helmet):** Protege la aplicación configurando las cabeceras HTTP. El apunte del código es importante: `app.use(helmet())` lleva paréntesis porque `helmet` nos devuelve una función que es la que realmente actúa como middleware.
*   **Middleware Propio (`myLogger`):** Recibe `(req, res, next)`. Imprime el verbo HTTP (`req.method`) y la ruta solicitada (`req.originalUrl`). El uso de `next()` aquí es vital; sin él, la petición se quedaría bloqueada en este punto y nunca llegaría a los `app.get()` que hay más abajo.

---

### 4. Ruteo y Extracción de Parámetros Dinámicos

La concatenación de parámetros en la ruta `/users/:userID/books/:bookID` es una técnica estándar para diseñar APIs RESTful jerárquicas (por ejemplo, "buscar un libro concreto que pertenece a un usuario concreto").

*   **El objeto `req.params`:** Captura automáticamente cualquier variable de la ruta. En la ruta anterior, si el cliente pide `/users/15/books/89`, `req.params` será un objeto JavaScript equivalente a: `{ userID: "15", bookID: "89" }`.
*   **El uso de `JSON.stringify()`:** En el código hemos usado `JSON.stringify(req.params)`. Como `res.send()` espera enviar texto o HTML, intentar concatenar un objeto directamente (`"Texto " + objeto`) imprimiría el clásico `[object Object]`. Al convertirlo a una cadena JSON con *stringify*, podemos visualizar su contenido directamente en el navegador.

---

### Código Refactorizado (Aplicando buenas prácticas)

Así quedaría el mismo código ordenado siguiendo los estándares de desarrollo backend:

```javascript
// 1. IMPORTACIONES
const express = require('express');
const helmet = require('helmet');

// 2. CONFIGURACIÓN INICIAL
const app = express();
const PORT = 4004;

// 3. MIDDLEWARES GLOBALES
// Helmet siempre de los primeros para proteger las cabeceras desde el inicio
app.use(helmet());

// Nuestro Logger personalizado
const myLogger = (req, res, next) => {
    console.log(`Logger: ${req.method} ${req.originalUrl}`);
    next(); // Pasa el control a la siguiente función
};
app.use(myLogger);

// 4. RUTEO (ENDPOINTS)
app.get('/', (req, res) => {
    res.send('Hola desde el servidor');
});

app.get('/pepito', (req, res) => {
    res.send('Has pedido algo a pepito');
});

// Rutas con parámetros
app.get('/users/:userID', (req, res) => {
    // Es buena práctica extraer el dato para trabajar con él
    const id = req.params.userID; 
    res.send(`Hola usuario con ID: ${id}`);
});

// Rutas con múltiples parámetros
app.get('/users/:userID/books/:bookID', (req, res) => {
    // Al usar JSON.stringify convertimos el objeto en una cadena de texto visible
    res.send(`Mostrando parámetros de la URL: ${JSON.stringify(req.params)}`);
});

// 5. INICIO DEL SERVIDOR
// Siempre al final del archivo
app.listen(PORT, () => {
    console.log(`App running en http://localhost:${PORT}`);
});
```