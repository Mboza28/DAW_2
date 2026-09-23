const http = require('http')

// Utilizamos .createServer para crear el servidor, el cual necesita el request y el response por parametros
// Al request y al response podemos acceder a sus metodos propios
let miServer = http.createServer((req,res) => {
    console.log(req.method, req.url)
    res.writeHead(200, {"Content-type":"text/html"})
    res.write("<strong>Hola desde el servidor</strong>")
    res.end()
});

// Para levantar el servidor simplemente ponemos el puerto en el que queremos que escuche
miServer.listen(8080)
console.log("Servidor corriendo en puerto 8080")