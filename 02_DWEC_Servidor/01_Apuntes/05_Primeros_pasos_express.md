# Primeros pasos con Express

Express es el framework (marco de trabajo) web más popular de Node.js. Nos permite desarrollar aplicaciones web y servidores HTTP y APIs de forma mucho más rápida y sencilla que utilizando el módulo HTTP nativo de Node. Proporciona una capa de utilidades fundamentales sin ocultar las características propias de Node.js.

## 1. Instalación del paquete de Express

Para instalarlo, nos situamos en la carpeta del proyecto dónde ya hemos iniciado nuestro gestor de paquetes con `pnpm init` y lanzamos el comando `pnpm install express`. 

Al finalizar la instalación, deberíamos tener en el `package.json` del proyecto una nueva propiedad denominada `dependencies` y dentro de esta un objeto con el módulo express y la versión que hemos instalado en el proyecto.

```javascript
 "dependencies": {
    "express": "^5.2.1"
  }
```

---

## 2. Arrancar un servidor HTTP con express

Para arrancar un servidor HTTP simplemente tenemos que importar el módulo de express en nuestro archivo principal (ej. index.js) y ejecutarlo para inicializar nuestra aplicación. Luego simplemente llamando al método `.listen()`, el servidor se levanta en el puerto en el que le indiquemos.

```javascript
const express = require('express');

// Inicializamos la aplicación con express
const app = express();

const PORT = 4004;

app.listen(PORT, () => {
    console.log(`App running in http://localhost:${PORT}`);
});
```

---

## 3. Añadir rutas GET

Para definir rutas (endpoints) por los que el servidor va a escuchar peticiones, utilizamos métodos que coinciden con los verbos HTTP (get, post, put, delete).

Para peticiones de lectura usamos `.get()`. Su sintaxis requiere de:

*  **Un primer parámetro**: Un string indicando la ruta (URL) a la que accederemos por ejemplo la raiz ('/') o cualquier otra como ('/usuarios'). 
*  **Un segundo parámetro**: Una función callback (controlador) con la petición (req) y la respuesta (res) como parámetros. Dentro de esta función va toda la lógica y la funcionalidad que le queramos añadir a la ruta.

Por ejemplo:
```javascript
app.get('/', (request, response) => {
    response.send('Hola desde el servidor');
});
app.get('/api/usuarios', (req, res) => {
    // res.json() es ideal para devolver datos estructurados (objetos o arrays)
    res.json([{ id: 1, nombre: "Ana" }, { id: 2, nombre: "Luis" }]);
});
```

---

## 4. Añadir parámetros a las rutas y acceder a ellos (ruteo paramétrico)

Podemos crear rutas dinámicas que acepten variables en la propia URL. Esto es muy útil para buscar recursos específicos, como un usuario por su ID.

Para definir un parámetro en la ruta, se utiliza el símbolo de dos puntos (:) seguido del nombre del parámetro. Express capturará ese valor y lo guardará en el objeto req.params.

Ejemplo de ruta con parámetros:
```javascript
// Si el cliente hace una petición a GET /usuarios/45
app.get('/usuarios/:id', (req, res) => {
    // Accedemos al valor mediante req.params.id
    const idUsuario = req.params.id; 
    
    res.send(`Estás buscando el perfil del usuario con ID: ${idUsuario}`);
});
```

También existen los **Query Parameters** (parámetros de consulta), que van al final de la URL tras un signo de interrogación ? (ej. `/buscar?q=express`). Estos no se definen en la ruta con :, sino que se leen directamente con req.query.q.

---

## 5. Definición y usos del concepto Middleware

Un **Middleware** es una función que se ejecuta durante el ciclo request/response de la aplicación. Tienen acceso al objeto de petición (`req`), al objeto de respuesta (`res`) y a la siguiente función de middleware en el ciclo, que normalmente se denota con una variable llamada `next`.

Se enfocan bastante a la seguridad, lo cual es correcto, pero su uso es mucho más amplio. Un middleware puede:

*  **Ejecutar cualquier código.**

*  **Realizar cambios en la petición y los objetos de respuesta** (ej. añadir un token desencriptado al `req`).

*  **Finalizar el ciclo de petición/respuesta** (ej. si un usuario no está autorizado, se corta la petición y se devuelve un error 401).

*  **Llamar al siguiente middleware** usando la función `next()`. Si el middleware actual no termina el ciclo de petición/respuesta, debe llamar obligatoriamente a `next()`; de lo contrario, la petición se quedará colgada indefinidamente en el navegador del cliente.

Usos comunes: Logs de peticiones, parsear el body de peticiones (como `express.json()`), autenticación de usuarios, o configuraciones de seguridad (como Helmet).

---

## 6. Creación de un Middleware

Para que la aplicación de Express use un middleware de forma global (para todas las rutas), utilizamos el método `app.use()`.

Un ejemplo clásico: un middleware que registra (loguea) en la consola qué método y qué ruta está pidiendo el cliente cada vez que entra una petición al servidor.

```javascript
// Definición del Middleware
const loggerMiddleware = (req, res, next) => {
    console.log(`Petición entrante: ${req.method} a la ruta ${req.url}`);
    
    // ¡IMPORTANTE! Siempre hay que llamar a next() para que el flujo continúe
    // hacia las rutas de abajo. Si no lo ponemos, el servidor se queda cargando.
    next(); 
};

// Aplicamos el middleware a nivel global
app.use(loggerMiddleware);

// A partir de aquí definimos las rutas, a las que solo se llegará si el middleware hace next()
app.get('/', (req, res) => {
    res.send('Página principal');
});
```

También se pueden aplicar middlewares solo a rutas específicas pasándolos como un parámetro intermedio: `app.get('/privado', authMiddleware, (req, res) => { ... })`.

---

## 7. Helmet

Helmet es un middleware muy popular y un set de directivas de seguridad para aplicaciones Node.js. Lo que hace en la práctica es modificar, configurar y ocultar diversas cabeceras (headers) HTTP que Express envía por defecto y que podrían revelar información sensible o hacer tu app vulnerable a ataques comunes (como XSS o clickjacking).

Para usarlo:

1. Se instala: `pnpm install helmet`

2. Se importa y se usa como cualquier middleware global al principio de tu archivo:

```javascript
const helmet = require('helmet');
const express = require('express');

const app = express();

// Usar Helmet para proteger la aplicación modificando las cabeceras HTTP
app.use(helmet());
```
