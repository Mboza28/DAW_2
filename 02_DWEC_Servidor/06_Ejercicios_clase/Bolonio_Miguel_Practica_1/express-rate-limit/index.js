import express from 'express';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = 4004;

//Configuro el funcionamiento del limitador de peticiones
const limitador = rateLimit({
    windowMs: 60000,   // Este es el tiempo
    max: 5,    // Estos son los intentos de acceso por IP
    message: "Superaste el limite de peticiones, espera un minuto",
    standardHeaders: true,  // Esto pone información del limite en las cabeceras.
    legacyHeaders: false    // En este caso deshabilito las cabeceras antiguas
});

app.use('/ruta/limitada', limitador);

app.get('/ruta/limitada', (req, res) => {
    res.send("Has accedido correctamente");
    console.log(`Peticion recibida desde la IP: ${req.ip}`)
});

app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
})