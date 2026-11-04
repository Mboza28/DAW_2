const express = require('express');
const exphbs = require ('express-handlebars');

// Creamos el servidor de aplicaciones
const app = express();

// Cache
// app.enable('view cache');

// Configuración de Handlebars
// Informamos Express que vamos a utilizar handlebars de motor de templating
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Configuramos el ruteo
// En este caso nos centramos en el raiz
app.get('/home', (req, res) => {
    // res.render => Le decimos a Express que no devuelva texto sino que llame a su motor de vistas y en este caso a la vista llamada home
    res.render('home');
})

app.get('/clientes', (req, res) => {
    res.render('clientes')
})

const miSitio = require('./routes/misitio.js');
app.use('/', miSitio);
app.use(express.static('./public'));

app.listen(3000);
