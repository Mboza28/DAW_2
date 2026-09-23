
// fs es un modulo nativo de javascript por ello no hay que instalarlo como un paquete aparte
const fs = require('fs');

// Con .writeFile podemos escribir en un archivo, hay que pasarle 3 argumentos
// El 1º es el nombre del fichero o ruta hacia el mismo si está fuera de la carpeta
// El 2º es el contenido que queremos escribir
// El 3º es una funcion que maneje un posible error, con argumento del error
fs.writeFile("ficheroPrueba.txt", "Hola que tal", (err) => {
    if(!err){
        console.log("Fichero guardado");
    }
});

// Curiosidad, en el console.log podemos concatenar datos con comas ("El contenido del fichero es", datos)
fs.readFile("ficheroPrueba.txt","utf-8", (err, datos) => {
    if(!err){
        console.log(`El contenido del fichero es ${datos}`) 
    }
});



