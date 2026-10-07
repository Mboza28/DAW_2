const geoLib = require('geo-lib');

// Podemos calcular la distancia entre dos puntos.
let resultado = geoLib.distance({
    p1: { lat: 70.3369224, lon: 30.3411273 },
    p2: { lat: 59.8939528, lon: 10.6450348 }
});


// Aparte podemos calcular la velocidad que se debe emplear para ir del punto (p1) al punto (p2) en el tiempo indicado.
let resultadoVelocidad = geoLib.distance({
    p1: { lat: 70.3369224, lon: 30.3411273 },
    p2: { lat: 59.8939528, lon: 10.6450348 },
    timeUsed: 18640
});

console.log(resultado);
console.log(resultadoVelocidad);

console.log(`Para ir del punto 1 al 2 en ${Math.floor(resultadoVelocidad.timeUsedInSeconds / 60)} minutos debemos ir a ${Math.floor(resultadoVelocidad.speedKph)} km/h`);
