/** Rutas publicas que no necesitan seguridad */

const express = require('express');
const bcrypt = require('bcrypt');
const datos = require('../bbdd/users')
const jwt = require('jsonwebtoken')

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/login', async (req, res) => {
    const datosForm = req.body;
    const usuarioExiste = datos.find(usuario => datosForm.correo === usuario.correo);
    
    if(!usuarioExiste){
        res.send(`Usuario o contraseña incorrectos`)
    } else {
        const passOK = await bcrypt.compare(datosForm.pass, usuarioExiste.pass);
        if (passOK){

            const infoToken = {
                correo: usuarioExiste.correo, 
                rol: usuarioExiste.rol
            }
            const token = jwt.sign(infoToken, 'claveDeCifrado', {expiresIn: '1h'})
            res.json({mensaje:`Login correcto`, token: token})

        } else {
            res.send(`Usuario o contraseña incorrectos`)
        }
    }    
})

router.post('/registro', async (req, res) => {
    const datosForm = req.body;
    console.log(req.body);
    if(datos.some(usuario => usuario.correo === datosForm.correo)){
        res.send(`Ya existe un usuario con ese correo. Prueba a iniciar sesion`);
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
})

async function generarContra(pass) {
    const saltAleatoria = 10;
    const hash = await bcrypt.hash(pass, saltAleatoria);

    console.log('registro');
    console.log(`Contraseña introducida: ${pass}`);
    console.log(`Hash generado: ${hash}`);

    return hash;
}

module.exports = router;