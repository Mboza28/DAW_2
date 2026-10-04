const http = require('http');

const PORT = 3000;

const server = http.createServer((request, response) => {

  const url = request.url;
  const method = request.method;

  if(url === '/' && method === 'GET'){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<h1>Bienvenido a la landing page de mi server</h1><p>Visita <a href="/api/datos">/api/datos</a></p>');
  }

  else if(url === '/api/datos' && method === 'GET'){
    response.writeHead(200, {'Content-Type': 'application/json'});
    const datosUsuario = {
      nombre: 'Miguel',
      perfil: 'Desarrollador Full Stack',
      entorno: 'Node.js'
    };
    response.end(JSON.stringify(datosUsuario));
  }

  else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Error 404: La pagina que buscas no existe');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto ${PORT}`);
})