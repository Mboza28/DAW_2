/** Rutas publicas que no necesitan seguridad */

const express = require('express');
const bcrypt = require('bcrypt');
const datos = require('../bbdd/users')

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/login', (req, res) => {
    
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