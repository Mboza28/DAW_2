# Apuntes: Manipulación del DOM y Refactorización en JavaScript

## 1. Mentalidad y Metodología de Refactorización

Refactorizar no es reescribir un programa desde cero, es **reestructurar el código existente sin cambiar su comportamiento externo** para mejorar su legibilidad, mantenibilidad y rendimiento.

### El Mantra de Kent Beck
> *"Make it work, make it right, make it fast."* (Haz que funcione, hazlo bien, hazlo rápido).

1. **Haz que funcione:** Tu primer objetivo siempre es resolver el problema. Está permitido escribir código "feo" o repetitivo en esta fase si te ayuda a entender la lógica y llegar a la solución.
2. **Hazlo bien (Refactorización):** Una vez funciona, detente. Limpia el código, extrae funciones, aplica principios (DRY, SRP) y pon nombres descriptivos. Escribe código para que lo entiendan los humanos, no solo las máquinas.
3. **Hazlo rápido (Optimización):** Solo si la aplicación es lenta, busca formas de mejorar el rendimiento (como implementar la caché del DOM que vimos antes).

### Metodología Paso a Paso (Cómo refactorizar de forma segura)

1. **Nunca refactorices código roto:** Si el proyecto tiene un bug, arréglalo primero. La refactorización se hace sobre código verde (que funciona).
2. **Identifica el objetivo ("Code Smell"):** Antes de tocar nada, analiza qué vas a mejorar. ¿Vas a quitar repeticiones? ¿Vas a simplificar un `if` gigante? Ten un plan.
3. **Cambios microscópicos:** El mayor error es borrar media página de código de golpe. Haz cambios minúsculos: extrae una sola variable, comprueba que funciona; saca una función, comprueba que funciona.
4. **Testeo continuo:** Después de cada pequeño cambio, ve al navegador y haz clic. Si el proyecto se rompe, solo tienes que deshacer la última línea que escribiste, en lugar de buscar el fallo entre 50 líneas nuevas.

### La Regla del Boy Scout
*"Deja el campamento (el código) siempre un poco más limpio de lo que lo encontraste".* 
La refactorización en el entorno profesional no es una tarea que se agenda para el final del mes; es un hábito diario. Si entras a un archivo a añadir un botón y ves una variable mal nombrada o una función duplicada, arréglalo en ese momento.

## 2. Por qué refactorizamos

Los proyectos originales compartían una serie de problemas comunes que justifican la refactorización:

* **Lectura constante del DOM:** Cada vez que se hacía clic en un botón, JavaScript volvía a buscar los elementos en el HTML (usando `querySelector` o `getElementById`). Esto penaliza el rendimiento.
* **Falta de estado inicial:** Al cargar la página por primera vez había una desincronización (por ejemplo, el fondo era blanco aunque los sliders tuvieran valores, o no había cita hasta hacer el primer clic).
* **Violación del principio DRY (Don't Repeat Yourself):** Código duplicado para realizar la misma acción en distintos disparadores (eventos).
* **Falta de modularidad:** La lógica pura de programación (generar números aleatorios, construir strings) estaba fuertemente acoplada a la lógica de la interfaz (pintar el texto, cambiar el fondo).

---

## 3. Buenas Prácticas Aplicadas (Clean Code)

### A. Caché del DOM (DOM Caching)
**Regla de oro:** Captura los elementos del HTML **una sola vez** al arrancar la aplicación y guárdalos en variables.
* ❌ *Mal:* Usar `document.getElementById` dentro del `addEventListener`.
* ✅ *Bien:* Agrupar los `getElementById` al principio de una función de inicialización. Prioriza `getElementById` sobre `querySelector` para IDs únicos por rendimiento.

### B. Evitar Arrays y Números Mágicos
**Regla de oro:** Nunca dependas del orden físico de los elementos en el HTML.
* ❌ *Mal:* Usar `querySelectorAll('input')` y acceder mediante `inputs[0]`, `inputs[1]`. Si el HTML cambia, el script se rompe.
* ✅ *Bien:* Capturar cada elemento por su ID. Si una función devuelve varios elementos, devuelve un objeto (`return { boton, color }`) y usa **desestructuración**.

### C. Principio de Responsabilidad Única (SRP)
**Regla de oro:** Las funciones deben hacer una sola cosa.
La lógica de datos (matemáticas, selección de arrays) debe extraerse a funciones independientes que no interactúen con el DOM, haciéndolas testeables y reutilizables.

### D. Eliminación de lógica condicional innecesaria
En lugar de usar `if / else if` para evaluar qué elemento específico disparó un evento y actualizar solo esa variable, es más robusto crear una función de actualización general que lea el estado actual de todos los inputs y pinte el resultado.

---

## 4. Concepto Clave: Closures (Clausuras)

Un **closure** ocurre cuando se crea una función dentro de otra función. La función interna (hija) conserva el acceso al *scope* (alcance) y a las variables de la función externa (padre), incluso sin pasarlas por parámetro.

**Ejemplo de implementación:**
```javascript
const iniciarApp = () => {
    // 1. Variables en el scope de iniciarApp
    const boton = document.getElementById('btn');
    const texto = document.getElementById('texto');
    
    // 2. Closure: Al nacer aquí, absorbe el entorno y tiene acceso a 'texto'
    const actualizarPantalla = () => {
        texto.innerText = "¡Hola, mundo!"; 
    };

    // 3. Asignación limpia al listener
    boton.addEventListener('click', actualizarPantalla);
};
```

Los closures permiten encapsular la lógica de la vista, manteniendo las referencias al DOM seguras y evitando la inyección constante de argumentos.

## 5.Arquitectura Definitiva de un Script de UI

Plantilla estructural para separar responsabilidades en la manipulación del DOM:

```javascript
// BLOQUE 1: Lógica pura (Datos y cálculos. No interactúa con el DOM)
const obtenerDatoAleatorio = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

// BLOQUE 2: Controlador de la interfaz (Caché del DOM y eventos)
const iniciarApp = () => {
    // A. Caché del DOM (Lectura única)
    const boton = document.getElementById('boton');
    const display = document.getElementById('pantalla');

    // B. Funciones de actualización (Closures)
    const actualizarVista = () => {
        const nuevoDato = obtenerDatoAleatorio(misDatos);
        display.innerText = nuevoDato;
    };

    // C. Listeners
    boton.addEventListener('click', actualizarVista);

    // D. Estado inicial (Sincroniza la vista al cargar)
    actualizarVista();
};

// BLOQUE 3: Punto de entrada (Garantiza que el DOM está listo)
window.addEventListener("DOMContentLoaded", iniciarApp);
```
