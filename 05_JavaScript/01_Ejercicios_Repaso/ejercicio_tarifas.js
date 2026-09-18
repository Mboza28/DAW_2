const calcularTarifaAvanzada = (distancia, esNoche, esFestivo) => {
    
    if(distancia === 0) {
        return "La distancia no puede ser 0"
    }
    
    let tarifaBase = 2.5
    let tarifaKm = 0.8
    let precioTotal = tarifaBase + distancia * tarifaKm
    
    if(esNoche) {
        precioTotal *= 1.2
    }

    if(esFestivo) {
        precioTotal += 1.5
    }
        
    return precioTotal
}

console.log(`El precio del viaje es: ${calcularTarifaAvanzada(0, true, true)}€`)