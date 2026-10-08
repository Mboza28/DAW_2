const express = require('express');
const request = require('request');

const app = express();

// Con las funcionalidades de express.Router() podemos hacer ruteo más facilmente
const router = express.Router();

const URL = 'https://api.tvmaze.com/search/shows?q=';

router.get('/:serie', (req, res) => {
    
    // Obtengo el parámetro pasado por la url al hacer la petición para usarla
    const serie = req.params.serie;

    // Con request hacemos una peticion a una API (URL, (err, res, data) => {})
    // esta funcion es ! ASINCRONA !
    request(`${URL}${serie}`, (error, response, data) => {
        // Responder con la data si NO ha habido un error y el codigo http es OK
        // se puede hacer res.status(200).send..... dentro del if(!err) para comprobar el status
        if(!error){
            res.status(200).send(JSON.parse(data));
            console.log(req.params);
        }
    });
});

module.exports = router;

// Así se ejecutan los metodos http con router:
// router.get('/', (req, res) => {
//     return res.send("Received a GET http method");
// });

// router.post('/', (req, res) => {
//     return res.send("Received a POST http method");
// });

// router.put('/', (req, res) => {
//     return res.send("Received a PUThttp method");
// });

// router.delete('/', (req, res) => {
//     return res.send("Received a DELETE http method");
// });

