import bcrypt from 'bcrypt';

const contraseña = "ContraseñaPlana!";
const saltAleatoria = 10; 

// Se utiliza await para evitar que se pare la ejecución, porque hashear es una operacion que lleva un tiempo,
// esto hace 2 elevado al numero de la salt iteraciones hasta que genera el hash.
const hash = await bcrypt.hash(contraseña, saltAleatoria);

console.log('registro');
console.log(`Contraseña introducida: ${contraseña}`);
console.log(`Hash generado: ${hash}`);

// Simulo el inicio de sesion con una contraseña correcta y otra incorrecta.
const passCorrecta = "ContraseñaPlana!";
const passIncorrecta = "EstaNoCoincideConLaOriginal";

// Compara la contraseña introducida con el hash guardado
const prueba1 = await bcrypt.compare(passCorrecta, hash);
const prueba2 = await bcrypt.compare(passIncorrecta, hash);

console.log('login');
console.log(`Intento con la contraseña correcta: ${prueba1 ? 'Acceso permitido' : 'Contraseña incorrecta'}`);
console.log(`Intento con la contraseña mala: ${prueba2 ? 'Acceso permitido' : 'Contraseña incorrecta'}`);

