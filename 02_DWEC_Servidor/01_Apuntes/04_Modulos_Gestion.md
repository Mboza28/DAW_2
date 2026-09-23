# Sistema de modulos en Node.js y su gestión en proyectos

Históricamente, JavaScript no tenía un sistema de módulos integrado. Todo se ejecutaba en el mismo entorno global, lo que era un caos para proyectos grandes. Para solucionar esto en el lado del servidor, Node.js creó su propio sistema (CommonJS). Años después, JavaScript estandarizó su propio sistema oficial (ECMAScript Modules o ESM).

Hoy en día, Node.js convive con ambos sistemas, y es fundamental entender la diferencia y cómo configurar cada uno a la hora de estructurar el código backend.

## 1. CommonJS (CJS): El estándar clásico de Node.js

Es el sistema de módulos original de Node.js. Si creas un archivo `.js` y lo ejecutas con Node sin configurar nada más, este es el sistema que usará por defecto.

*   **Sintaxis**: Utiliza `require()`para importar y `module.exports` para exportar.
*   **Comportamiento**: La carga es **síncrona**. Node no lee el archivo, lo ejecuta entero y devuelve el objeto exportado antes de pasar a la siguiente línea.


**Exportar en CommonJS**
```javascript
// archivo: mates.js
const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;

// Exportamos un objeto con las funciones
module.exports = {
  sumar,
  restar
};
```

**Importar en CommonJS**

```javascript
// archivo: app.js
const mates = require('./mates.js'); // Importa todo el objeto que hemos creado y exportado para usarlo
const fs = require('fs'); // Módulos nativos de Node no necesitan './'

console.log(mates.sumar(5, 3));
```

---

## 2. ECMAScript Modules (ESM): El estándar moderno