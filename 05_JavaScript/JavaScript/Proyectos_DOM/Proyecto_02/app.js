
/**
    window.addEventListener("DOMContentLoaded", () => {

        // Capturamos los eventos que necesitaremos
        const inputRojo = document.querySelector('#rojo');
        const inputVerde = document.querySelector('#verde');
        const inputAzul = document.querySelector('#azul');

        const textoRojo = document.getElementById('texto-rojo');
        const textoVerde = document.getElementById('texto-verde');
        const textoAzul = document.getElementById('texto-azul');

        // Creamos variables para guardar los valores de cada color cuando cambian y poder aplicarlas luego
        let rojo = inputRojo.value;
        let verde = inputVerde.value;
        let azul = inputAzul.value;

        // Colocamos el número leido de la variable en el texto del parrafo
        textoRojo.innerText = rojo;
        textoVerde.innerText = verde;
        textoAzul.innerText = azul;

        // Hacemos un escuchador a cada input, leyendo el valor de cada uno y colocandoselo al texto y al fondo
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
    // MI SOLUCION

 const iniciarApp = () => {

    const inputs = document.querySelectorAll('input');

    const texto = document.querySelectorAll('p');

    let rojo = inputs[0].value;
    let verde = inputs[1].value;
    let azul = inputs[2].value;

    const cambiarColor = () => {
        
        texto[0].innerText = rojo;
        texto[1].innerText = verde;
        texto[2].innerText = azul;
        let colorRGB = `rgb(${rojo}, ${verde}, ${azul})`;
        document.body.style.backgroundColor = colorRGB;
    }

    inputs.forEach(input => {
        input.addEventListener('input', evento => {
            let color = evento.target;
            if(color.id === 'rojo'){
                rojo = color.value;
                cambiarColor();
            } else if(color.id === 'verde'){
                verde = color.value;
                cambiarColor();
            } else if(color.id === 'azul'){
                azul = color.value;
                cambiarColor();
            }
        });
    });

    cambiarColor();
};

window.addEventListener("DOMContentLoaded", iniciarApp);

// Solucion alternativa
// const iniciarApp = () => {

//     const inputRojo = document.getElementById('rojo');
//     const inputVerde = document.getElementById('verde');
//     const inputAzul = document.getElementById('azul');

//     const textoRojo = document.getElementById('texto-rojo');
//     const textoVerde = document.getElementById('texto-verde');
//     const textoAzul = document.getElementById('texto-azul');

//     const actualizarColor = () => {
        
//         const rojo = inputRojo.value;
//         const verde = inputVerde.value;
//         const azul = inputAzul.value;

//         textoRojo.innerText = rojo;
//         textoVerde.innerText = verde;
//         textoAzul.innerText = azul;

//         document.body.style.backgroundColor = `rgb(${rojo}, ${verde}, ${azul})`;
//     }

//     // 3. Metemos los 3 inputs específicos en un array y les asignamos el evento
//     const inputsColor = [inputRojo, inputVerde, inputAzul];
    
//     inputsColor.forEach(input => {
//         // Cuando cualquier input cambie, llamamos a la función
//         input.addEventListener('input', actualizarColor);
//     });

//     // 4. Ejecutamos una vez al cargar para aplicar el color inicial
//     actualizarColor();
// }

// window.addEventListener("DOMContentLoaded", iniciarApp);