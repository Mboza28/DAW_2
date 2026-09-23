# Apuntes: Manipulación del DOM con JavaScript

## 1. Selección y Captura de Elementos

Para interactuar con el HTML desde JavaScript, primero necesitamos "capturar" los elementos. Existen métodos clásicos y métodos modernos más flexibles.

### Métodos Clásicos
*   **`document.getElementById("id")`**: Captura un único elemento por su ID. Si hay varios con el mismo ID, solo captura el primero.
*   **`document.getElementsByClassName("clase")`**: Captura todos los elementos que tengan esa clase. 
    *   **¡OJO!** Devuelve un `HTMLCollection`. Parece un array, pero **no lo es**. No dispone de los métodos típicos de los arrays (como `map` o `filter`), aunque se puede acceder a sus elementos por índice (ej. `coleccion[0]`).
*   **`document.getElementsByTagName("etiqueta")`**: Captura todos los elementos que coincidan con la etiqueta HTML (ej. `"li"`, `"p"`, `"a"`).

### Métodos Modernos (Recomendados)
Utilizan la misma sintaxis que los selectores de CSS, lo que los hace extremadamente potentes.
*   **`document.querySelector("selector")`**: Devuelve **solo el primer elemento** que coincida con la búsqueda.
    *   Por ID: `document.querySelector("#mi-id")`
    *   Por clase: `document.querySelector(".mi-clase")`
    *   Selectores complejos: `document.querySelector("ul li.fondo-naranja")`
    *   Con pseudoclases: `document.querySelector("ul li:not(.fondo-marron)")`
*   **`document.querySelectorAll("selector")`**: Devuelve **todos** los elementos que coincidan.
    *   Devuelve una **`NodeList`** (Lista de Nodos). Es muy parecida al `HTMLCollection`, tiene propiedad `.length` y se accede por índice.

---

## 2. Lectura y Modificación de Contenido (Texto y HTML)

Una vez capturado un elemento, podemos leer o cambiar lo que tiene dentro. Existen tres propiedades principales con diferencias clave:

*   **`.textContent`**: Devuelve el texto plano exacto que contiene el elemento y sus hijos, ignorando el CSS.
*   **`.innerText`**: Devuelve el texto "renderizado", es decir, tal y como se ve en la pantalla (respeta ocultamientos por CSS, saltos de línea, etc.). También sirve para modificar el texto: `elemento.innerText = "Nuevo texto"`.
*   **`.innerHTML`**: Devuelve o modifica todo el contenido del elemento incluyendo las etiquetas HTML en formato String.

**Otras propiedades de inspección:**
*   **`.tagName`**: Devuelve el tipo de etiqueta HTML del elemento en mayúsculas (ej. `"H1"`, `"LI"`).
*   **`console.dir(elemento)`**: A diferencia del `console.log()` que muestra la estructura HTML, `console.dir()` muestra el elemento como un objeto JavaScript, listando todas sus propiedades accesibles.

---

## 3. Modificación de Estilos (CSS)

Podemos aplicar estilos en línea (inline) directamente a un elemento a través de la propiedad `.style`. Esto introducirá en el HTML propiedades style en el elemento en el que se apliquen, es recomencable antes que aplicar estilos de esta forma, crear en css una clase nueva con el diseño que queramos aplicar y cambiarle al elemento la clase, asi no modificaremos el HTML, es mucho mas limpio y se trabaja mas cómodo.
*   Las propiedades que en CSS llevan guión (ej. `text-transform`, `background-color`) pasan a escribirse en **camelCase** en JavaScript.

```javascript
const elemento = document.querySelector(".topping");
elemento.style.color = "#ffc400";
elemento.style.textTransform = "uppercase";
```

---

## 4. Gestión de Clases CSS (`classList`)

La forma más limpia de aplicar estilos es añadir o quitar clases CSS predefinidas en lugar de inyectar estilos directamente. Para ello usamos la propiedad `.classList`:

*   **`.classList.add("clase1", "clase2")`**: Añade una o más clases al elemento.
*   **`.classList.remove("clase")`**: Elimina una clase del elemento.
*   **`.classList.contains("clase")`**: Evalúa si el elemento tiene esa clase y devuelve `true` o `false`.

---

## 5. Manipulación de Atributos HTML

Permite interactuar con los atributos de las etiquetas, como el `href` de los enlaces `<a>`, el `src` de las imágenes `<img>` o atributos personalizados `data-`.

*   **`.getAttribute("atributo")`**: Obtiene el valor del atributo. *(Ej: `enlace.getAttribute("href")`)*.
*   **`.setAttribute("atributo", "valor")`**: Modifica o crea un atributo con un nuevo valor. *(Ej: `enlace.setAttribute("href", "https://google.es")`)*.
*   **`.removeAttribute("atributo")`**: Elimina el atributo por completo de la etiqueta.

---

## 6. Creación e Inserción de Nuevos Elementos

El DOM permite generar código HTML desde cero e inyectarlo en la página de forma dinámica. El proceso habitual sigue tres pasos: crear, configurar e inyectar.

```javascript
// 1. CREAR el elemento en memoria (aún no existe en la página)
const nuevoLi = document.createElement("li");

// 2. CONFIGURAR el elemento (clases, texto, atributos...)
nuevoLi.classList.add("topping", "fondo-marron");
nuevoLi.innerText = "Queso Extra";

// 3. INYECTAR el elemento dentro de un padre existente
const lista = document.getElementById("lista-toppings");

// Formas de inyectar:
lista.appendChild(nuevoLi); // Añade un nodo al final
lista.append(nuevoLi, "texto"); // Añade varios nodos o cadenas de texto al final
```

---

## 7. Navegación por el Árbol del DOM (Traversing)

Podemos movernos de un elemento a otro basándonos en sus relaciones familiares (padres, hijos y hermanos).

### Hacia los Padres (Arriba)
*   **`.parentElement`**: Devuelve la etiqueta HTML padre que contiene al elemento. (Se pueden concatenar: `elemento.parentElement.parentElement` para llegar al abuelo).
*   **`.parentNode`**: Devuelve el nodo padre (similar a parentElement, pero puede incluir nodos que no son HTML, como el Documento en sí).

### Hacia los Hijos (Abajo)
*   **`.children`**: Devuelve una colección (`HTMLCollection`) con todos los elementos HTML hijos directos. Se puede acceder por índice: `elemento.children[0]`.
*   **`.firstElementChild`**: Devuelve el primer elemento HTML hijo.
*   **`.lastElementChild`**: Devuelve el último elemento HTML hijo.
*(Nota: Existen `.firstChild` y `.lastChild`, pero devuelven "nodos", lo que significa que pueden devolver un salto de línea invisible o un comentario en lugar de una etiqueta HTML real).*

### Hacia los Hermanos (Lados)
*   **`.previousElementSibling`**: Devuelve el elemento hermano inmediatamente anterior.