window.addEventListener("DOMContentLoaded", () => {

    // Ejercicio 1:
    // 1. Elimina el punto "ZAZ" y incluye en su posición el punto "PMP".
    // 2. Extrae el último punto y guárdalo en una variable.
    // 3. Transforma el array en una cadena de texto con "->" como separador.

    let ruta = ["LEMD", "CJN", "ZAZ", "VLC", "LEBL"];

    let posicion = ruta.indexOf("ZAZ")
    ruta.splice(posicion,1,"PMP")
    let ultimoPunto = ruta.at(-1)
    let rutaString = ruta.join("->")
    console.log(rutaString)
    console.log(`El último punto de la ruta es ${ultimoPunto}`)


    // Ejercicio 2:
    // 1. Comprueba de forma segura si la variable 'escaneo' es realmente un Array.
    // 2. Comprobar si TODOS los puertos son seguros.
    // 3. Comprobar si hay AL MENOS un puerto 21 abierto.

    let escaneo = [
        { puerto: 21, servicio: "FTP", seguro: false },
        { puerto: 22, servicio: "SSH", seguro: true },
        { puerto: 80, servicio: "HTTP", seguro: false },
        { puerto: 443, servicio: "HTTPS", seguro: true }
    ];

    let esArray = Array.isArray(escaneo)
    console.log(`La variable escaneo ${esArray ? "si" : "no" } es un array`)
    let seguros = escaneo.every(puerto => puerto.seguro === true)
    console.log(`${seguros ? "Todos" : "No todos"} los puertos son seguros`)
    let puerto = escaneo.some(puerto => puerto.puerto === 21)
    console.log(`El puerto 21 ${puerto ? "si" : "no"} está abierto`)

    // Ejercicio 3:
    // 1. Une ambas listas.
    // 2. Crea una lista final de la compra sin duplicados en una sola línea de código.

    let listaNevera = ["Guanciale", "Pecorino", "Huevos"];
    let listaCompra = ["Pimienta negra", "Guanciale", "Pasta", "Huevos"];

    let listaCompleta = [...listaNevera, ...listaCompra]
    let listaCorrecta = [...new Set(listaCompleta)]
    console.log(listaCorrecta)

    // Ejercicio 4:
    // 1. Filtra el array para quedarte solo con los del grupo "Espalda".
    // 2. Crear un array de strings con este formato exacto: "Dominadas: 8 repeticiones"
    
    let sesion = [
        { ejercicio: "Press banca", grupo: "Pecho", peso: 65, reps: 10 },
        { ejercicio: "Dominadas", grupo: "Espalda", peso: 0, reps: 8 },
        { ejercicio: "Remo en punta", grupo: "Espalda", peso: 45, reps: 10 },
        { ejercicio: "Curl bíceps", grupo: "Brazos", peso: 14, reps: 12 }
    ];

    let grupoEspalda = sesion.filter(ejercicio => ejercicio.grupo === "Espalda")
    console.log(grupoEspalda)
    let texto = grupoEspalda.map(ejercicio => `${ejercicio.ejercicio}: ${ejercicio.reps} repeticiones`)
    console.log(texto)

    // Ejercicio 5 (Todo encadenado de golpe):
    // 1. Filtra solo la carga legal.
    // 2. Mapea esos objetos para descontarles un 5% a su valorTotal (multiplica por 0.95).
    // 3. Reduce el array resultante para sumar el beneficio total limpio de impuestos.

    let carga = [
        { mineral: "Painita", valorTotal: 500000, legal: true },
        { mineral: "Artefactos Thargoides", valorTotal: 850000, legal: false },
        { mineral: "Platino", valorTotal: 300000, legal: true },
        { mineral: "Tritio", valorTotal: 100000, legal: true }
    ];

    let valorFinal = carga
        .filter(mineral => mineral.legal === true)
        .map(material => material.valorTotal * 0.95)
        .reduce((acumulador, precioActual) => {
            return acumulador + precioActual
        }, 0)

    console.log(`El valor total de la carga vendida es ${valorFinal}`)

    // Ejercicio 6:
    // Usa un único reduce para agrupar los nombres en arrays dentro de su respectivo clan.
    // El console.log final debe devolver exactamente esto:
    // {
    //    Uzumaki: ["Naruto", "Kushina"],
    //    Uchiha: ["Sasuke", "Itachi"],
    //    Hatake: ["Kakashi"]
    // }

    let shinobis = [
        { nombre: "Naruto", clan: "Uzumaki" },
        { nombre: "Sasuke", clan: "Uchiha" },
        { nombre: "Kushina", clan: "Uzumaki" },
        { nombre: "Itachi", clan: "Uchiha" },
        { nombre: "Kakashi", clan: "Hatake" }
    ];

    let shinobisObjeto = shinobis
        .reduce((acumulador, objetoActual) => {
            if(!acumulador[objetoActual.clan]){
                acumulador[objetoActual.clan] = []
            }
            acumulador[objetoActual.clan].push(objetoActual.nombre)
            return acumulador
        },{})

    console.log(shinobisObjeto)
})