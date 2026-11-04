/** Rutas publicas que no necesitan seguridad */

const express = require('express');
const bcrypt = require('bcrypt');
const datos = require('../bbdd/users');
const jwt = require('jsonwebtoken');

const router = express.Router();

const jwt_secreta = 'claveDeCifrado';

router.post('/login', async (req, res) =>{
    const datosForm = req.body;
    const usuarioExiste = datos.find(usuario => datosForm.correo === usuario.correo);
    
    if(!usuarioExiste){
        res.status(401).json({error: 'Usuario o contraseña incorrectos'});
    } else {
        const passOK = await bcrypt.compare(datosForm.pass, usuarioExiste.pass);
        if (passOK){

            const infoToken = {
                correo: usuarioExiste.correo, 
                rol: usuarioExiste.rol
            }

            // Creacion del token con jwt
            const token = jwt.sign(infoToken, jwt_secreta, {expiresIn: '1h'});

            //Adjuntar el token a una cookie y mandarla al navegador del cliente para poder utilizarlo
            res.cookie('token', token, { 
                httpOnly: true, 
                secure: false 
            })
            
            res.status(200).json({
                mensaje: "Autenticación exitosa",
                token_incluido_en_headers: true,
            });

        } else {
            res.status(401).json({error: 'Usuario o contraseña incorrectos'});
        }
    }    
});

router.post('/registro', async (req, res) => {
    const datosForm = req.body;
    console.log(req.body);
    if(datos.some(usuario => usuario.correo === datosForm.correo)){
        res.status(409).json({error: 'El correo ya existe'})
    } else {
        let password = await generarContra(datosForm.pass);
        let nuevoUsuario = {
            correo: datosForm.correo,
            pass: password,
            rol: 'usuario'
        }
        datos.push(nuevoUsuario);
        res.send('Usuario creado con éxito');
    }
});

async function generarContra(password) {
    const saltAleatoria = 10;
    const hash = await bcrypt.hash(password, saltAleatoria);

    return hash;
}

module.exports = router;