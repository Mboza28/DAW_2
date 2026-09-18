# Apuntes Entorno Cliente (DWEC) - Día 1: Arrays y sus Métodos

## 1. Introducción a los Arrays

En JavaScript, los Arrays son estructuras muy dinámicas. No necesitas definir su tamaño al crearlos y **permiten mezclar distintos tipos de datos** (Strings, Numbers, Booleans, funciones, etc.) en un mismo array.

```javascript
// Creación de un array mixto
let miArray = ["manzana", "pera", "uva", 44, false, function(param){}];
console.log(miArray);
```

---

## 2. Añadir y Eliminar elementos en los extremos

Estos cuatro métodos son los más básicos y **modifican el array original**.

*   **`push(elemento1, elemento2...)`**: Añade uno o más elementos al **final**.
*   **`pop()`**: Elimina el **último** elemento y lo devuelve (puedes guardarlo en una variable).
*   **`unshift(elemento1...)`**: Añade uno o más elementos al **principio**.
*   **`shift()`**: Elimina el **primer** elemento y lo devuelve.

```javascript
let arrayFrutas = ["manzana", "pera", "uva"];

arrayFrutas.push("kiwi", "platano"); // ["manzana", "pera", "uva", "kiwi", "platano"]
let frutaExtraida = arrayFrutas.pop(); // Extrae "platano". Queda: ["manzana", "pera", "uva", "kiwi"]

arrayFrutas.unshift("coco"); // ["coco", "manzana", "pera", "uva", "kiwi"]
arrayFrutas.shift();         // Extrae "coco". Queda: ["manzana", "pera", "uva", "kiwi"]
```
**IMPORTANTE!!! push y pop son mas rápidos en rendimiento puesto que solamente añaden y quitan AL FINAL, es decir, no modifican los indices del resto de elementos del Array. En cambio shift y unshift son mas lentos puesto que aparte de añadir y quitar elementos, tienen que mover todos los indices.**

---

## 3. Manipulación avanzada: El método `splice`

`splice` es la "navaja suiza" de los arrays. Sirve para **eliminar, reemplazar o insertar** elementos en cualquier posición. **¡Ojo! Modifica el array original** y devuelve un array con los elementos que haya eliminado.

**Sintaxis:** `array.splice(índiceInicio, numeroElementosAEliminar, elementoNuevo1, elementoNuevo2...)`

*   **Si solo pasas 1 parámetro:** `array.splice(2)` -> Elimina todo desde la posición 2 hasta el final.
*   **Si pasas 2 parámetros:** `array.splice(1, 2)` -> Desde la posición 1, elimina 2 elementos.
*   **Si pasas 3 o más:** `array.splice(1, 0, "limon")` -> En la posición 1, no elimina nada (0) e inserta "limon".

```javascript
let frutas = ["manzana", "pera", "uva", "kiwi"];

// Desde la posición 1, eliminamos 1 elemento ("pera")
frutas.splice(1, 1); 
console.log(frutas); // ["manzana", "uva", "kiwi"]

// Desde la posición 1, eliminamos 2 elementos ("uva", "kiwi") y metemos 3 nuevos
frutas.splice(1, 2, "limon", "naranja", "fresa");
console.log(frutas); // ["manzana", "limon", "naranja", "fresa"]
```

---

## 4. Extraer y Copiar: El método `slice`

A diferencia de `splice`, el método `slice` (cortar) **NO modifica el array original**. Su función es devolver un "sub-array" (una copia de una parte del array).

**Sintaxis:** `array.slice(posicionInicio, posicionFin)` *(La posiciónFin NO se incluye en el resultado)*.

```javascript
let colores = ["rojo", "verde", "azul", "amarillo", "rosa"];

// Extrae desde la pos 1 hasta la 3 (sin incluir la 3)
let algunosColores = colores.slice(1, 3); 
console.log(algunosColores); // ["verde", "azul"]

// TRUCO: Copiar un array completo
// Si no le pasamos parámetros, o usamos length, clona el array entero
let copiaCompleta = colores.slice(); 
```

---

## 5. Conversiones entre Arrays y Strings

Es muy habitual necesitar pasar de Array a String y viceversa.

*   **`toString()`**: Convierte el array en un String separando los elementos por comas.
*   **`join(separador)`**: Igual que `toString`, pero tú eliges el carácter separador. Útil para serializar datos.
*   **`split(separador)`**: **¡Ojo! Este es un método de los Strings, no de los arrays.** Permite coger un String y romperlo en un Array usando un separador.

```javascript
let animales = ["perro", "gato", "loro"];

console.log(animales.toString()); // "perro,gato,loro"

let stringArrobas = animales.join("@");
console.log(stringArrobas); // "perro@gato@loro"

// Usamos split sobre el String para volver a crear un Array
let nuevoArray = stringArrobas.split("@");
console.log(nuevoArray); // ["perro", "gato", "loro"]
```

---

## 6. Ordenación y Concatenación

*   **`concat()`**: Une dos o más arrays en uno nuevo.
*   **`reverse()`**: Le da la vuelta al array (modifica el original).
*   **`sort()`**: Ordena el array. Por defecto lo hace **alfabéticamente** (incluso si son números, los convierte a texto para ordenarlos, lo que puede dar resultados raros con números como 1, 10, 2). Para ordenar numeros de varias cifras la pasamos una funcion de comparación (Callback).

