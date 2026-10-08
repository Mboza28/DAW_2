const express = require('express');
const helmet = require('helmet');
const series = require('./routes/series');

// Inicializamos la aplicación con express
const app = express();

let PORT = 4004;

// Creamos una constante para poder trabajar con la carpeta publica donde tendremos alojados los HTML
const PUBLICA = 'publica';

// Lanzamos el servidor al puerto
app.listen(PORT, () => {
    console.log(`App running in ${PORT}`);
});

// Creación de un Middleware, necesitamos pasarle 3 parámetros, la request, la response y next que es un metodo que especifica que es un middleware y hace que
// pase al siguiente ciclo request / response y permite que la funcion ocurra cada vez que hacemos una petición.
// ATENCIÓN EL ORDEN IMPORTA, LOS MIDDLEWARE DEBEN IR ANTES! DEL RUTEO
const myLogger =  (req, res, next) => {
    console.log(`Logger: ${req.method} ${req.originalUrl}`);
    next();
}

// Por ejemplo los middlewares son útiles para utilizar sets de directivas de seguridad como helmet, encargado de proteger las cabeceras de las peticiones request.
// Simplemente usandolo nos sirve porque ya es código en sí. IMPORTANTE HAY QUE USAR LOS PARÉNTESIS PARA QUE SE EJECUTE PUESTO QUE SOLO LO HEMOS IMPORTADO.
app.use(helmet());

// Y con esta instrucción le ponemos los middleware a nuestro código actual que va encapsulado en app en este caso, nuestro objeto que incluye express.
app.use(myLogger);

/** RUTEO */

// Para servir archivos HTML estáticos como un index.html primero debemos hacer app.use(express.static)
// y utilizar como argumento la variable donde hayamos guardado todo nuestro contenido estático.
app.use(express.static(PUBLICA))

// Usamos la funcionalidad de consumo de API que hemos creado en series.js
app.use("/series", series);


// Con .get podemos escuchar las rutas y realizar la funcion correspondiente
app.get('/', (request, response) => {
    response.send('Hola desde el servidor');
});

app.get('/pepito', (request, response) => {
    response.send('Has pedido algo a pepito');
});


// Con los dos puntos (:) podemos marcar parámetros dinamicos.
app.get('/users/:userID', (request, response) => {
    const id = request.params.userID
    response.send(`Hola usuario con ID: ${id}`);
});

// Podemos concatenar ruteo paramétrico de esta forma y podemos acceder a esos parámetros mediante req.params ademas si usamos JSON.strongify pasamos esos
// parámetros a un objeto JSON que nos permitirá utilizarlos para filtrar, buscar en base de datos o lo que necesitemos
app.get('/users/:userID/books/:bookID', (req, res) => {
    res.send(`Mostrando parámetros .. ${JSON.stringify(req.params)}`);
});


/**
   Así es como quedaria este codigo refactorizado profesionalmente, está en los apuntes también
   
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
*/