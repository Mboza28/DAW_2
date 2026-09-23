# Creación de un proyecto e inicialización del mismo

## 1. Node como Entorno de Ejecución (Runtime)

Hasta ahora, JavaScript siempre lo ejecutábamos en el navegador (el Cliente) asociándolo a un archivo HTML. 
A partir de este punto, **Node.js nos permite utilizar JavaScript como un lenguaje de servidor puro** (similar a Java, Python o C++). 

Esto significa que podemos escribir scripts, procesar datos y ver los resultados de los `console.log()` directamente en nuestra terminal de comandos, sin necesidad de abrir ningún navegador web.

---

## 2. Inicialización del Proyecto y el `package.json`

Todo proyecto de Node.js necesita un archivo central de configuración llamado **`package.json`**.
Este archivo es el "corazón" del proyecto y se crea al ejecutar `pnpm init`. Aquí se registrarán:

*   Los metadatos del proyecto (nombre, versión, autor).
*   Las dependencias (qué paquetes externos instalamos con PNPM).
*   Scripts personalizados para arrancar o testear la aplicación.

Dentro del `package.json` hay una propiedad clave: `"main": "index.js"`.
*   **¿Qué significa?** Es el **punto de entrada por defecto** de tu aplicación. 
*   **¿Para qué sirve?** Si en el futuro utilizamos herramientas automáticas o subimos el proyecto a un servidor, estas herramientas buscarán automáticamente un archivo llamado `index.js` para arrancar la aplicación, a menos que les especifiquemos lo contrario.

```json
{
  "name": "mi-proyecto-node",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module", 
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

### Chuleta de Comandos Linux: Crear e Inicializar un Proyecto

La mejor práctica no es crear el proyecto "de golpe", sino crear el directorio, entrar en él y entonces inicializarlo. Así mantenemos el control total desde la consola. 
Seguiremos estos pasos basicos para crear proyectos con node y pnpm.

```bash
# 1. Crear el directorio del proyecto
mkdir prueba_pnpm

# 2. Entrar en el directorio
cd prueba_pnpm

