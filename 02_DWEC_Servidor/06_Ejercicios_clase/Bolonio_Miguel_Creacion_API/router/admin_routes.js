/** Rutas que requieren de autenticación y autorización (token válido y rol admin en token) */

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
        res.status(403).json({error: 'Token inválido o expirado.'});
    }
    
    next();
}

const verificarRol = (req, res, next) => {
    console.log("Datos del token decodificado:", req.usuario);
    if(req.usuario.rol != 'admin'){
        return res.status(403).json({error: 'Acceso no permitido. Solo administradores.'})
    }
    next();
}

router.get('/panelControl', verificarUsuario, verificarRol, (req, res) => {
    res.status(200).json(({mensaje: `Bienvenido al panel de administrador ${req.usuario.correo}`}))
})

module.exports = router;