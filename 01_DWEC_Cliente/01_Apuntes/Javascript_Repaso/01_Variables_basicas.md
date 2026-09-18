# Apuntes Entorno Cliente (DWEC) - Día 1: Variables y Tipos Básicos

## 1. El Punto de Entrada (DOMContentLoaded)

En el entorno cliente (el navegador), es una buena práctica esperar a que todo el HTML (el DOM) esté completamente cargado antes de ejecutar nuestro código JavaScript.

```
window.addEventListener("DOMContentLoaded", function(){
    // Todo nuestro código va aquí dentro
});

```

*Nota:* Si el script se carga en el `<head>` sin el atributo `defer`, usar este evento es obligatorio para evitar errores al intentar acceder a elementos que aún no existen en la página.

## 2. Declaración de Variables: `var`, `let` y `const`

JavaScript tiene tres formas principales de declarar variables. La diferencia fundamental radica en su **ámbito (scope)** y su capacidad de reasignación.

* **`var`**: Es la forma antigua. Tiene un **ámbito global o de función**. Es decir, si la declaras dentro de un bloque `if` o `for`, seguirá existiendo fuera de él. *Se recomienda evitar su uso en código moderno.*

* **`let`**: Es la forma moderna. Tiene un **ámbito de bloque (local)**. Solo existe dentro de las llaves `{ }` donde ha sido declarada.

* **`const`**: Funciona igual que `let` en cuanto a ámbito, pero **no permite reasignar su valor**. Se usa para valores que no van a cambiar.

```
let saludo = "Hola"; // Variable normal
const PI = 3.14159;  // Constante (no se puede hacer PI = 4 después)

```

## 3. Tipado Dinámico

A diferencia de lenguajes estrictos como Java o C, JavaScript es de **tipado dinámico**. Esto significa que una variable declarada con `let` o `var` no está atada a un tipo de dato específico y puede cambiar en tiempo de ejecución.

```
let numero = 4;      // Empieza siendo un Number
numero = "Hola";     // Ahora es un String
numero = true;       // Ahora es un Boolean
numero = 0.4;        // Sigue siendo un Number (en JS los enteros y decimales son el mismo tipo)

```

### Comprobar el tipo con `typeof`

Para saber qué tipo de dato contiene una variable en un momento dado, usamos el operador `typeof`.

```
console.log(typeof numero); // Imprimirá "number"

```

## 4. Manipulación Básica de Cadenas (Strings)

### Concatenación Clásica

El operador `+` nos permite unir Strings. Si sumamos un String con un Number, JavaScript convierte automáticamente el número a String.

```
let frase = "Hola, soy el ";
let numero2 = 7;
let fraseCompleta = frase + numero2; 
console.log(fraseCompleta); // "Hola, soy el 7"

```

### Template Literals

Una forma mucho más moderna, limpia y habitual de concatenar en JavaScript es usar **Template Literals**. Se escriben con comillas invertidas (backticks: `` ` ``) y permiten inyectar variables directamente usando `${variable}`.

```
let fraseModerna = `Hola, soy el número ${numero2} y te saludo.`;
console.log(fraseModerna);

```

### Acceso a caracteres

Los Strings en JavaScript se comportan de forma similar a los arrays a la hora de leer sus caracteres. Empezamos a contar desde el índice `0`.

```
let palabra = "mesa";
console.log(palabra[1]); // Imprime "e" (índice 0=m, 1=e, 2=s, 3=a)

// MÉTODOS EXTRA ÚTILES PARA STRINGS:
console.log(palabra.length);       // 4 (Devuelve la longitud de la palabra)
console.log(palabra.charAt(1));    // "e" (Hace lo mismo que palabra[1])
console.log(palabra.toUpperCase());// "MESA" (Convierte todo a mayúsculas)

```