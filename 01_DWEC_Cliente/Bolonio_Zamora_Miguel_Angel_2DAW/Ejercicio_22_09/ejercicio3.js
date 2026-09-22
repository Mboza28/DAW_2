window.addEventListener("DOMContentLoaded", () => {
  
  // Ejercicio 3

  const calculoDanio = (danioBase, infectado) => {
    if (infectado) {
      return danioBase * 2 + 15
    } else {
      return danioBase * 3 + 15
    }
  }

  const analizarDroide = (nombre, danioBase) => {
    
    const esMalicioso = nombre => nombre.startsWith("HK") || nombre.startsWith("B2")
    
    setTimeout(() => {
      
      const infectado = esMalicioso(nombre)
      const danioTotal = calculoDanio(danioBase, infectado)
      
      if (infectado) {
        console.log(`El droide ${nombre} está infectado y tiene ${danioTotal} de daño total`)
      } else {
        console.log(`El droide ${nombre} NO está infectado y tiene ${danioTotal} de daño total`)
      }

    }, 10000)
  }

  analizarDroide("HK123O", 120)
  analizarDroide("B2123O", 180)
  analizarDroide("PLKJA", 220)
})