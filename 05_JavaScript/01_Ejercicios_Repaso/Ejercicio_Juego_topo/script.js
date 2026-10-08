// querySelectorAll devuelve un arrayList (parecido a un Array) con todos los elementos, este es el tablero
const agujeros = document.querySelectorAll('.agujero');
const puntuacion = document.getElementById("puntos");

let resultado = 0;
let posicionTopo = null;

const textoTiempo = document.getElementById('tiempo');
let tiempoRestante = 30;                              // Duración de la partida
let timerId = null;                                      // Para controlar el movimiento del topo
let cuentaAtrasId = null;                                // Para controlar el reloj

const textoRecord = document.getElementById('puntuacionMaxima');
let recordAlmacenado = localStorage.getItem('mejorPuntuacion') || 0;
textoRecord.textContent = recordAlmacenado;

function sacarTopo(){

    //limpiamos el tablero
    agujeros.forEach( agujero => {
        agujero.classList.remove('topo');
    })

    //creamos la aleatoriedad de donde saldra el topo
    const numeroAleatorio = Math.floor(Math.random() * 8);

    //colocamos al topo visualmente en el agujero del tablero que le corresponde
    agujeros.item(numeroAleatorio).classList.add('topo');

    //guardamos el id del agujero donde está el topo
    posicionTopo = agujeros.item(numeroAleatorio).id;
}

agujeros.forEach(agujero => {
    agujero.addEventListener("click", () =>{
        if(agujero.id === posicionTopo){
            resultado++;
            puntuacion.textContent = resultado;

            //resetear al topo
            posicionTopo = null;
            agujero.classList.remove('topo');
        }
    })
})

function cuentaAtras(){
    tiempoRestante--;
    textoTiempo.textContent = tiempoRestante;

    if (tiempoRestante === 0) {
        //paro el reloj
        clearInterval(cuentaAtrasId);

        //paro al topo
        clearInterval(timerId);

        if(resultado > localStorage.getItem('mejorPuntuacion')){
            alert('🎉 ¡NUEVO RÉCORD! Puntuación: ' + resultado);
            localStorage.setItem('mejorPuntuacion', resultado);
            textoRecord.textContent = resultado;
        }else {
            //Aviso del fin del juego
            alert('¡GAME OVER! 🏁 Tu puntuación final es: ' + resultado);
        }
    }
}
timerId = setInterval(sacarTopo, 800);
cuentaAtrasId = setInterval(cuentaAtras, 1000);