const express = require('express');
const router_public = require('./router/public_routes');
const router_user = require('./router/users_routes');
const router_admin = require('./router/admin_routes');

const PORT = 4004;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use('/inicio', router_public);
app.use('/usuario', router_user);
app.use('/admin', router_admin);

app.get('/', (req, res) => {
    res.send('Bienvenido a la aplicacion de autenticacion');
})

app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
});

