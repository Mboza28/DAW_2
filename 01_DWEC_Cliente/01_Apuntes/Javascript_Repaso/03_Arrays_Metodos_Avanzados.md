# Apuntes Entorno Cliente (DWEC) - Métodos avanzados de los Arrays

## 1. `.reduce()` 

El método `reduce` es una de las funciones más potentes de JavaScript. Ejecuta una función "reductora" sobre cada elemento de un array y devuelve un **único valor** final. 

Es la alternativa funcional y moderna a inicializar una variable a `0` antes de un bucle y usar un `forEach` para ir sumando valores.

* acumulador: La variable que va guardando el resultado devuelto en la iteración anterior.

* elementoActual: El elemento del array que se está evaluando en esa vuelta.

* valorInicial: El valor exacto con el que empieza el acumulador en la primera vuelta. Si sumas números, debes poner 0. Si quieres transformar un objeto dinámicamente se puede empezar el acumulador con {}.

### Sintaxis básica como contador

```javascript
array.reduce((acumulador, elementoActual) => {
    // Operación matemática o lógica
    return acumulador + elementoActual;
}, valorInicial);
```

**Ejemplo 1: Array simple de números**
```javascript
let cargas = [10, 20, 30, 40];

let cargaTotal = cargas.reduce((total, cargaActual) => {
    return total + cargaActual;
}, 0); 

console.log(cargaTotal); // Devuelve 100
```

**Ejemplo 2: Total de un array de objetos**
```javascript
let bodegaNave = [
    { mineral: "Painita", toneladas: 12, precio: 45000 },
    { mineral: "Platino", toneladas: 5, precio: 30000 },
    { mineral: "Oro", toneladas: 8, precio: 15000 }
];

let ingresosTotales = bodegaNave.reduce((acumulador, extraccion) => {
    // Multiplicamos toneladas por precio y lo sumamos a lo que ya llevábamos
    return acumulador + (extraccion.toneladas * extraccion.precio);
}, 0);

console.log(`Beneficio total de la venta: ${ingresosTotales} créditos`); 
// Devuelve 810000
```

### Sintaxis avanzada como constructor de objetos dinámicos

El método `reduce` no solo sirve para sumar números, sino que es la herramienta definitiva para transformar un array en una estructura de datos completamente diferente, como un objeto dinámico.

**Patrón: Agrupar por propiedades**

Para lograrlo, el acumulador debe inicializarse como un objeto vacío `{}`. Dentro del bucle, comprobamos si la propiedad ya existe; si no, la creamos.

```javascript
let tareas = [
    { titulo: "Ejercicios Arrays", asignatura: "Cliente" },
    { titulo: "API REST Spring Boot", asignatura: "Servidor" },
    { titulo: "Promesas y Fetch", asignatura: "Cliente" }
];

let tareasAgrupadas = tareas.reduce((acumulador, tareaActual) => {
    // 1. Si la asignatura no existe como clave en el objeto, la inicializamos como array vacío
    if (!acumulador[tareaActual.asignatura]) {
        acumulador[tareaActual.asignatura] = [];
    }
    // 2. Insertamos el título en el array correspondiente
    acumulador[tareaActual.asignatura].push(tareaActual.titulo);
    
    // 3. Devolvemos el acumulador entero para la siguiente vuelta
    return acumulador;
}, {}); // <-- Inicializamos con un objeto vacío
```

## 2. `.map()` (Transformar y Mapear)

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

**Ejemplo 4: Transformar un objeto en otro con propiedades distintas**
Este método tiene un uso más potente, transformar la estructura de un array de objetos en otra completamente distinta.

En lugar de devolver el mismo objeto modificado, podemos extraer propiedades, calcular otras nuevas en el momento incluso con condiciones y devolver un objeto literal nuevo por cada iteración.

```javascript
const usuarios = [
  { id: 1, nombre: "Lucía", rol: "admin", activo: true },
  { id: 2, nombre: "Miguel", rol: "user", activo: true }
];

// Creamos un array con una estructura de datos totalmente nueva
const resumenUsuarios = usuarios.map((user) => {
  return {
    identificador: user.id,
    nombreEnMayusculas: user.nombre.toUpperCase(),
    etiqueta: user.rol === "admin" ? "Administrador" : "Estándar"
  };
});

```

## 3. `.filter()` (Filtrar)

Crea un **nuevo array** solo con los elementos que cumplan una condición (que devuelvan `true`). 

