/**
    window.addEventListener("DOMContentLoaded", () => {
        const botonCitas = document.querySelector('#btn-cita');
        const citaTexto = document.getElementById('cita');
        const citaAutor = document.getElementById('autor');

        let indiceAleatorio = Math.floor(Math.random() * citas.length);
        citaTexto.innerText = citas[indiceAleatorio].autor;
        citaAutor.innerText = `"${citas[indiceAleatorio].cita}"`;

        botonCitas.addEventListener('click', () => {
            let indiceAleatorio = Math.floor(Math.random() * citas.length);
            citaAutor.innerText = citas[indiceAleatorio].autor;
            citaTexto.innerText = `"${citas[indiceAleatorio].cita}"`;
        })
    });

    Ejercicio REFACTORIZAR ESTE CODIGO
 */

const generarRandom = () => Math.floor(Math.random() * citas.length)

const iniciarApp = () => {
    const botonCitas = document.querySelector('#btn-cita');
    const citaTexto = document.getElementById('cita');
    const citaAutor = document.getElementById('autor');
    
    const generarCita = () => {
        let indiceAleatorio = generarRandom();
        citaAutor.innerText = citas[indiceAleatorio].autor;
        citaTexto.innerText = `"${citas[indiceAleatorio].cita}"`;
    }

    generarCita();

    botonCitas.addEventListener('click', generarCita)
}

window.addEventListener("DOMContentLoaded", iniciarApp);