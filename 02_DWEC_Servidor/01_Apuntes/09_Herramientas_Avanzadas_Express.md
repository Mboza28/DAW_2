# Buenas Prácticas y Herramientas Avanzadas en Express

A medida que una API crece, tener todo el código en el `index.js` se vuelve insostenible. Además, en entornos de producción hay que tener en cuenta factores como la seguridad, el rendimiento y la organización.

## 1. Modularidad con Express Router

`express.Router()` es una clase que nos permite crear manejadores de rutas modulares y montables. Actúa como una "mini-aplicación" de Express.

**Ejemplo de uso:**
Creamos un archivo `routes/usuarios.js`:

```javascript
// routes/usuarios.js
const express = require('express');
const router = express.Router();

// Nota: La ruta aquí es '/', pero luego indicaremos en el index.js que esto corresponde a '/api/usuarios'
router.get('/', (req, res) => {
    res.json({ mensaje: 'Lista de usuarios' });
});

router.post('/', (req, res) => {
    res.json({ mensaje: 'Usuario creado' });
});

module.exports = router;
```

Luego, en tu `index.js`, importas ese router y lo "montas" en un prefijo de URL:

```javascript
// index.js
const express = require('express');
const app = express();
const usuariosRoutes = require('./routes/usuarios');

app.use('/api/usuarios', usuariosRoutes); 
```
De esta forma, cualquier petición a `/api/usuarios` o `/api/usuarios/:id` será manejada por el archivo `usuarios.js`.

## 2. Variables de Entorno (dotenv)

**Nunca** se deben escribir contraseñas, claves secretas de JWT o URLs de bases de datos directamente en tu código, ya que si se sube a GitHub cualquiera podría verlos.

Para solucionarlo, se usa la librería `dotenv`:
1. Instalas la librería: `pnpm install dotenv`
2. Creas un archivo `.env` en la raíz de tu proyecto:
   ```env
   PORT=3000
   SECRET_KEY=mi_clave_secreta_jwt
   DB_URL=mysql://usuario:password@localhost/midatabase
   ```
3. Al principio de tu `index.js` añades: `require('dotenv').config();`
4. Accedes a las variables usando `process.env.NOMBRE_VARIABLE` (ej. `process.env.PORT`).

## 3. Manejo Global de Errores

En lugar de poner bloques `try/catch` gigantes en todas partes y enviar respuestas de error manualmente, Express permite crear un middleware de error global. 

Se diferencia de los middlewares normales porque **recibe 4 parámetros** (el primero es el error). Debe ir **al final de tu archivo**, justo antes del `app.listen()`.

```javascript
// Cualquier error lanzado en la app con next(error) caerá aquí
app.use((err, req, res, next) => {
    console.error(err.stack); // Mostramos el error en la consola del servidor
    
    // Enviamos una respuesta genérica al cliente
    res.status(500).json({
        error: 'Algo salió mal en el servidor',
        mensaje: err.message
    });
});
```

## 4. CORS (Cross-Origin Resource Sharing)

Por defecto, los navegadores bloquean las peticiones que se hacen mediante JavaScript (como `fetch`) desde un dominio hacia otro dominio distinto por motivos de seguridad. Si tu frontend (React/Angular) corre en el puerto 5173 y tu API en el 3000, el navegador bloqueará la conexión.

Para arreglarlo, usamos el middleware `cors`:
1. Instalación: `pnpm install cors`
2. Uso en el código:
```javascript
const cors = require('cors');

// Permite peticiones desde cualquier origen (útil en desarrollo)
app.use(cors());

// Configuración recomendada para producción (solo permite tu frontend):
app.use(cors({
    origin: '[http://midominio.com](http://midominio.com)',
    credentials: true // Obligatorio si usas cookies de sesión o JWT en cookies
}));
```

## 5. Librerías Imprescindibles para APIs Profesionales

Además de Express, Helmet, JWT y CORS, estas son las librerías que encontrarás en casi cualquier proyecto backend moderno:

*   **`bcrypt` (o `bcryptjs`):** Para encriptar (hashear) contraseñas antes de guardarlas en la base de datos. NUNCA se guardan contraseñas en texto plano.
*   **`zod` o `joi`:** Librerías de validación de esquemas. En lugar de hacer 20 `if` para comprobar si un email es válido, si la contraseña tiene 8 caracteres o si la edad es un número, defines un "esquema" y la librería valida el `req.body` automáticamente.
*   **`morgan`:** El logger estándar de la industria HTTP para Node.js. Sustituye al middleware "logger" manual que hicimos en clase, mostrando de forma muy limpia las peticiones, códigos de estado y tiempos de respuesta.
*   **`express-rate-limit`:** Limita cuántas peticiones puede hacer una misma IP en un periodo de tiempo. Vital para proteger tu API de ataques de fuerza bruta (ej. intentar adivinar una contraseña) o ataques de denegación de servicio (DDoS).