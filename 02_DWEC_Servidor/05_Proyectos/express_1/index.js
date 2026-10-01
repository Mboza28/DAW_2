const express = require('express');

// Inicializamos la aplicación con express
const app = express();

let PORT = 4004;

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
const helmet = require('helmet');
app.use(helmet());

// Y con esta instrucción le ponemos los middleware a nuestro código actual que va encapsulado en app en este caso, nuestro objeto que incluye express.
app.use(myLogger);

// Con .get podemos escuchar las rutas y realizar la funcion correspondiente
app.get('/', (request, response) => {
    response.send('Hola desde el servidor');
});

app.get('/pepito', (request, response) => {
    response.send('Has pedido algo a pepito');
});


// Con los dos puntos (:) podemos marcar parámetros dinamicos.
app.get('/users/:userID', (request, response) => {
    response.send('Hola usuario');
});

// Podemos concatenar ruteo paramétrico de esta forma y podemos acceder a esos parámetros mediante req.params ademas si usamos JSON.strongify pasamos esos
// parámetros a un objeto JSON que nos permitirá utilizarlos para filtrar, buscar en base de datos o lo que necesitemos
app.get('/users/:userID/books/:bookID', (req, res) => {
    res.send(`Mostrando parámetros .. ${JSON.stringify(req.params)}`);
});

