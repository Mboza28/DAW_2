
const http = require('http');

let server = http.createServer((req,res) => {
    console.log(req.method, req.url)
    console.log(req.url)
    if(req.url == "/"){
        res.write("<p> Hola desde el endpoint landing</p>")
        res.end()
    } else if(req.url == "/api/pokemons"){
        fetch("https://pokeapi.co/api/v2/pokemon")
            .then(response => response.json())
            .then(data => console.log(data))
        res.end()
    } else {
        res.write("<strong>ERROR 404: Ruta no encontrada</strong>")
        res.end()
    }
});

server.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000")
})

