
/**
    window.addEventListener("DOMContentLoaded", () => {

        const inputRojo = document.querySelector('#rojo');
        const inputVerde = document.querySelector('#verde');
        const inputAzul = document.querySelector('#azul');

        const textoRojo = document.getElementById('texto-rojo');
        const textoVerde = document.getElementById('texto-verde');
        const textoAzul = document.getElementById('texto-azul');

        let rojo = inputRojo.value;
        let verde = inputVerde.value;
        let azul = inputAzul.value;

        textoRojo.innerText = rojo;
        textoVerde.innerText = verde;
        textoAzul.innerText = azul;

        inputRojo.addEventListener('input', evento => {
            rojo = evento.target.value;
            textoRojo.innerText = rojo;
            const colorRGB = `rgb(${rojo}, ${verde}, ${azul})`;
            document.body.style.backgroundColor = colorRGB;
        })

        inputVerde.addEventListener('input', evento => {
            verde = evento.target.value;
            textoVerde.innerText = verde;
            const colorRGB = `rgb(${rojo}, ${verde}, ${azul})`;
            document.body.style.backgroundColor = colorRGB;
        })

        inputAzul.addEventListener('input', evento => {
            azul = evento.target.value;
            textoAzul.innerText = azul;
            const colorRGB = `rgb(${rojo}, ${verde}, ${azul})`;
            document.body.style.backgroundColor = colorRGB;
        })

    });

    Ejercicio REFACTORIZAR ESTE CODIGO
 */

const capturaElementos = () => {
    const inputRojo = document.querySelector('#rojo');
    const inputVerde = document.querySelector('#verde');
    const inputAzul = document.querySelector('#azul');

    const textoRojo = document.getElementById('texto-rojo');
    const textoVerde = document.getElementById('texto-verde');
    const textoAzul = document.getElementById('texto-azul');

    let elementos = [inputRojo, inputVerde, inputAzul, textoRojo, textoVerde, textoAzul];
    return elementos;
}

const capturaColor = () => {
    const elementos = capturaElementos();
    let rojo = elementos[0].value;
    let verde = elementos[1].value;
    let azul = elementos[2].value;
    let colores = [rojo, verde, azul];
    return colores;
}

const cambioColorTexto = () => {
    const elementos = capturaElementos();
    elementos[3].innerText = rojo;
    elementos[4].innerText = verde;
    elementos[5].innerText = azul;
}

window.addEventListener("DOMContentLoaded", () => {

    

    

    inputRojo.addEventListener('input', evento => {
        rojo = evento.target.value;
        textoRojo.innerText = rojo;
        const colorRGB = `rgb(${rojo}, ${verde}, ${azul})`;
        document.body.style.backgroundColor = colorRGB;
    })

    inputVerde.addEventListener('input', evento => {
        verde = evento.target.value;
        textoVerde.innerText = verde;
        const colorRGB = `rgb(${rojo}, ${verde}, ${azul})`;
        document.body.style.backgroundColor = colorRGB;
    })

    inputAzul.addEventListener('input', evento => {
        azul = evento.target.value;
        textoAzul.innerText = azul;
        const colorRGB = `rgb(${rojo}, ${verde}, ${azul})`;
        document.body.style.backgroundColor = colorRGB;
    })

});