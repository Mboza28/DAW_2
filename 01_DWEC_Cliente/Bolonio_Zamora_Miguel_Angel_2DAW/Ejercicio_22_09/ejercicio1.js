window.addEventListener("DOMContentLoaded", () => {

  let personajes = [
      { nombre:"Miguel", vidaTotal: 100, vidaRestante: 50 },
      { nombre: undefined, vidaTotal: undefined, vidaRestante: 10 },
      { nombre: "Lu", vidaTotal: undefined, vidaRestante: 75 },
      { nombre: "Fran", vidaTotal: 100, vidaRestante: 0 }
    ]
  
  const evaluarVitalidad = (nombre = "Tripulante anónimo", vidaTotal = 100, vidaRestante) => {
    if(vidaRestante <= 0){
      return `[ALERTA] ${nombre} ha caído en combate`
    }

    let porcentajeVida = Math.round((vidaRestante * 100) / vidaTotal)

    if(porcentajeVida < 30){
      return `[PRECAUCIÓN] ${nombre} está herido crítico. Vitalidad al ${porcentajeVida}%`
    } else {
      return `[OK] ${nombre} está listo para el combate. Vitalidad al ${porcentajeVida}%`
    }
  }


  personajes.forEach(personaje => {
    console.log(evaluarVitalidad(personaje.nombre, personaje.vidaTotal, personaje.vidaRestante))
  })

  // Primera idea de como hacerlo antes de emplear el forEach
  // console.log(evaluarVitalidad(personajes[0].nombre, personajes[0].vidaTotal, personajes[0].vidaRestante))
  // console.log(evaluarVitalidad(personajes[1].nombre, personajes[1].vidaTotal, personajes[1].vidaRestante))
  // console.log(evaluarVitalidad(personajes[2].nombre, personajes[2].vidaTotal, personajes[2].vidaRestante))
  // console.log(evaluarVitalidad(personajes[3].nombre, personajes[3].vidaTotal, personajes[3].vidaRestante))

})