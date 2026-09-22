window.addEventListener("DOMContentLoaded", () => {

  const calcularRecompensa = (dificultad, tipoPago) => {
    if(dificultad <1 || dificultad > 5){
      return "Dificultad proporcionada no válida, debe estar entre 1 y 5"
    } 
      
    if(tipoPago === "Oro"){
      return dificultad * 500
    }
    if(tipoPago === "Diamantes"){
      return dificultad * 200
    }
    return "Tipo de pago no reconocido" 
  }

  console.log(calcularRecompensa(4,"Oro"))
  console.log(calcularRecompensa(2,"Diamantes"))
  console.log(calcularRecompensa(8,"Diamantes"))
  console.log(calcularRecompensa(1,"Adivina el tipo"))
})