# Autenticación en APIs con JWT y Cookies

La autenticación mediante JSON Web Tokens (JWT) almacenados en cookies es una de las estrategias más seguras y utilizadas en el desarrollo web moderno. Permite mantener la sesión del usuario sin que el servidor tenga que guardar el estado (stateless) y protege contra ciertos ataques si se configuran bien las cabeceras.

## 1. Dependencias e Importaciones necesarias

Para implementar este sistema, necesitamos instalar dos paquetes fundamentales además de Express:
*   `jsonwebtoken`: Para crear (firmar) y verificar los tokens.
*   `cookie-parser`: Un middleware que permite a Express leer las cookies que el navegador envía en cada petición y convertirlas en un objeto manejable en `req.cookies`.

```bash
pnpm install jsonwebtoken cookie-parser
```

En nuestro archivo principal (`index.js` o `app.js`), debemos importarlos y usar el middleware de las cookies globalmente antes de nuestras rutas:

```javascript
import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware nativo para leer JSON del body
app.use(express.json());

// Middleware para poder leer req.cookies
app.use(cookieParser());

// Clave secreta (en producción debe ir en variables de entorno .env)
const SECRET_KEY = 'mi_clave_super_secreta';
```

## 2. Creación del Token y Manejo de la Cookie (Ruta de Login)

Cuando un usuario se loguea correctamente (tras comprobar que su email y contraseña coinciden en la base de datos), el servidor debe generar un "carnet de identidad" (el JWT) y enviárselo al cliente dentro de una cookie.

```javascript
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // 1. Verificación ficticia contra base de datos
    if (username !== 'admin' || password !== '1234') {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 2. Creación del Payload (los datos que viajan dentro del token)
    const payload = {
        id: 1,
        username: 'admin',
        role: 'administrador'
    };

    // 3. Firma del Token
    const token = jwt.sign(payload, SECRET_KEY, { 
        expiresIn: '1h' // El token caducará en 1 hora
    });

    // 4. Configuración y envío de la Cookie
    res.cookie('access_token', token, {
        httpOnly: true,  // CRÍTICO: Evita que JavaScript en el frontend (XSS) pueda leer la cookie
        secure: process.env.NODE_ENV === 'production', // Solo viaja por HTTPS en producción
        sameSite: 'strict', // Protege contra ataques CSRF
        maxAge: 1000 * 60 * 60 // 1 hora en milisegundos (debe coincidir con el token)
    });

    res.json({ mensaje: 'Login exitoso' });
});
```

## 3. Middleware de Autenticación (Proteger Rutas)

Para las rutas que requieren que el usuario esté logueado (como ver el perfil), creamos un middleware que intercepta la petición, lee la cookie, extrae el JWT y comprueba si es válido y no ha caducado.

```javascript
const verificarAutenticacion = (req, res, next) => {
    // 1. Leer el token de la cookie (gracias a cookie-parser)
    const token = req.cookies.access_token;

    // 2. Si no hay token, el usuario no está logueado
    if (!token) {
        return res.status(403).json({ error: 'Acceso denegado. Se requiere token.' });
    }

    try {
        // 3. Verificar si el token es válido y fue firmado con nuestra clave
        const datosDecodificados = jwt.verify(token, SECRET_KEY);
        
        // 4. Inyectamos los datos del usuario en la request para que la ruta los pueda usar
        req.usuario = datosDecodificados;
        
        next(); // Todo correcto, dejamos pasar a la ruta
    } catch (error) {
        // Si entra aquí, el token fue manipulado o ha caducado
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};
```

## 4. Aplicar el Middleware y Cerrar Sesión (Logout)

Una vez tenemos el middleware, se lo inyectamos a cualquier ruta que queramos proteger. Para el cierre de sesión, simplemente le decimos al navegador que borre la cookie.

```javascript
// Ruta Protegida: Solo llega aquí si el middleware hace next()
app.get('/api/perfil', verificarAutenticacion, (req, res) => {
    // Podemos acceder a req.usuario gracias al middleware
    res.json({ 
        mensaje: `Bienvenido a tu perfil, ${req.usuario.username}`,
        datos: req.usuario
    });
});

// Ruta de Logout
app.post('/api/logout', (req, res) => {
    // Para borrar una cookie, usamos res.clearCookie con el mismo nombre
    res.clearCookie('access_token');
    res.json({ mensaje: 'Sesión cerrada correctamente' });
});
```

## 5. Alternativas a este modelo

Aunque combinar JWT con cookies `httpOnly` es el estándar de oro para aplicaciones web tradicionales (Frontend y Backend en el mismo dominio), existen otras alternativas según la arquitectura del proyecto:

1.  **JWT en localStorage o sessionStorage (Cabeceras Authorization):**
    *   **Cómo funciona:** El backend devuelve el token en el JSON de respuesta. El frontend (React, Angular) lo guarda en el `localStorage`. En cada petición posterior, el frontend debe inyectar manualmente el token en la cabecera HTTP `Authorization: Bearer <token>`.
    *   **Cuándo se usa:** Es obligatorio cuando el frontend es una aplicación móvil (Android/iOS) o cuando tu API está en un dominio distinto al frontend (CORS complejo), ya que las cookies no viajan bien entre dominios diferentes.
    *   **Desventaja:** Al guardarse en el `localStorage`, el token es vulnerable a ataques XSS (cualquier script malicioso en la web puede robarlo).

2.  **Sesiones en el Servidor (Express-Session):**
    *   **Cómo funciona:** En lugar de JWT, el servidor crea un espacio en su memoria (o en una base de datos) para cada usuario logueado (una "sesión"). Devuelve al cliente una cookie con un "ID de sesión" opaco. El servidor comprueba ese ID en su memoria con cada petición.
    *   **Ventaja:** Permite invalidar sesiones instantáneamente desde el servidor (ej. un botón de "Cerrar sesión en todos los dispositivos").
    *   **Desventaja:** Consume memoria/recursos en el servidor (Stateful) y es más difícil de escalar si tienes múltiples servidores balanceando carga.