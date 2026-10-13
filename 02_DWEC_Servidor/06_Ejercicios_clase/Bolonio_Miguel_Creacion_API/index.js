const express = require('express');
const datos = require('./bbdd/users');
const router = require('./router/public_routes')

const PORT = 4004;

const app = express();

express.urlencoded({ extended: true });
app.use(express.json());
app.use(express.static('public'));
app.use('/inicio', router);

app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
});

