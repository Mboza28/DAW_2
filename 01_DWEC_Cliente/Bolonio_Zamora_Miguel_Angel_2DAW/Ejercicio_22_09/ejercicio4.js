window.addEventListener("DOMContentLoaded", () => {
  // Ejercicio 4

  const inventario = [
    { nombre: "Espada de Plata", danioBase: 50, durabilidad: 80, raro: true },
    { nombre: "Hacha Rathalos", danioBase: 20, durabilidad: 15, raro: false },
    { nombre: "Arco de Qurupeco", danioBase: 35, durabilidad: 100, raro: true },
    { nombre: "Daga Felyne", danioBase: 10, durabilidad: 5, raro: false },
  ]

  const inventarioProcesado = inventario.map(elemento => {
    // Usando ternarias
    const estado = elemento.durabilidad <= 20 ? "Roto" : "Operativo"

    // Usando if-else
    let danioFinal
    if (elemento.raro) {
      danioFinal = elemento.danioBase * 1.5
    } else {
      danioFinal = elemento.danioBase
    }
    
    return {
      nombre: elemento.nombre,
      danioFinal: danioFinal,
      estado: estado,
    }
  })
  console.log(inventarioProcesado);

  const danioTotal = inventarioProcesado
    .filter((arma) => arma.estado === "Operativo")
    .reduce((acumulador, elementoActual) => acumulador + elementoActual.danioFinal, 0)

  console.log(`El daño total de las armas operativas es de ${danioTotal}`)

  if (danioTotal >= 150) {
    console.log(`El equipo suma ${danioTotal} de daño total y está listo para matar al Rathian`)
  } else {
    console.log(`El equipo sólo suma ${danioTotal} de daño total. No es suficiente para enfrentarse al Rathian`)
  }
})
