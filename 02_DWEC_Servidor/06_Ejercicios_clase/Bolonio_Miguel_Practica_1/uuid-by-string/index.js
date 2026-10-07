const getUuid = require('uuid-by-string');

let usuario = 'Miguel Bolonio';
const idUsuario = getUuid(usuario);
console.log(`El UUID generado para el usuario '${usuario}' es: ${idUsuario}`);

// Asi podemos forzar la versión 5 del UUID
const idUsuarioV5 = getUuid(usuario, 5);
console.log(`El UUID en su versión 5 para el mismo usuario es: ${idUsuarioV5}`);