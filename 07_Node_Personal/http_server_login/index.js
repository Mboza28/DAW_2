// Aqui re-utilizo partes del primer ejercicio http_server_basico

const http = require('http');
const PORT = 3000;

// Inicializo una variable a la que pueda acceder en todo el proyecto, para guardar datos de un formulario
let usuarioGuardado = null;

const server = http.createServer((request, response) => {

  const url = request.url;
  const method = request.method;

  if(url === '/' && method === 'GET'){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(`
      <h1>Bienvenido a la landing page de mi server</h1>
      <p>Para hacer login visita <a href="/login">/login</a></p>
      <p>Si estas logueado visita <a href="/perfil">/perfil</a> para ver tu perfil</p>
    `);
  }

  else if(url === '/login' && method === 'GET'){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(`
      <form action="/login" method="POST">
      <input type="text" name="nombreUsuario" placeholder="Tu nombre">
      <button type="submit">Entrar</button>
      </form>
    `);
  }

  else if(url === '/login' && method === 'POST'){
    
    let datosRecibidos = '';

    request.on('data' , dato => {
      datosRecibidos += dato.toString();
    });

    request.on('end', () => {

      console.log(datosRecibidos);

      let usuario = new URLSearchParams(datosRecibidos).get('nombreUsuario');

      usuarioGuardado = {
        Usuario : usuario,
        Contraseña : 'No se sabe aun'
      };

      response.writeHead(302, {'Location': '/perfil'});
      response.end();
    });
    
    
  }  

  else if(url === '/perfil' && method === 'GET'){
    
    if(usuarioGuardado != null){
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify(usuarioGuardado));
    } else {
      response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      response.end(`
        <h1>Lo sentimos, no estás logueado aún</h1>
        <p>Para hacer login visita <a href="/login">/login</a></p>
      `);
    }
  }

  else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Error 404: La pagina que buscas no existe');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});