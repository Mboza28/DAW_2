window.addEventListener("DOMContentLoaded", () => {

    // Ejercicio 1 

    let personajes = [
        {
            nombre:"Miguel",
            vidaTotal: 100,
            vidaRestante: 50
        },
        {
            nombre: undefined,
            vidaTotal: undefined,
            vidaRestante: 10
        },
        {
            nombre: "Lu",
            vidaTotal: undefined,
            vidaRestante: 75
        },
        {
            nombre: "Fran",
            vidaTotal: 100,
            vidaRestante: 0
        }
    ]
    
    const evaluarVitalidad = (nombre = "Tripulante anónimo", vidaTotal = 100, vidaRestante) => {
        if(vidaRestante === 0){
            return `[ALERTA] ${nombre} ha caído en combate`
        }

        let porcentajeVida = (vidaRestante * 100) / vidaTotal

        if(porcentajeVida < 30){
            return `[PRECAUCIÓN] ${nombre} está herido crítico. Vitalidad al ${porcentajeVida}%`
        }else{
            return `[OK] ${nombre} está listo para el combate. Vitalidad al ${porcentajeVida}%`
        }
    }


    personajes.forEach(personaje => {
         console.log(evaluarVitalidad(personaje.nombre, personaje.vidaTotal, personaje.vidaRestante))
    })


    console.log(evaluarVitalidad(personajes[0].nombre, personajes[0].vidaTotal, personajes[0].vidaRestante))
    console.log(evaluarVitalidad(personajes[1].nombre, personajes[1].vidaTotal, personajes[1].vidaRestante))
    console.log(evaluarVitalidad(personajes[2].nombre, personajes[2].vidaTotal, personajes[2].vidaRestante))
    console.log(evaluarVitalidad(personajes[3].nombre, personajes[3].vidaTotal, personajes[3].vidaRestante))






    // Ejercicio 2

    const calcularRecompensa = (dificultad, tipoPago) => {
        if(tipoPago === "Oro"){
            return dificultad * 500
        }
        if(tipoPago === "Diamantes"){
            return dificultad * 200
        }
    }

    console.log(calcularRecompensa(4,"Oro"))
    console.log(calcularRecompensa(8,"Diamantes"))


    // Ejercicio 3


    const calculoDanio = (danioBase, infectado) => {
        if(infectado){
            return (danioBase * 2) + 15
        } else {
            return (danioBase * 3) + 15
        }
    }

    const analizarDroide = (nombre, danioBase) => {
        const infectado = nombre => nombre.startsWith("HK") || nombre.startsWith("B2")
        let danioTotal
        setTimeout(() => {
            if(infectado(nombre)){
                danioTotal = calculoDanio(danioBase, infectado(nombre)) 
                console.log(`El droide ${nombre} está infectado y tiene ${danioTotal}`)
            
            }else{
                danioTotal = calculoDanio(danioBase, infectado(nombre))
                console.log(`El droide ${nombre} NO está infectado y tiene ${danioTotal}`)
            }
        }, 7000)
    }

    analizarDroide("HK123O", 120)
    analizarDroide("B2123O", 180)
    analizarDroide("PLKJA", 120)

    // Ejercicio 4

    const inventario = [
        { nombre: "Espada de Plata", danioBase: 50, durabilidad: 80, raro: true },
        { nombre: "Hacha Rathalos", danioBase: 20, durabilidad: 15, raro: false },
        { nombre: "Arco de Qurupeco", danioBase: 35, durabilidad: 100, raro: true },
        { nombre: "Daga Felyne", danioBase: 10, durabilidad: 5, raro: false }
    ];

    let inventarioNuevo = inventario.map(elemento => {
        let estado
        let danioFinal
        if(elemento.raro === true){
            danioFinal = elemento.danioBase * 1.5
        }else{
            danioFinal = elemento.danioBase
        }
        if(elemento.durabilidad < 50){
            estado = "Roto"
        } else {
            estado = "Operativo"
        }
        return {
            nombre: elemento.nombre,
            danioFinal: danioFinal,
            estado: estado
        }
    })
    console.log(inventarioNuevo)

    let danioTotal
    danioTotal = inventarioNuevo
        .filter(arma => arma.estado === "Operativo")
        .reduce((acumulador, elementoActual) => {
            return acumulador + elementoActual.danioFinal
        }, 0)


    console.log(`El daño total de las armas operativas es de ${danioTotal}`)

    if(danioTotal > 150){
        console.log(`El equipo suma ${danioTotal} de daño total y está listo para matar al Rathian`)
    }else{
        console.log(`El equipo sólo suma ${danioTotal} de daño total. No es suficiente para enfrentarse al Rathian`)
    }
    
})