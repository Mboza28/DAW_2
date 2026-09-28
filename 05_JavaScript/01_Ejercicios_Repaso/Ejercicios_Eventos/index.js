window.addEventListener("DOMContentLoaded", () => {

  /**
    RETO 1: El Formulario
      1. Captura el formulario completo (no solo el botón).
      2. Añádele un escuchador para el evento 'submit'.
      3. Evita que la página se recargue al enviarlo.
      4. Captura el valor del input '#nombre-cliente' y sácalo por consola.
    
  */

  const formulario = document.querySelector("#form-registro");
  console.log(formulario);
  formulario.addEventListener('submit', event => {
    event.preventDefault();
    let nombre = document.querySelector("#nombre-cliente");
    console.log(nombre.value);
  });

  /**
    RETO 2: Ponle un evento 'click' a 'tarjetaVip' que lance un alert("Abriendo detalles de la Suite...");
    
      Tenemos una tarjeta VIP entera que es "clickable", y un botón dentro de ella.  

    Reto 3: Ponle un evento 'click' a 'btnEvacuar' que lance un alert("¡Suite evacuada!"). Evitando que lance el evento de la tarjeta.
  */ 
    
  const tarjetaVip = document.getElementById("reserva-vip");

  tarjetaVip.addEventListener('click', () => {
    alert('Abriendo detalles de la Suite...')
  });

  const btnEvacuar = document.getElementById("btn-evacuar");

  btnEvacuar.addEventListener('click', evento => {
    evento.stopPropagation();
    alert('Suite libre!')
  })

  /** 
   * RETO 4: Delegación de Eventos
      No queremos poner un eventListener a cada botón de limpieza, porque en un hotel habría cientos.
    
      1. Ponle un ÚNICO evento 'click' al padre.
      2. Dentro del handler, comprueba si el event.target es un botón (puedes mirar si tiene la clase 'btn-limpiar').
      3. Si es el botón, haz que el elemento padre directo del botón (el <li>) reciba la clase CSS 'limpia'.
  */

  const listaHabitaciones = document.querySelector("#lista-habitaciones");
  listaHabitaciones.addEventListener('click', evento => {
    console.log(evento.target.parentElement)
    if(evento.target.classList.contains("btn-limpiar")){
      evento.target.parentElement.classList.toggle("limpia")
    }
  });


});