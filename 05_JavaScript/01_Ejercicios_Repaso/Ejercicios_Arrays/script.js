window.addEventListener("DOMContentLoaded", () => {

    /**
     * 1. Tienes un array de objetos que registra tu sesión de gimnasio, donde cada objeto tiene ejercicio, 
     * grupoMuscular, peso y repeticiones. Utiliza los métodos de array correspondientes para filtrar
     * solo los ejercicios de "pecho" y, a continuación, calcula el volumen total levantado 
     * (peso * repeticiones) sumando los resultados.
     */

    let entrenamiento = [
        { ejercicio: "Press banca maquina", grupoMuscular: "Pecho", peso: 65, repeticiones: 15 },
        { ejercicio: "Press banca inclinado", grupoMuscular: "Pecho", peso: 40, repeticiones: 8 },
        { ejercicio: "Press banca plano", grupoMuscular: "Pecho", peso: 30, repeticiones: 8 },
        { ejercicio: "Jalones al pecho", grupoMuscular: "Espalda", peso: 70, repeticiones: 12 },
        { ejercicio: "Remo gironda", grupoMuscular: "Espalda", peso: 50, repeticiones: 12 },
        { ejercicio: "Hip thrust", grupoMuscular: "Gluteo", peso: 30, repeticiones: 15 }
    ]

    let ejerciciosPecho = entrenamiento.filter(ejercicio => ejercicio.grupoMuscular.includes("Pecho"))
    let volumenLevantado = 0;
    ejerciciosPecho.forEach(ejercicio => {
        volumenLevantado += ejercicio.peso * ejercicio.repeticiones
    })

    console.log(ejerciciosPecho)
    console.log(`El volumen total levantado en ejercicios de pecho es de ${volumenLevantado}kg`)


    /**
     * 2. Recibes un array con los minerales extraídos en una expedición. Utiliza map para crear un nuevo array 
     * que contenga solo los ingresos por cada mineral, y encadena un reduce para obtener el valor total en 
     * créditos de toda la bodega de carga.
     */

    let bodegaMandalay = [
        { mineral: "Painita", toneladas: 12, precioPorTonelada: 45000 },
        { mineral: "Platino", toneladas: 35, precioPorTonelada: 30000 },
        { mineral: "Diamantes de Baja Temperatura", toneladas: 8, precioPorTonelada: 120000 },
        { mineral: "Tritio", toneladas: 50, precioPorTonelada: 4000 },
        { mineral: "Ópalos del Vacío", toneladas: 15, precioPorTonelada: 90000 }
    ];

    let totalIngresado = bodegaMandalay
        .map(mineral => mineral.precioPorTonelada * mineral.toneladas)
        .reduce((total, totalIngresado) => {
            return total + totalIngresado
        }, 0)

    console.log(`El total ingresado en la expedicion es de ${totalIngresado} CR`)

    /**
     * 3. Dado un array de personajes con nombre, clan y nivelChakra, utiliza el método sort con una función de 
     * comparación avanzada para ordenarlos con una doble condición: primero alfabéticamente por clan, y si 
     * dos personajes son del mismo clan, ordénalos de mayor a menor por su nivelChakra.
     */

    let ninjas = [
        { nombre: "Kakashi", clan: "Hatake", nivelChakra: 1500 },
        { nombre: "Naruto", clan: "Uzumaki", nivelChakra: 9000 },
        { nombre: "Kushina", clan: "Uzumaki", nivelChakra: 5000 },
        { nombre: "Sasuke", clan: "Uchiha", nivelChakra: 2500 },
        { nombre: "Itachi", clan: "Uchiha", nivelChakra: 3000 },
        { nombre: "Sakumo", clan: "Hatake", nivelChakra: 1800 }
    ];

    ninjas.sort((a,b) => {
        if (a.clan > b.clan){
            return 1
        }
        if(a.clan < b.clan){
            return -1
        }
        return b.nivelChakra - a.nivelChakra
    })
    console.log(ninjas)

    /**
     * 4. Tienes un string que representa una ruta comercial: "LEBL-VLC-ZAZ-LEMD". Utilizando los métodos de 
     * strings y arrays vistos, conviértelo en un array, elimina el punto "ZAZ" porque el espacio aéreo 
     * está cerrado (sin saber en qué posición exacta está), dale la vuelta a los puntos restantes para 
     * hacer el camino inverso, y devuélvelo convertido en un string unido por el separador " => ".
     */
    
    let ruta = "LEBL-VLC-ZAZ-LEMD"
    let arrayRuta = ruta.split("-")
    let posicionAEliminar = arrayRuta.indexOf("ZAZ")
    arrayRuta.splice(posicionAEliminar, 1)
    let rutaFinal = arrayRuta.reverse().join("=>")
    console.log(arrayRuta)
    console.log(rutaFinal)

    /**
     * 5. Tienes un array con el historial de reparaciones: ["Aceite", "Filtros", "Bomba de vacío", "Bujías"]. 
     * Encuentra dinámicamente el índice de "Bomba de vacío", elimínalo usando splice, y en esa misma 
     * posición inserta dos nuevos elementos: "Junta de bomba" y "Limpieza bloque motor".
     */

    let historial = ["Aceite", "Filtros", "Bomba de vacío", "Bujías"]
    let posicionBomba = historial.indexOf("Bomba de vacío")
    historial.splice(posicionBomba, 1, "Junta de bomba", "Limpieza bloque motor")
    console.log(historial)

    /**
     * 6. Vas a preparar una caldereta y juntas tu array de ingredientes con el array de ingredientes que ha 
     * traído un invitado. Une ambos arrays, pero crea una lógica (puedes usar filter e indexOf, o investigar
     * el objeto Set) para devolver un único array donde no haya ningún ingrediente repetido.
     */

    let misIngredientes = ["Carne de cordero", "Ajo", "Cebolla", "Pimiento rojo", "Vino blanco", "Pimentón"];
    let ingredientesInvitado = ["Ajo", "Patatas", "Zanahoria", "Vino blanco", "Tomate", "Pimentón"];

    let receta = misIngredientes.concat(ingredientesInvitado)
    console.log(receta)
    let recetaCorrecta = receta.filter((ingrediente, posicionActual) => receta.indexOf(ingrediente) === posicionActual)
    console.log(recetaCorrecta)

        //OTRA FORMA DE HACERLO CON EL OBJETO SET EL CUAL NO ADMITE DUPLICADOS
    let recetaMagica = [...new Set(receta)];
    console.log(recetaMagica);

    /**
     * 7. Cuentas con un array de equipamiento medieval (espadas, escudos, cotas de malla), cada uno con una 
     * propiedad durabilidad (de 0 a 100). Utiliza every para comprobar y devolver un booleano que indique
     * si todas las piezas están por encima de 50 de durabilidad, y usa some para comprobar si hay al 
     * menos una pieza completamente rota (durabilidad en 0).
     */

    let inventario = [
        { pieza: "Espada larga de San Jorge", durabilidad: 85 },
        { pieza: "Escudo húngaro", durabilidad: 60 },
        { pieza: "Cota de malla remachada", durabilidad: 0 },
        { pieza: "Yelmo de caballero", durabilidad: 45 }
    ];

    let usables = inventario.every(arma => arma.durabilidad >= 50)
    if(!usables){
        console.log("Necesitas reparar las armas, alguna está dañada")
    } else {
        console.log("Puedes entrar en batalla, armas en buen estado")
    }
    let rota = inventario.some(arma => arma.durabilidad === 0)
    if(rota){
        console.log("Tienes un arma rota, reparala cuanto antes")
    } else {
        console.log("Todas tus armas son utilizables")
    }


    /**
     * 8. Tienes un array de direcciones IP que han intentado acceder a un nivel de un servidor por SSH. 
     * La mayoría de IPs han hecho múltiples intentos y se repiten en el array. Utilizando indexOf y 
     * lastIndexOf, encuentra y extrae la única IP que solo ha intentado conectarse una vez (es decir, 
     * que no está repetida en toda la lista).
     */

    let accesosSSH = [
        "192.168.1.50",
        "10.0.0.12",
        "192.168.1.50",
        "172.16.254.1",
        "10.0.0.12",
        "192.168.1.50"
    ];

    let accesoUnico = accesosSSH.filter(acceso => accesosSSH.indexOf(acceso) === accesosSSH.lastIndexOf(acceso))
    console.log(`La única IP que ha hecho un único acceso ha sido ${accesoUnico.toString()}`)

    /**
     * 9. Partiendo de un array de objetos de tareas, utiliza el método reduce para transformar ese 
     * array en un único objeto donde las claves sean los nombres de las asignaturas, y los valores 
     * sean arrays con los títulos de las tareas correspondientes.
     */

    let tareas = [
        { titulo: "Ejercicios Arrays", asignatura: "Cliente" },
        { titulo: "API REST Spring Boot", asignatura: "Servidor" },
        { titulo: "Animación CSS 3D", asignatura: "Interfaces" },
        { titulo: "Promesas y Fetch", asignatura: "Cliente" },
        { titulo: "Consultas MySQL", asignatura: "Servidor" }
    ];

    let tareasObjeto = tareas
        .reduce((acumulador, tareaActual) => {
            if (!acumulador[tareaActual.asignatura]){
                acumulador[tareaActual.asignatura] = []
            }
            acumulador[tareaActual.asignatura].push(tareaActual.titulo)
            return acumulador
        }, {})

    console.log(tareasObjeto)

    /**
     *     Cliente: ["Ejercicios Arrays", "Promesas y fetch"]
     *     Servidor: ["API REST SpringBoot", "Consultas MySQL"]
     */

    /**
     * 10. Crea tu propia versión del método filter. Define una función llamada miFiltro que reciba dos
     * parámetros: un array y una función callback. La función debe recorrer el array con un bucle 
     * tradicional y devolver un array nuevo solo con los elementos que pasen la condición del callback,
     * sin utilizar el método .filter() nativo de JavaScript en ningún momento.
     */

    function miFiltro(array, callback){
        let arrayFinal = []
        array.forEach(elemento => {
            if(callback(elemento)){
                arrayFinal.push(elemento)
            }
        })
        return arrayFinal
    }

    let nivelesChakra = [9000, 3500, 1500, 2500, 6000, 1000]
    let nivelAlto = miFiltro(nivelesChakra, chakra => chakra >= 3000)
    console.log(nivelesChakra)
    console.log(nivelAlto)
})  