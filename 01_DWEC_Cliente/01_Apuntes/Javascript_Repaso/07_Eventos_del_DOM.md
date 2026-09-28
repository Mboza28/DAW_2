# Apuntes Entorno Cliente (DWEC) - Eventos en el DOM

## 1. ¿Qué son los eventos?
Los eventos ocurren cuando hay un cambio en un elemento del DOM (Document Object Model) y le agregamos una funcionalidad mediante JavaScript para que nuestra página sea reactiva a dicho cambio. 

Los más habituales son la interacción del usuario (hacer clic, escribir en el teclado, hacer scroll), pero existen muchos otros, como redimensionar la ventana del navegador, arrastrar archivos (drag & drop) o la carga completa del documento (DOMContentLoader).

---

## 2. Anatomía de un Evento (Conceptos Clave)
Para dominar los eventos, es fundamental diferenciar estos cuatro conceptos:

1.  **Target (Objetivo):** Es el elemento exacto del DOM sobre el que se efectúa o desencadena el evento (por ejemplo, un botón, un enlace o un `<li>`).
2.  **Trigger (Desencadenante):** Es la acción física o lógica que dispara el evento (por ejemplo, el hecho de hacer *click*, *doble click* o *keydown*).
3.  **Event Listener (Escuchador):** Es la función nativa (`addEventListener`) que se queda "escuchando" o pendiente de que ocurra un *trigger* sobre un *target*.
4.  **Event Handler (Manejador):** Es la función (callback) que nosotros escribimos y que contiene la lógica que se ejecutará cuando el *listener* detecte la acción.

---

## 3. Mala práctica: Eventos en línea (HTML embebido)
Existe una forma antigua de incluir eventos directamente en las etiquetas HTML usando atributos como `onclick`, `onmouseover`, etc.

```html
<!-- ❌ MALA PRÁCTICA: Mezclar lógica y estructura -->
<li onclick="mostrarTopping('aceitunas')">Aceitunas</li>
```
**¿Por qué no se debe usar?**
*   Rompe la separación de responsabilidades (HTML para estructura, JS para lógica).
*   Depende de que la página o el script haya cargado completamente; si el usuario hace clic antes, dará error.
*   Es difícil de mantener en aplicaciones grandes.

---

## 4. El objeto `event` (o `e`)
Cuando un evento se dispara, el navegador pasa automáticamente un objeto al *Handler* con toda la información sobre lo que acaba de ocurrir. Contiene propiedades y métodos cruciales:

*   **`event.target`**: Devuelve el elemento exacto del HTML que recibió la acción. Muy útil para saber exactamente dónde hizo clic el usuario.
*   **`event.preventDefault()`** : Evita el comportamiento por defecto del navegador. Indispensable al enviar formularios para evitar que la página se recargue, o al pulsar un `<a>` para evitar que navegue a otra URL.
*   **`event.stopPropagation()`** : Evita que el evento "burbujee" hacia los elementos padre.

---

## 5. Asignación Múltiple (El enfoque clásico)
Cuando tenemos una lista de elementos (como botones o un menú), la forma más intuitiva de asignarles un evento es capturarlos todos (`querySelectorAll`) y recorrerlos con un bucle (`forEach`) para ponerle un `addEventListener` a cada uno de forma individual.

```javascript
function agregarEventosLista() {
    // Capturamos todos los elementos (NodeList)
    const listaToppings = document.querySelectorAll('.topping');
    
    listaToppings.forEach(elemento => {
        elemento.addEventListener('click', event => {
            // Filtro de seguridad: Comprobamos si el elemento clicado tiene una clase específica
            if(event.target.classList.contains('fondo-marron')) {
                mostrarTopping(elemento.textContent);
            }
        });
    });
}
```
*Problema:* Si tienes 1000 elementos, estás creando 1000 escuchadores en memoria. Si añades un nuevo elemento a la lista dinámicamente con JS, este no tendrá el evento asignado.

---

## 6. El Flujo de Eventos: Burbujeo (Event Bubbling)
El "burbujeo" es el comportamiento por defecto de los eventos en el DOM. Cuando un evento ocurre en un elemento (por ejemplo, un clic en un botón), ese evento no se queda solo en el botón. Se dispara primero en el elemento más profundo (el *target*) y luego **"burbujea" o sube hacia arriba por el árbol del DOM**, disparando el mismo evento en sus elementos padres, abuelos, etc., hasta llegar al objeto global `window`.