# 3. Inicializar el proyecto con PNPM 
# (Este comando genera automáticamente el archivo package.json vacío)
pnpm init
```

Podemos abrir la carpeta directamente en Visual Studio Code ejecutando el comando `code .` en la terminal.

## 3. El punto de Entrada en el package.json (`index.js`)

Como hemos visto al ejecutar `pnpm init`, se genera un archivo `package.json` con la configuración básica del proyecto. Podemos abrir la carpeta directamente en Visual Studio Code ejecutando el comando `code .` en la terminal.

Dentro del `package.json` hay una propiedad clave: `"main": "index.js"`.
*   **¿Qué significa?** Es el **punto de entrada por defecto** de tu aplicación. 
*   **¿Para qué sirve?** Si en el futuro utilizamos herramientas automáticas o subimos el proyecto a un servidor, estas herramientas buscarán automáticamente un archivo llamado `index.js` para arrancar la aplicación, a menos que les especifiquemos lo contrario.

---

## 4. Instalación de Paquetes Locales y Globales

Para instalar librerías de terceros (dependencias), podemos usar la terminal integrada de VS Code o una terminal externa. 

⚠️ **Precaución vital:** Antes de ejecutar un comando de instalación, **asegúrate siempre de que estás dentro de la carpeta exacta donde está tu `package.json`**. Si lo haces desde una carpeta superior o equivocada, el paquete se instalará en el limbo y tu proyecto no lo detectará.

### Instalación Local
Instalaremos una librería para realizar cálculos matemáticos (`mathjs`) como ejemplo:
*   Comando: `pnpm install mathjs`
*   Una vez instalado, si miras tu `package.json`, verás que se ha añadido una nueva sección llamada `"dependencies"` con el nombre del paquete y su versión.

### Instalación Global (Para usar en cualquier proyecto)
Existen herramientas (como `nodemon`, que reinicia el servidor automáticamente al guardar cambios) que vamos a usar en todas las asignaturas y proyectos del curso. 
En lugar de instalarlas proyecto por proyecto, para que todos los proyectos puedan usarla, se instalan de forma global en tu ordenador añadiendo la directiva `-g`:
*   Comando (ejemplo): `pnpm install -g nodemon`

---

## 5. Desinstalación Segura de Paquetes (La Regla de Oro)

Hacemos una prueba instalando el paquete `node-cron` (para programar tareas) y luego lo desinstalamos para enseñar una lección crítica sobre cómo gestionar dependencias.

🛑 **REGLA DE ORO:** **Nunca borres un paquete a mano.**
No borres la línea del `package.json` manualmente ni elimines la carpeta a mano. Si un paquete "A" depende internamente de un paquete "B", borrar "A" a mano puede dejar "B" huérfano o corromper el árbol de dependencias, generando fallos graves semanas después.

✅ **La forma correcta:** Utiliza siempre el comando de desinstalación. Él se encarga de limpiar el `package.json` y eliminar las dependencias en cascada de forma segura.
*   Comando: `pnpm uninstall <nombre-del-paquete>`
*   *Ejemplo:* `pnpm uninstall node-cron`

---

## 6. Creación del primer Script en Node

Una vez configurado el proyecto y las dependencias, creamos nuestro primer archivo JavaScript. 
Aunque el punto de entrada automático es `index.js`, **no estamos obligados a llamarlo así si vamos a ejecutarlo nosotros mismos manualmente**.

Podemos crear un archivo llamado `prueba.js`. Al igual que en Java ejecutabas una clase específica, en Node puedes decirle a la consola qué archivo exacto quieres ejecutar, independientemente de cómo se llame con el comando `node nombreArchivo.js`.

---

## 7. Importación de Módulos (Destructuring) y Ejecución del Script

Para probar el paquete `mathjs` que hemos instalado, creamos un archivo llamado `prueba.js`.

### Importar solo lo necesario
Si importamos la librería entera cargaremos en memoria funciones que no vamos a usar. Para optimizar, utilizamos la sintaxis de **desestructuración** (las llaves `{}`) para importar única y exclusivamente el método que nos interesa, en este caso `evaluate`:

```javascript
// Importamos solo el método 'evaluate' del paquete 'mathjs'
import { evaluate } from 'mathjs'; // Nota: Es buena práctica terminar con punto y coma (;)

// Utilizamos el método pasándole una expresión matemática compleja en formato String
const resultado = evaluate('32 * 7 + 6');

// Imprimimos el resultado
console.log(resultado);
```

### Ejecutar el código en Servidor (Node)
Para ver el resultado de este `console.log`, ya no necesitamos abrir el archivo en un navegador ni usar la herramienta de "Inspeccionar". 
Vamos a la terminal, nos aseguramos de estar en la carpeta del proyecto, y ejecutamos el archivo directamente con Node:

*   Comando: `node prueba.js`
*   *Resultado esperado en consola:* `230`

> **💡 Concepto Clave:** Al ejecutar `node prueba.js`, estás utilizando JavaScript como un lenguaje de backend tradicional (como si fuera el `System.out.println` de Java corriendo en Eclipse o IntelliJ IDEA).

---

## 8. Operaciones de Entrada/Salida (I/O) y Manejo de Ficheros

Aunque hoy en día el intercambio de datos moderno se hace casi exclusivamente mediante APIs y formato JSON, el profesor recalca que **es obligatorio saber leer y escribir ficheros de texto plano (.txt, .csv, etc.)**.

**¿Por qué es necesario hoy en día? El concepto de "Aplicaciones Pegamento"**
En el mundo real (especialmente en la Administración Pública o en grandes empresas con software heredado), te encontrarás con aplicaciones "caja negra":
*   Son programas antiguos que hacen un trabajo específico y funcionan bien.
*   No tienes acceso al código fuente para modificarlas.
*   No tienen bases de datos modernas ni APIs (no puedes conectarlas por JSON).
*   **Su única forma de escupir resultados o recibir configuraciones es a través de ficheros de texto.**

Tu trabajo como desarrollador Backend a menudo será programar o ayudar a manejar los datos de "Aplicaciones Pegamento": scripts en Node.js o Java que leen los ficheros de texto que genera el Programa A línea por línea, extraen los datos, los transforman, y generan un nuevo fichero de texto con el formato exacto que necesita leer el Programa B.
