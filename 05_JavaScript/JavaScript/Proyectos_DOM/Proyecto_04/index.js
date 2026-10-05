window.addEventListener("DOMContentLoaded", () => {

    const botonInicioPausa = document.getElementById('boton-inicio-pausa');
    const botonReinicio = document.getElementById('boton-reiniciar');
    const cronometro = document.getElementById('cronometro');
    const listaVueltas = document.getElementById('lista-vueltas');

    let [horas, minutos, segundos] = [0, 0, 0];
    let [horasFormato, minutosFormato, segundosFormato] = [0, 0, 0];
    let intervaloTiempo;
    let estadoCronometro = "pausado";
    let contadorVueltas = 0;

    function actualizarCronometro () {

        segundos++;

        if(segundos / 60 === 1) {
            segundos = 0;
            minutos++;

            if(minutos / 60 === 1) {
                minutos = 0;
                horas++;
            }
        }
        [segundosFormato, minutosFormato, horasFormato] = [formateoCronometro(segundos), formateoCronometro(minutos), formateoCronometro(horas)];
        cronometro.innerText = `${horasFormato}:${minutosFormato}:${segundosFormato}`;
    }

    function formateoCronometro(unidadTiempo) {
        return unidadTiempo < 10 ? "0" + unidadTiempo : unidadTiempo;
    }

    botonInicioPausa.addEventListener('click', () => {
        
        if(estadoCronometro === "pausado") {
            intervaloTiempo = window.setInterval(actualizarCronometro, 1000);
            botonInicioPausa.innerHTML = '<i class="bi bi-pause-fill"></i>';
            botonInicioPausa.classList.remove('iniciar');
            botonInicioPausa.classList.add('pausar');
            estadoCronometro = "iniciado";

        } else {
            window.clearInterval(intervaloTiempo);
            botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
            botonInicioPausa.classList.remove('pausar');
            botonInicioPausa.classList.add('iniciar');
            estadoCronometro = "pausado";

            if(contadorVueltas < 3){

                const nuevaVuelta = document.createElement("li");
                nuevaVuelta.classList.add('vuelta');
                nuevaVuelta.innerText = `Vuelta: ${horasFormato}:${minutosFormato}:${segundosFormato}`;
                listaVueltas.append(nuevaVuelta);
                contadorVueltas++;

            } else {
                listaVueltas.firstChild.remove();
                nuevaVuelta = document.createElement("li");
                nuevaVuelta.classList.add('vuelta');
                nuevaVuelta.innerText = `Vuelta: ${horasFormato}:${minutosFormato}:${segundosFormato}`;
                listaVueltas.append(nuevaVuelta);
                contadorVueltas = 3;
            }
        }
    });

    botonReinicio.addEventListener('click', () => {
        cronometro.innerText = `00:00:00`;
        segundos = 0;
        minutos = 0;
        horas = 0;
        if(estadoCronometro === "iniciado") {
            window.clearInterval(intervaloTiempo);
            botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
            botonInicioPausa.classList.remove('pausar');
            botonInicioPausa.classList.add('iniciar');
            estadoCronometro = "pausado";
        }

        listaVueltas.innerHTML = "";
        contadorVueltas = 0;
    });
});