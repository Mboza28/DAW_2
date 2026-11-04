/** Rutas que necesitan autenticación token valido */

const express = require('express');
const jwt = require('jsonwebtoken');
const cookie_parser = require('cookie-parser');
const axios = require('axios');

const router = express.Router();

router.use(cookie_parser());

const jwt_secreta = 'claveDeCifrado';

const verificarUsuario = (req, res, next) => {
    
    const token = req.cookies.token;
    
    if(!token){
        return res.status(401).json({error: 'Acceso denegado. No se ha encontrado el token de autenticación'});  // Uso el return para evitar que siga la ejecucion de la funcion
    }

    try {
        const datosToken = jwt.verify(token, jwt_secreta);
        req.usuario = datosToken;
        next(); // Solo ejecuto next y dejo paso a la ruta si la autenticacion es correcta
    } catch(err) {
        res.status(401).json({error: 'Token inválido o expirado.'});
    }

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

router.get('/githubUserInfo', verificarUsuario, async (req, res) => {
    try{
        const respuesta = await axios.get('https://api.github.com/users/MBoza28', {
            headers: { 'Authorization': `Bearer ${process.env.TOKEN_GITHUB}` }
        });

        console.log(respuesta.data);

        res.status(200).json(respuesta.data);
    }
    catch (error){
        console.log("Error consumiendo la la API de GitHub:", error.message);
        res.status(500).json({error: 'Fallo al conectar con el servidor de GitHub'})
    }
})

router.get('/githubUserRepos', verificarUsuario, async (req, res) => {
    try{
        const respuesta = await axios.get('https://api.github.com/users/MBoza28/repos', {
            headers: { 'Authorization': `Bearer ${process.env.TOKEN_GITHUB}` }
        });

        console.log(respuesta.data);

        res.status(200).json(respuesta.data);
    }
    catch (error){
        console.log("Error consumiendo la la API de GitHub:", error.message);
        res.status(500).json({error: 'Fallo al conectar con el servidor de GitHub'})
    }
})

module.exports = router;