
// Hay dos formas distintas de gestionar paquetes con JS nativo o con node.

const prompt = require('prompt-sync')();     // Importantes los parentesis del final 
// Esta forma de require('modulo') es la forma node de importar un paquete entero. Pero tenemos que tratar el archivo
// de forma que lo reconozca como tal y no como CommonJS, esto se hace en el package.json eliminando el type: "module" 
// aunque hay otras formas

// Otra forma de importar partes de dependencias, solo las que vayamos a utilizar sería la siguiente con el import
// import prompt from 'prompt-sync';

let nombre = prompt("Como te llamas");
console.log(`Hola ${nombre}!`)

const sumando1 = prompt('Introduce el primer numero: ');
const sumando2 = prompt('Introduce el segundo numero: ');

// Al no ser tipado el lenguaje, puede ser que los numeros nos los tipe como String y al operar nos concatene,
// para eso hacemos un parseo a tipo number para confirmar 

let suma = parseInt(sumando1) + parseInt(sumando2);
console.log(`El resultado de la suma de ${sumando1} y ${sumando2} es ${suma}`);