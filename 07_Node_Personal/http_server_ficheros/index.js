const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req,res) => {

    // Definir la ruta base de la carpeta public
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    
    // Obtener la extensión del archivo
    let extension = path.extname(filePath);
    let contentType = 'text/html';

    switch(extension){
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    fs.

});