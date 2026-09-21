window.addEventListener("DOMContentLoaded", () => {


  /**
   * Ejercicio 1:
   * Invoca la función prepararDespegue de tal forma que la nave siga siendo la por defecto, el motorSalto siga siendo el por defecto,
   * pero los escudos estén desactivados (false).
   */

  function prepararDespegue(nave = "Sidewinder", escudos = true, motorSalto = "Clase E") {
    console.log(`Nave: ${nave} | Escudos activos: ${escudos} | Motor: ${motorSalto}`);
  }

  prepararDespegue(undefined, false, undefined)

   /**
   * Ejercicio 2:
   * Crea una función de tipo FLECHA llamada 'calcularVolumen' para aceptar una cantidad infinita de números.
   * Dentro de la función, usa un reduce para devolver la suma total.
   * 
   * ZONA DE PRUEBAS (Debería funcionar con cualquier cantidad de números):
   * console.log(calcularVolumen(65, 65, 65, 70)); 
   * console.log(calcularVolumen(14, 14, 16));
   */

  const calcularVolumen = (...rutina) => {
    let total = rutina.reduce((acumulador, elemento) => elemento + acumulador, 0)
    return total
  }

  console.log(calcularVolumen(65, 65, 65, 70));
  console.log(calcularVolumen(14, 14, 16));

  /**
   * Ejercicio 3:
   * Estás programando un exploit que necesita esperar exactamente 3 segundos antes de lanzar la carga útil para no ser detectado por el firewall.
   * Pásale como primer argumento una función FLECHA ANÓNIMA que imprima por consola: "Bypass completado. Acceso root concedido."
   * Pásale como segundo argumento el tiempo necesario (3 segundos).
   */

  setTimeout(() =>{
    console.log("Bypass completado. Acceso root concedido")
  }, 3000)

  /**
   * Ejercicio 4:
   * Este código que has escrito en clase está lanzando un error letal en la consola: 
   * ReferenceError: Cannot access 'iniciarServidor' before initialization.
   * 
   * Explica con tus palabras por qué está fallando este código y arréglalo 
   * (pero OJO: está prohibido cambiar la función flecha por una función tradicional).

  */

  console.log("Iniciando sistema...");
  iniciarServidor();
 
  const iniciarServidor = () => {
    console.log("Servidor Spring Boot arrancado en puerto 8080");
  }

  /**  
   * Está fallando porque estamos invocando a la función antes de definirla e inicializarla.
   * Al ser una función flecha y estar vinculada a una constante, hasta que en ejecución no se llega a la declaración de la constante
   * no se crea la función vinculada a ella, haciendo imposible invocarla antes de su creación.
   * Podemos solucionar esto de dos formas:
   * 1. Hacer la invocación a iniciarServidor() debajo de la inicializacion de la constante que aloja la función.
   * 2. Si queremos mantener el código en este orden, tendríamos que declarar la funcion como function iniciarServidor(){...}
  */
   
})