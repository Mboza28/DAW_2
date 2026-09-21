# Apuntes Entorno Cliente (DWEC) - Funciones en JavaScript

## 1. ¿Qué es una función?
Las funciones en JavaScript son **bloques de código reutilizables**. Permiten agrupar una lógica específica para no tener que repetir código a lo largo de la aplicación.

*   **Funciones con nombre:** Se definen con la palabra reservada `function` y un nombre. Se pueden llamar (invocar) tantas veces como queramos.
*   **Funciones anónimas:** Son aquellas que no tienen nombre. Se suelen utilizar para ejecutarse una única vez en un momento concreto (por ejemplo, al hacer clic en un botón) y no se pueden reutilizar llamándolas por un nombre.

```javascript
// Declaración de una función básica
function saludar() {
    console.log("¡Hola!");
}

// Invocación (ejecución) de la función
saludar();
```

---

## 2. Parámetros y Return
Las funciones pueden recibir datos externos para trabajar con ellos (parámetros) y pueden devolver un resultado hacia afuera usando la palabra reservada `return`.

**Importante:** Cuando una función ejecuta un `return`, termina su ejecución en esa línea y devuelve el valor. Lo que haya por debajo del `return` no se ejecutará.

```javascript
let saludoBase = "Hola";

function saludarPersonalizado(saludo) {
    let saludoCompleto = saludo + " Miguel!";
    return saludoCompleto; // Devuelve el resultado hacia afuera
}

// Podemos guardar el resultado devuelto en una variable o imprimirlo
console.log(saludarPersonalizado(saludoBase));
```

---

## 3. Scope (Alcance de las variables)
Las funciones tienen su propio ecosistema cerrado, conocido como **Scope** (alcance local). 
Si defines una variable con `let` o `const` **dentro** de una función, esa variable nace y muere dentro de la función. No podrás acceder a ella desde fuera, a no ser que la devuelvas con un `return`.

---

## 4. Parámetros por Defecto
En ocasiones llamamos a una función sin pasarle los argumentos que espera. Para evitar errores o valores `undefined`, podemos asignarle un valor "por defecto" directamente en la declaración de la función.

*   Si **no** le pasas argumento -> Usa el valor por defecto.
*   Si **sí** le pasas argumento -> Sobrescribe el valor por defecto.

```javascript
function saludarUsuario(nombre = "Miguel") {
    console.log("Buenos días " + nombre);
}

saludarUsuario();       // Imprime: "Buenos días Miguel" (Usa el valor por defecto)
saludarUsuario("Lu");   // Imprime: "Buenos días Lu" (Sobrescribe el valor)
```

---

**¡Ojo al saltar parámetros!** 
Si tenemos una función con varios argumentos por defecto y solo queremos modificar el último, **no podemos dejar los espacios vacíos con comas** `( , , "nuevoValor")` al invocarla, ya que JavaScript lanzará un error de sintaxis. Tenemos que enviarle explícitamente la palabra `undefined` en las posiciones que queremos omitir para que entienda que debe usar los valores por defecto.

```javascript
function configurarPerfil(rol = "Usuario", tema = "Oscuro", notificaciones = true) {
    console.log(`Rol: ${rol}, Tema: ${tema}, Notificaciones: ${notificaciones}`);
}

// INCORRECTO: configurarPerfil( , , false) -> ¡Error de sintaxis!

// CORRECTO: Usamos undefined para saltar los dos primeros parámetros
configurarPerfil(undefined, undefined, false);
// Imprime: "Rol: Usuario, Tema: Oscuro, Notificaciones: false"
```

## 5. Funciones Flecha (Arrow Functions - ES6)
Introducidas en EcmaScript 6, son una forma más moderna y corta de escribir funciones. 
Normalmente se guardan en variables `const` si queremos reutilizarlas, o se pasan directamente de forma anónima.

**Ventajas y sintaxis:**
1.  Si solo reciben **un parámetro**, se pueden omitir los paréntesis `()`.
2.  Si la función tiene **una sola línea de código**, se pueden omitir las llaves `{}`.
3.  Si omites las llaves, el `return` está implícito (se devuelve automáticamente el resultado sin escribir la palabra `return`).

```javascript
// Función tradicional
function sumar(numero) {
    return numero + numero;
}

// Función Flecha equivalente (Return implícito)
const sumaFlecha = numero => numero + numero;

console.log(sumaFlecha(10)); // Imprime 20
```

---

## 6. Funciones Callback
Un Callback es, simplemente, **una función que se pasa como argumento a otra función**. 
Es un concepto vital en JavaScript, ya que el lenguaje es asíncrono y a menudo necesitamos decirle: *"Haz esto, y cuando termines (o cuando pase algo), ejecuta esta otra función"*.

