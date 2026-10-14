/** Rutas que necesitan autenticación token valido */

const express = require('express');
const jwt = require('jsonwebtoken');
const cookie_parser = require('cookie-parser');


const router = express.Router();
router.use(express.json());
router.use(cookie_parser());

const jwt_secreta = 'claveDeCifrado';

const verificarUsuario = (req, res, next) => {
    
    const token = req.cookies.token;
    
    if(!token){
        res.status(401).json({error: 'Acceso denegado. No se ha encontrado el token de autenticación'});
    }

    try {
        const datosToken = jwt.verify(token, jwt_secreta);
        req.usuario = datosToken;
        next();
    } catch(err) {
        res.status(401).json({error: 'Token inválido o expirado.'});
    }

    next();
}

router.get('/perfil', verificarUsuario, (req, res) => {
    res.json({
        mensaje: `Bienvenidoa tu perfil, ${req.usuario.correo}`,
        datos: req.usuario
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token').json({mensaje: "Sesión cerrada correctamente"});
})

module.exports = router;