```javascript
let listaNombres = ["Ana", "Antonio", "Beatriz", "Alberto"];
let empiezanConA = listaNombres.filter(nombre => nombre.startsWith("A"));
// ["Ana", "Antonio", "Alberto"]
```

### Quitar duplicados de Arrays con filter() e indexOf()

Aunque existe el objeto `Set` para eliminar duplicados, comprender cómo hacerlo con `.filter()` es fundamental para asimilar la lógica de posiciones en JavaScript.

Para lograrlo, necesitamos aprovechar dos características de estos métodos:
1. **El segundo parámetro de filter:** Además del elemento actual, `filter` nos puede devolver la posición exacta que está leyendo en ese momento: `.filter((elemento, posicionActual) => ...)`
2. **El comportamiento de indexOf:** Este método siempre devuelve el índice de la **PRIMERA** vez que encuentra un elemento en el array, ignorando si hay más repetidos más adelante.

---

### El Patrón Lógico
La condición para saber si un elemento está repetido es comparar si su posición actual en el bucle coincide con la primera vez que aparece en el array completo.

```javascript
let ingredientes = ["Ajo", "Cebolla", "Ajo"];

let ingredientesUnicos = ingredientes.filter((ingrediente, posicionActual) => {
    // ¿La primera aparición de este ingrediente coincide con mi posición actual?
    return ingredientes.indexOf(ingrediente) === posicionActual;
});

console.log(ingredientesUnicos); 
// Resultado: ["Ajo", "Cebolla"]
```

### Truco Lógico: Elementos únicos con `.filter()` y indexOf() y lastIndexOf()

Para saber si un elemento es único en un array (es decir, no se repite en ninguna otra posición), puedes comparar su primera aparición con su última aparición. Si ambas posiciones son el mismo número, el elemento es único.

```javascript
let ips = ["192.168.1.1", "10.0.0.5", "192.168.1.1"];

// Si la primera vez que veo la IP coincide con la última vez que la veo, es única.
let ipsUnicas = ips.filter(ip => ips.indexOf(ip) === ips.lastIndexOf(ip));
// Resultado: ["10.0.0.5"]
```

### Encadenamiento (Chaining) de `.filter()` y `.map()`

Los métodos de arrays que devuelven un nuevo array (map, filter, sort) se pueden encadenar unos con otros. Esto nos permite crear "tuberías" (pipelines) de datos de forma muy declarativa y limpia, sin crear variables intermedias.

Un patrón muy común es **filtrar primero los elementos que nos interesan con .filter() y pasarle ese resultado inmediatamente a un .reduce() para calcular un total**.

```javascript
const inventario = [
  { arma: "Espada", danio: 50, estado: "Operativo" },
  { arma: "Arco", danio: 30, estado: "Roto" },
  { arma: "Daga", danio: 15, estado: "Operativo" }
];

// Calculamos el daño total SOLO de las armas operativas en un solo bloque
const danioTotalOperativo = inventario
  .filter((item) => item.estado === "Operativo") // Filtra (ignora el Arco)
  .reduce((total, item) => total + item.danio, 0); // Suma los restantes (50 + 15)
```

## 4. El objeto Set para eliminar duplicados de forma rápida

Un Set es una **estructura de datos** introducida en ES6 que no admite valores duplicados. Es la forma más moderna y eficiente de limpiar un array.

Se suele combinar con el operador de propagación (...) para convertir el Set resultante de vuelta a un array normal en una sola línea:

```javascript
let receta = ["Ajo", "Cebolla", "Ajo", "Pimentón", "Cebolla"];
let recetaLimpia = [...new Set(receta)]; 
// Resultado: ["Ajo", "Cebolla", "Pimentón"]
```

## 5. Concepto: Polyfill y Callbacks internos

Un Polyfill es un bloque de código que creamos a mano para replicar el funcionamiento de una herramienta nativa (como .filter()) en navegadores o entornos antiguos que no la soportan.

Crear un polyfill demuestra cómo funcionan los métodos de array por debajo: iteran sobre los elementos, aplican una función callback (que es simplemente una variable que contiene otra función dentro) y reaccionan a su resultado lógico.

```javascript
// Recreación interna del método .filter()
function miFiltro(array, callback) {
    let arrayFinal = [];
    array.forEach(elemento => {
        // El callback se ejecuta aquí devolviendo true o false
        if (callback(elemento)) {
            arrayFinal.push(elemento);
        }
    });
    return arrayFinal;
}

let numeros = [10, 50, 8, 30];
let mayoresDeVeinte = miFiltro(numeros, num => num > 20); 
// Resultado: [50, 30]
```