**Ejemplos clásicos de Callbacks:**

**A) En el DOM (Eventos):**
```javascript
const boton = document.getElementById("btn");

// Pasamos una función flecha anónima como callback que se ejecutará al hacer "click"
boton.addEventListener("click", () => {
    console.log("Me han pulsado");
});
```

**B) En Temporizadores:**
```javascript
// setTimeout recibe un callback y un tiempo en milisegundos
setTimeout(() => {
    console.log("Han pasado 4 segundos");
}, 4000);
```

**C) En Métodos de Arrays:**
```javascript
const numeros = [1, 2, 3, 4, 5];
// map recorre el array y ejecuta el callback por cada elemento
const dobles = numeros.map(numero => numero * 2);
```

---

## 7. REGLA DE ORO: El uso de los paréntesis `()`
El error más común al empezar con eventos y callbacks es ponerle paréntesis a la función cuando la pasamos como argumento.

*   **CON paréntesis `miFuncion()`:** Significa "Ejecútate **inmediatamente** ahora mismo".
*   **SIN paréntesis `miFuncion`:** Significa "Te paso la receta completa de la función, guárdala y ejecútala **solo cuando ocurra el evento** (un clic, un temporizador, etc.)".

```javascript
function dispararAlerta() {
    alert("¡Boom!");
}

// INCORRECTO: Se ejecutará al instante al cargar la página sin esperar al clic
boton.addEventListener("click", dispararAlerta()); 

// CORRECTO: Le pasamos la referencia. Esperará a que hagamos clic
boton.addEventListener("click", dispararAlerta); 
```

---

## 8. Extra: Conexión con el DOM
Entender las funciones primero de forma aislada hace que el paso al DOM sea mucho más sencillo. Conceptos como `document.getElementById` y `addEventListener` dependen íntegramente de saber pasar correctamente un *callback* (como hemos visto en el punto 7) para que el navegador sepa qué bloque de código ejecutar cuando el usuario interactúe con la página.

---

## 9. Conceptos Avanzados: Hoisting (Elevación)
En JavaScript, no todas las funciones se comportan igual respecto a dónde puedes llamarlas.

*   **Funciones tradicionales (`function`):** Sufren de *Hoisting*. El navegador las "eleva" al principio del archivo antes de ejecutar el código. Esto significa que **puedes llamar a la función líneas antes de haberla escrito**.
*   **Funciones flecha (`const func = () => {}`):** No sufren hoisting porque están guardadas en una variable `const` (o `let`). Si intentas llamarlas antes de declararlas, el programa explotará.

```javascript
// ESTO FUNCIONA (Hoisting)
saludar(); 
function saludar() { console.log("Hola"); }

// ESTO DA ERROR (No hay hoisting)
despedir(); // ReferenceError: Cannot access 'despedir' before initialization
const despedir = () => console.log("Adiós");
```

---

## 10. Parámetros REST (...args)
¿Qué pasa si quieres hacer una función que sume números, pero no sabes si le vas a pasar 2, 5 o 20 números? **Usamos el parámetro Rest (los mismos tres puntos que usamos para desempaquetar Arrays o Sets, pero al revés: para "empaquetar" argumentos).**

Si pones ... delante del último parámetro, JavaScript cogerá todos los argumentos extra que le pases y los meterá en un Array.

```javascript
// El parámetro 'numeros' se convierte en un array con todo lo que le pasemos
function sumarTodos(...numeros) {
    // Como 'numeros' es un array, podemos usar reduce directamente
    return numeros.reduce((total, num) => total + num, 0);
}

console.log(sumarTodos(1, 2));          // 3
console.log(sumarTodos(10, 20, 30, 40)); // 100
```

---

## 11. Funciones flecha vs Funciones Tradicionales (El contexto **this**)
Aparte de la sintaxis más corta, la gran diferencia técnica entre ambas es cómo manejan la palabra reservada `this` (que hace referencia al elemento que ejecuta la acción). Esto es vital cuando trabajamos con el DOM.

*   **Función Tradicional:** El `this` es el elemento HTML que disparó el evento (por ejemplo, el botón).
*   **Función Flecha:** No tiene `this` propio. Hereda el `this` del contexto exterior (normalmente, el objeto global `window`)

```javascript
const boton = document.getElementById("miBoton");

// Con función tradicional: 'this' es el propio botón
boton.addEventListener("click", function() {
    this.style.backgroundColor = "red"; // ¡Funciona! Pone el botón rojo
});

// Con función flecha: 'this' es la ventana entera (window)
boton.addEventListener("click", () => {
    this.style.backgroundColor = "red"; // ¡Falla! 'this' no es el botón aquí
});
```