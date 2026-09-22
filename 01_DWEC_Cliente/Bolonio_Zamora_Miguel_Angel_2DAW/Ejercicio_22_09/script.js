window.addEventListener("DOMContentLoaded", () => {

    // 1. Crear una funcion para evaluar la vitalidad de los tripulantes llamada evaluarVitalidad
    // Recibe nombre, vida total y vida restante. Calcular el % de salud del tripulante

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


    // Ejercicio 3

    const esMalicioso = nombre => nombre.startsWith("HK") || nombre.startsWith("B2")

    let nombre1 = "HKP34R"
    let nombre2 = "B2LASD"
    let nombre3 = "CKALSK"
    const calculoCritico = (dañoBase, malicioso) => {
        if(malicioso){
            return (dañoBase * 2) + 15
        }else{
            return (dañoBase * 3) + 15
        }
    }

    if(esMalicioso(nombre)){
        setTimeout(() => {
            console.log(`El droide está infectado`)
            let dañoTotal = calculoCritico(100)
            console.log(`El droide ${nombre} tiene un daño total de ${dañoTotal}`)
        }, 2000)
    }

    
    esMalicioso(nombre1)
    esMalicioso(nombre2)
    esMalicioso(nombre3)

})