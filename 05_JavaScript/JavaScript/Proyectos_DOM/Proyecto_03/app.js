/**
    window.addEventListener("DOMContentLoaded", () => {
        const botonCitas = document.querySelector('#btn-cita');
        const citaTexto = document.getElementById('cita');
        const citaAutor = document.getElementById('autor');

        let indiceAleatorio = Math.floor(Math.random() * citas.length)

        citaTexto.innerText = citas[indiceAleatorio].autor;
        citaAutor.innerText = `"${citas[indiceAleatorio].cita}"`;

        botonCitas.addEventListener('click', () => {
            citaTexto.innerText = citas[indiceAleatorio].autor;
            citaAutor.innerText = `"${citas[indiceAleatorio].cita}"`;
        })
    });

    Ejercicio REFACTORIZAR ESTE CODIGO
 */


const capturarElementos = () => {
    const botonCitas = document.querySelector('#btn-cita');
    const citaTexto = document.getElementById('cita');
    const citaAutor = document.getElementById('autor');
    const elementos = [botonCitas, citaTexto, citaAutor];
    return elementos;
}

const generarRandom = () => {
    let indiceAleatorio = Math.floor(Math.random() * citas.length);
    return indiceAleatorio;
}

const generarCita = () => {
    let indiceAleatorio = generarRandom();
    let elementos = capturarElementos();
    elementos[2].innerText = citas[indiceAleatorio].autor;
    elementos[1].innerText = `"${citas[indiceAleatorio].cita}"`;
}

const utilidadBoton = () => {
    capturarElementos()[0].addEventListener('click', capturarElementos => {
        generarCita();
    })
}

window.addEventListener("DOMContentLoaded", () => {

    generarCita();
    utilidadBoton();
    
});