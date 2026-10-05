const iniciarApp = () => {

    const botonInicioPausa = document.getElementById('boton-inicio-pausa');
    const botonReinicio = document.getElementById('boton-reiniciar');
    const cronometro = document.getElementById('cronometro');
    const listaVueltas = document.getElementById('lista-vueltas');

    let [horas, minutos, segundos] = [0, 0, 0];
    let [horasFormato, minutosFormato, segundosFormato] = [0, 0, 0];
    let intervaloTiempo;
    let estadoCronometro = "pausado";
    let contadorVueltas = 0;

    const actualizarCronometro = () => {
        segundos++;
        if(segundos === 60) {
            segundos = 0;
            minutos++;
            if(minutos === 60) {
                minutos = 0;
                horas++;
            }
        }
        [segundosFormato, minutosFormato, horasFormato] = [formateoCronometro(segundos), formateoCronometro(minutos), formateoCronometro(horas)];
        cronometro.innerText = `${horasFormato}:${minutosFormato}:${segundosFormato}`;
    }

    const formateoCronometro = unidadTiempo => unidadTiempo < 10 ? "0" + unidadTiempo : unidadTiempo;
    
    const cronoInicio = () => {
        intervaloTiempo = window.setInterval(actualizarCronometro, 1000);
        botonInicioPausa.innerHTML = '<i class="bi bi-pause-fill"></i>';
        botonInicioPausa.classList.replace('iniciar','pausar');
        estadoCronometro = "iniciado";
    }

    const cronoPausa = () => {
        window.clearInterval(intervaloTiempo);
        botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
        botonInicioPausa.classList.replace('pausar', 'iniciar');
        estadoCronometro = "pausado";
    }

    const crearVuelta = () => {
        const nuevaVuelta = document.createElement("li");
        nuevaVuelta.classList.add('vuelta');
        nuevaVuelta.innerText = `Vuelta: ${horasFormato}:${minutosFormato}:${segundosFormato}`;
        listaVueltas.append(nuevaVuelta);
        contadorVueltas++;
    }

    const reinicio = () => {
        segundos = 0;
        minutos = 0;
        horas = 0;
        cronometro.innerText = `00:00:00`;
    }

    botonInicioPausa.addEventListener('click', () => {
        if(estadoCronometro === "pausado"){
            cronoInicio();
        } else {
            cronoPausa();
            if (contadorVueltas >= 3){
                listaVueltas.firstChild.remove();
                contadorVueltas = 2;
            } 
            crearVuelta();
        }
    });

    botonReinicio.addEventListener('click', () => {
        reinicio();
        if (estadoCronometro === "iniciado"){ cronoPausa() }
        listaVueltas.innerHTML = "";
        contadorVueltas = 0;
    });
}

window.addEventListener("DOMContentLoaded", iniciarApp)