```javascript
let arr1 = ["z", "a"];
let arr2 = ["c", "b"];

let unidos = arr1.concat(arr2); // ["z", "a", "c", "b"]

// Para ordenar de Z a A: Primero ordenamos normal y luego invertimos
let ordenInverso = unidos.sort().reverse(); 
console.log(ordenInverso); // ["z", "c", "b", "a"]

// Para ordenar numeros de varias cifras
let numeros = [5, 12, 2, 40, 1];

// Ordenar de menor a mayor (Ascendente)
numeros.sort((a, b) => a - b); 
console.log(numeros); // [1, 2, 5, 12, 40]

// Ordenar de mayor a menor (Descendente)
numeros.sort((a, b) => b - a); 
```

---

## 7. Búsqueda y Localización

*   **`indexOf(elemento)`**: Busca de izquierda a derecha. Devuelve la posición de la primera coincidencia. **Si no existe, devuelve `-1`**.
*   **`lastIndexOf(elemento)`**: Busca de derecha a izquierda. Devuelve la posición de la última coincidencia. **Si no existe, devuelve `-1`**.

**Métodos útiles de Strings para usar al buscar en Arrays:** Cuando recorremos un array de palabras, solemos usar estos métodos de String para comprobar cosas:
*   **`startsWith(texto)`**: ¿Empieza la cadena por este texto? (Ej: "Pepe".startsWith("Pe") -> true)
*   **`endsWith(texto)`**: ¿Termina por este texto?

```javascript
let letras = ["a", "b", "c", "b"];
console.log(letras.indexOf("b"));     // 1
console.log(letras.lastIndexOf("b")); // 3
console.log(letras.indexOf("x"));     // -1 (No existe)

let nombres = ["Ana", "Antonio", "Beatriz"];
// ¿Hay algún nombre que empiece por A? Lo veremos mejor con 'filter' abajo.
```

---

## 8. ITERACIÓN Y MÉTODOS FUNCIONALES (ES6+)

Estos métodos son estándar en el JavaScript moderno (ES6+) y no modifican el array original, reciben una función (callback) que se ejecuta por cada elemento

### `includes(elemento)`
Es la versión moderna de `indexOf` cuando solo quieres saber si algo existe o no. Devuelve `true` o `false` (mucho más limpio que comprobar si `indexOf > -1`).

```javascript
let coches = ["ford", "seat", "audi"];
console.log(coches.includes("seat")); // true
console.log(coches.includes("bmw"));  // false
```

### `forEach()` (Recorrer)
La forma más cómoda de recorrer un array sin tener que montar un bucle `for` clásico.

```javascript
let frutasListado = ["manzana", "pera", "uva"];

frutasListado.forEach(function(fruta, indice) {
    console.log(`En la posición ${indice} está la ${fruta}`);
});

//Con funcion flecha quedaria asi
frutasListado.forEach((fruta, indice) => {
    console.log(`En la posición ${indice} está la ${fruta}`);
});
```

### `map()` (Transformar y Mapear)
Crea un **nuevo array** aplicando una transformación a cada elemento. Es vital para procesar y adaptar información.

**Conceptos clave del `map`:**

1. **Inmutabilidad:** Jamás altera el array original.
2. **Longitud exacta:** El array resultante siempre tendrá el mismo tamaño que el original. Si entran 5 elementos, salen 5 elementos transformados.
3. **Parámetros:** La función callback recibe hasta 3 datos: `(elemento, indice, arrayCompleto)`.

**Ejemplo 1: Transformación matemática básica**
```javascript
let precios = [10, 20, 30];
// Aplicamos el 21% de IVA a cada precio
let preciosConIva = precios.map(precio => precio * 1.21); 
console.log(preciosConIva); // [12.1, 24.2, 36.3]
```

**Ejemplo 2: Uso del parámetro del índice (index)**
Muy útil para crear listas numeradas o asignar IDs.
```javascript
let frutas = ["manzana", "pera", "uva"];
let menu = frutas.map((fruta, index) => `${index + 1}.- ${fruta}`);
console.log(menu); // ["1.- manzana", "2.- pera", "3.- uva"]
```

**Ejemplo 3: Extraer datos de un array de objetos (El uso más profesional)**
Imagina que recibes un listado complejo de usuarios de una base de datos, pero tú solo necesitas un array simple con sus nombres para mostrarlos en un desplegable de HTML.
```javascript
let usuarios = [
    { id: 1, nombre: "Ana", edad: 25 },
    { id: 2, nombre: "Juan", edad: 30 },
    { id: 3, nombre: "Paco", edad: 19 }
];

// Extraemos únicamente la propiedad "nombre"
let soloNombres = usuarios.map(usuario => usuario.nombre);
console.log(soloNombres); // ["Ana", "Juan", "Paco"]
```

### `filter()` (Filtrar)

Crea un **nuevo array** solo con los elementos que cumplan una condición (que devuelvan `true`). 

```javascript
let listaNombres = ["Ana", "Antonio", "Beatriz", "Alberto"];
let empiezanConA = listaNombres.filter(nombre => nombre.startsWith("A"));
// ["Ana", "Antonio", "Alberto"]
```

### `find()` y `findIndex()` (Buscar objetos o condiciones)

* `find` devuelve el **primer valor** que cumpla la condición.
* `findIndex` devuelve su **posición**.

```javascript
let notas = [4, 5, 8, 3, 9];
let primerAprobado = notas.find(nota => nota >= 5); // 5
```

### `some()` y `every()` (Comprobaciones booleanas)

* **`some`**: ¿Al menos **un** elemento cumple la condición?
* **`every`**: ¿**Todos** los elementos cumplen la condición?

```javascript
let haySuspensos = notas.some(nota => nota < 5); // true
let todosAprobados = notas.every(nota => nota >= 5); // false
```
