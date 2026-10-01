/** 
 * CODIGO DE CLASE CON FRAN
  
    window.addEventListener("DOMContentLoaded", () => {
        const boton = document.querySelector('#boton-color');
        const color = document.getElementById('color');

        boton.addEventListener('click', () => {
            const digitos = '0123456789ABCDEF';
            let colorHex = '#';

            for(let i = 0; i < 6;i++){
                let indiceRandom = Math.floor(Math.random() * 16);
                colorHex += digitos[indiceRandom];
            }

            color.textContent = colorHex;
            document.body.style.backgroundColor = colorHex;
        });
    })

    Ejercicio REFACTORIZAR ESTE CODIGO
*/

/** Varias opciones de captura de elementos:
        1. Hacerlo una unica vez fuera del listener en una funcion que ya se encargue de inicializar la aplicacion se considera la mejor practica.
*/

const iniciarApp = () => {
    const boton = document.getElementById('boton-color');  // getElementById es más rápido que querySelector
    const textoColor = document.getElementById('color');

    boton.addEventListener('click', () => {
        const nuevoColor = generarColorAleatorio();
        textoColor.textContent = nuevoColor;
        document.body.style.backgroundColor = nuevoColor;
    });
};

const generarColorAleatorio = () => {
    const digitos = '0123456789ABCDEF';
        let colorHex = '#';

        for(let i = 0; i < 6;i++){
            let indiceRandom = Math.floor(Math.random() * 16);
            colorHex += digitos[indiceRandom];
        }
        return colorHex;
}

window.addEventListener("DOMContentLoaded", iniciarApp);

/** 2. En caso de hacer una funcion y retornar los elementos capturados hacerlo con un objeto => return{boton, color} así no usamos indices
    que pueden cambiar a lo largo del proyecto si añadimos o quitamos elementos, esto se llama Shorthand Properties, disponible desde ES6
    al llamarse igual la variable que la clave JS lo entiende directamente, y podemos luego usar destructuración para extraerlos facilmente.

const capturaElementos = () => {
    const boton = document.querySelector('#boton-color');
    const color = document.getElementById('color');
    return {boton, color};
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
    const {boton, color} = capturaElementos(); 

    boton.addEventListener('click', () => {
        let colorAleatorio = generarColorAleatorio();
        color.textContent = colorAleatorio;
        document.body.style.backgroundColor = colorAleatorio;
    });
}

window.addEventListener("DOMContentLoaded", () => {
    utilidadBotonColor();
});
*/ 