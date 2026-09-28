
/** 
    Los eventos ocurren cuando hay un cambio en un elemento del dom y le agregamos una funcionalidad para que sea reactivo a ese evento.
    Los eventos mas habituales son hacer click y escribir en el teclado pero existen un gran numero de ellos, por ejemplo, cambiar el tamaño de la pantalla
    arrastrar archivos al navegador o en el mismo navegador.
*/

/**
 * Conceptos importantes al tratar con eventos:
 *    1. Elemento target: es el elemento sobre el que se efectúa o el que desencadena el evento(por ejemplo un boton)
 *    2. Elemento trigger: es el desencadenante del evento, por ejemplo la acción de hacer click.
 *    3. Event Handler (Manejador de evento): es la funcion de javascript que se ejecuta cuando realizamos la accion. Seria el callback que va dentro del Listener.
 *    4. Event Listener (El escuchador del evento): es la función que está pendiente de que ocurra un trigger sobre el target y cuando ocurra llama al callback.
*/

/**
 * Existe una forma antigua de incluir eventos directamente en el HTML, es una forma de embeber los eventos pero no se deberia de mezclar el HTML con el JS
 * Por ejemplo:
 * <li onclick="mostrarTopping('aceitunas')"> Aceitunas </li>
 * Esto depende de que la pagina por ejemplo cargue completamente o ese elemento en particular, puede dar lugar a errores
*/

/**
 * Lo normal es que la funcion que ejecuta el codigo de javascript la pongamos al final del documento y que sea lo mas limpia posible
 * intentaremos hacer las funciones fuera.
 */

function capturarElemento(){
    const listaToppings = document.querySelectorAll('.topping');
    const topping = document.querySelector('#lista-toppings');  // Para hacer lo mismo pero partiendo del padre
    agregarEventosLista(listaToppings);
}

function agregarEventosLista(lista) {
    
    lista.forEach(elemento => {
        elemento.addEventListener('click', event => {

                //Esto es una confirmación de que el usuario ha pulsado realmente donde queremos que pulse, se puede usar de filtro
            if(event.target.classList.contains('fondo-marron')){
                mostrarTopping(elemento.textContent);
                console.log(elemento);
            }
            
        });
    });

}

// Asi podriamos capturar toda la lista sin necesidad de hacer un forEach para ponerle escuchadores a cada elemento.
// Con esto optimizamos el rendimiento y tenemos la misma funcionalidad que con el forEach.
// El elemento capturado ya no es una lista NodeList, es un unico elemento del DOM el UL por eso no hace falta recorrerlo.
function agregarEventoPadre(lista){
    lista.addEventListener('click', event => {
            
            // Podemos ponerle directamente el escuchador al target que desencadena el evento, es decir, al punto exacto donde hagamos click.
        mostrarTopping(event.target);
            
    });
}

function mostrarTopping(topping){
    alert("El topping seleccionado es: " + topping);
}




window.addEventListener('DOMContentLoaded', () => {

    capturarElemento();

});

