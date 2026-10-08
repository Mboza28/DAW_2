const express = require('express');
const datos = require('./datos');
const PORT = 4004;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json(datos);
});

app.get('/profesores', (req, res) => {
    console.log(req.params);
    res.json();
});

app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
});