**Ejemplo visual del Burbujeo:**
Imagina esta estructura HTML:
```html
<div id="abuelo" onclick="alert('Clic en el Abuelo')">
    <div id="padre" onclick="alert('Clic en el Padre')">
        <button id="hijo" onclick="alert('Clic en el Hijo')">Púlsame</button>
    </div>
</div>
```
Si haces clic en el botón "hijo", verás **tres alertas** en este orden exacto:
1. "Clic en el Hijo"
2. "Clic en el Padre"
3. "Clic en el Abuelo"

**Cómo detener el burbujeo (`stopPropagation`):**
A veces no queremos que el evento suba. Si tienes un botón de "Borrar" dentro de una tarjeta (`div`) que al hacerle clic te lleva a otra página, al pulsar "Borrar" no quieres que se dispare también el evento de la tarjeta.

```javascript
const botonHijo = document.querySelector('#hijo');

botonHijo.addEventListener('click', (event) => {
    event.stopPropagation(); // Corta el burbujeo aquí mismo
    console.log("Acción del hijo ejecutada, el padre no se entera.");
});
```

**Los dos escenarios clave del comportamiento del DOM y el burbujeo**
*   **Si el padre y el hijo tienen escuchadores**: aquí debes usar `event.stopPropagation()` en el manejador del hijo si quieres aislar la acción. Si no lo frenas, al hacer clic en el hijo se ejecutará su código y, milisegundos después, saltará también el código del padre. Es el caso clásico de un botón de "Borrar" que está dentro de una tarjeta clickable; quieres eliminar el elemento, no entrar a ver sus detalles.

*   **Si solo el hijo tiene escuchador**: no es necesario ni recomendable frenar la propagación. Aunque el evento siga "burbujeando" hacia arriba (pasando por el padre, el `<body>` y llegando hasta `window`), como ningún elemento por encima tiene un `addEventListener` esperando ese clic, el navegador simplemente lo deja pasar en silencio sin consumir recursos extra.

De hecho, usar `stopPropagation()` "por si acaso" cuando no hay un conflicto real se considera una **mala práctica** porque puede romper otras funcionalidades globales de la página. Por ejemplo:

*   **Menús desplegables o ventanas modales** que están programados en el padre para cerrarse cuando detectan un clic en cualquier parte del documento.

*   **Scripts externos (como Google Analytics)** que escuchan los clics a nivel global `(document)` para recopilar estadísticas de uso.

La regla general es: **si no hay un conflicto directo de eventos entre un elemento y sus padres, deja que la burbuja suba tranquila.**

---

## 7. Delegación de Eventos (El enfoque profesional)
Para optimizar el rendimiento, utilizamos la **Delegación de Eventos**. En lugar de ponerle un escuchador a cada hijo, le ponemos **un único escuchador al elemento padre** (por ejemplo, al `<ul>` o al `<tbody>` de una tabla). 

Como los eventos "burbujean" hacia arriba, el padre captura cualquier clic que se haga en sus hijos, y usamos `event.target` para identificar qué hijo exacto fue pulsado.

```javascript
function agregarEventoPadre() {
    // Capturamos solo al contenedor padre
    const contenedorLista = document.querySelector('#lista-toppings');
    
    // Asignamos UN único evento
    contenedorLista.addEventListener('click', event => {
        // Asegurarnos de que hemos hecho clic en un LI y no en el espacio vacío del UL
        if (event.target.tagName === 'LI') {
            mostrarTopping(event.target.textContent);
        }
    });
}
```
**Ventajas:**
*   Mejora drásticamente el rendimiento (1 solo *listener* frente a múltiples).
*   Si insertas nuevos elementos en el DOM después de cargar la página (por ejemplo, resultados de un `fetch`), funcionarán automáticamente sin necesidad de asignarles eventos nuevos.

---

## 8. Buenas prácticas de Arquitectura en JS
El código JS debe estar lo más limpio y estructurado posible. El punto de entrada ideal de la aplicación es esperar a que el DOM esté completamente cargado usando `DOMContentLoaded`.

```javascript
// Funciones manejadoras fuera, separadas e independientes
function mostrarTopping(topping){
    alert("El topping seleccionado es: " + topping);
}

function inicializarApp() {
    const listaPadre = document.querySelector('#lista-toppings');
    
    // Delegación de eventos aplicada en la inicialización
    listaPadre.addEventListener('click', event => {
        if(event.target.classList.contains('topping')) {
            mostrarTopping(event.target.textContent);
        }
    });
}

// Punto de entrada de la aplicación
window.addEventListener('DOMContentLoaded', () => {
    // Solo ejecutamos la lógica cuando el HTML está 100% construido
    inicializarApp();
});
```