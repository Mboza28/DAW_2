/**
    window.addEventListener("DOMContentLoaded", () => {
        const boton = document.querySelector('#boton-color');
        const color = document.getElementById('color');

        const digitos = '0123456789ABCDEF';
        let colorHex = '#';

        for(let i = 0; i < 6;i++){
            let indiceRandom = Math.floor(Math.random() * 16);
            colorHex += digitos[indiceRandom];
        }

        boton.addEventListener('click', () => {    
            color.textContent = colorAleatorio;
            document.body.style.backgroundColor = colorAleatorio;
        });
    })
    
    Ejercicio REFACTORIZAR ESTE CODIGO 
*/


const capturaElementos = () => {
    const boton = document.querySelector('#boton-color');
    const color = document.getElementById('color');
    let elementos = [boton, color];
    return elementos;
}

const generarColorAleatorio = () => {
    const digitos = '0123456789ABCDEF';
        let colorHex = '#';

        for(let i = 0; i < 6;i++){
            let indiceRandom = Math.floor(Math.random() * 16);
            colorHex += digitos[indiceRandom];
        }
        return colorHex;
}

const utilidadBotonColor = () => {
    capturaElementos()[0].addEventListener('click', () => {
        let colorAleatorio = generarColorAleatorio();
        let elementos = capturaElementos();
        elementos[1].textContent = colorAleatorio;
        document.body.style.backgroundColor = colorAleatorio;
    });
}

window.addEventListener("DOMContentLoaded", () => {
    utilidadBotonColor();
});