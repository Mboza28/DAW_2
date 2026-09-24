# Instalación gestor de versiones y gestor de paquetes (NVM y PNPM)

## 1. Configuración del Entorno: El combo NVM + PNPM

Para cubrir el 90% de los estándares del desarrollo web moderno sin complicaciones técnicas innecesarias, en el curso utilizaremos la siguiente combinación de herramientas:

*   **NVM (Node Version Manager):** Se encargará **exclusivamente de gestionar las versiones de Node.js**. Nos permite instalar varias versiones en el equipo y cambiar de una a otra fácilmente. En la consola, la versión que estemos utilizando en ese momento aparecerá marcada con un asterisco (`*`). Al instalar paquetes, estos se asociarán a la versión de Node que tengamos activa.
*   **PNPM:** Se encargará **exclusivamente de la gestión de paquetes**. *(Nota: Aunque teóricamente PNPM puede gestionar versiones de Node activando "Corepack", esto genera mucho embrollo, por lo que es mejor separar responsabilidades usando NVM).*

---

## 2. Gestores de Versiones de Node (Version Managers - NVM)
Ciertos frameworks de desarrollo (como Angular) exigen trabajar con una versión muy específica de Node.js. Para ello tenemos gestores de versiones.

*   **El Problema de la instalación tradicional:** Si instalas Node.js de forma normal (descargando el ejecutable de su web), te atas a una única versión. Si otro proyecto requiere una versión distinta, cambiarla generará conflictos en tu sistema.
*   **La Solución:** Antes de empezar, **desinstalaremos el Node tradicional** y utilizaremos un **Gestor de Versiones** (como NVM). Esta herramienta permite tener múltiples versiones de Node instaladas en el ordenador al mismo tiempo y cambiar entre ellas según lo que pida cada proyecto, sin generar conflictos.

---

## 3. Gestores de Paquetes: NPM vs PNPM
Para instalar librerías y código de terceros, Node utiliza gestores de paquetes. Permiten ahorrar días de trabajo usando código ya testeado, pero hay que saber gestionarlos.

### NPM (Node Package Manager)
Es el gestor de paquetes que viene instalado por defecto con Node.
*   **El mito de la seguridad:** Se suele decir que NPM es inseguro o vulnerable, pero el problema no es la herramienta, sino la **mala configuración**. En un entorno laboral es responsabilidad del Jefe de Proyecto configurar los repositorios y filtros para evitar que los desarrolladores instalen paquetes no revisados que contengan vulnerabilidades.

### PNPM (Performant NPM)
Es una alternativa moderna a NPM que ha ganado mucha popularidad recientemente, y **será la herramienta principal en este curso**.
*   **Ventaja principal (Almacenamiento):** Mientras que NPM descarga físicamente todos los paquetes dentro de la carpeta de cada proyecto (ocupando muchísimo espacio en disco), PNPM utiliza un sistema centralizado de enlaces (grafos). Descarga el paquete una sola vez en tu disco duro y todos tus proyectos apuntan a él, **optimizando enormemente el almacenamiento**.
*   **Seguridad y Configuración:** Básicamente, PNPM actúa como un NPM que ya viene configurado de forma estricta y segura desde el principio.

---

## 4. Instalación de NVM (Primeros pasos)

El primer paso del curso es tener NVM en nuestra máquina. El proceso varía según el sistema operativo:

### Para Windows:
1. Buscar en internet **"nvm-windows"** (el repositorio oficial en GitHub de *coreybutler*) o entrar a https://www.nvmnode.com/es/guide/download.html .
2. Descargar el instalador ejecutable (el `.exe` que suele venir en los "Releases", como `nvm-setup.exe` en el caso de GitHub).
3. Ejecutar el instalador y dejar **todas las opciones por defecto** dándole a "Siguiente".

### Para Linux:
1. Hay que buscar el script de instalación oficial (`nvm.sh` a través de `curl` o `wget` en el repositorio oficial de GitHub de nvm).
2. Descargar el script, darle permisos de ejecución si es necesario, y ejecutarlo en la terminal. Dejar las opciones por defecto.


Tambien podemos directamente ejecutar el siguiente comando:

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash`

---

## 5. Verificación de la Instalación (¡Cuidado con la terminal!)

Un error de novato muy común tras instalar programas de consola es intentar usarlos inmediatamente en la misma ventana que estaba abierta.

1.  **Regla de oro:** Una vez finalice la instalación de NVM, **cierra la terminal (CMD / Bash) que tuvieras abierta**.
2.  Abre una terminal nueva. Esto es obligatorio para que el sistema operativo refresque y reconozca las nuevas variables de entorno.
3.  Escribe el comando: `nvm -v` (o `nvm --version`). 
    *   Si te devuelve el número de versión (ej. `1.1.12`), la instalación ha sido un éxito.
4.  **Aclaración importante:** En este punto, **tienes el gestor (NVM), pero TODAVÍA NO tienes Node.js ni NPM/PNPM instalados**. Si ejecutas `node -v` te dará error porque NVM está vacío y aún no le hemos dicho qué versión de Node debe descargar.

---

## 6. Instalar node y gestión de versiones de Node con NVM (Flujo de Trabajo)

Antes de instalar ninguna versión a través de NVM, existe una **REGLA CERO absoluta**: Si ya tenías instalado Node.js en tu ordenador de forma tradicional (mediante el instalador de su web), **debes desinstalarlo por completo y reiniciar el equipo**. Si no lo haces, NVM entrará en conflicto con la instalación antigua.

### Chuleta de Comandos Básicos de NVM

Una vez con el sistema limpio y NVM instalado, este es el flujo para instalar y gestionar versiones:

**1. Ver qué versiones existen para descargar**
*   Comando: `nvm list available`
*   *Nota:* Te mostrará una lista con las versiones LTS (Soporte a Largo Plazo, las más estables) y las Current (las más nuevas). Si necesitas una versión muy antigua y no aparece en la lista, puedes consultar el archivo histórico en la web oficial de Node.js.

**2. Instalar una versión específica**
*   Comando: `nvm install <version>`
*   *Ejemplo Actual:* `nvm install 26.1.0`
*   *Ejemplo LTS:* `nvm install 24.2.1`
*   Con esto, la versión se descarga en tu equipo, pero **ojo: no se activa automáticamente** (aunque en Windows la primera que instalas a veces se autoactiva).

**3. Ver las versiones que tienes instaladas en tu equipo**
*   Comando: `nvm list` (o `nvm ls`)
*   Te mostrará una lista con las versiones que has descargado. La versión que está activa en este momento aparecerá marcada con un asterisco (`*`).

**4. Activar o cambiar de versión (El comando más importante)**
*   Comando: `nvm use <version>`
*   *Ejemplo:* `nvm use 24.2.1`
*   Esto cambia la versión global de Node en tu ordenador al instante.

**5. Comprobar que el cambio ha funcionado**
*   Comando: `node -v`
*   Te devolverá la versión que acabas de activar.

---

## 7. ¿Qué incluye la instalación de NVM?

Cuando haces un `nvm install` de una versión concreta de Node.js, **no solo se instala Node**. 
Automáticamente, NVM descarga e instala el gestor de paquetes **NPM** correspondiente a esa versión exacta de Node. 

Por lo tanto, si ejecutas `npm -v`, verás que ya tienes el gestor de paquetes listo para funcionar, sin haber tenido que instalarlo por separado.

---

## 8. ¿Por qué es tan vital este flujo de trabajo? (El Caso de Uso)
El profesor pone un ejemplo muy real de lo que ocurre en las empresas:
Imagina que descargas el repositorio de una aplicación web antigua hecha en **Angular 16**. Ese framework fue construido para funcionar con una versión muy específica de Node.js. 

Si intentas arrancar ese proyecto (ej. `npm start`) utilizando tu versión nuevecita `26.1.0`, el código va a romper por todas partes porque hay métodos obsoletos o incompatibles. Gracias a NVM, simplemente haces `nvm use 18.x.x` (la versión que pida el proyecto), arrancas la aplicación, y cuando termines, vuelves a tu versión actual.

---

## 9. Instalación de PNPM (La forma correcta)

Aunque NVM nos instala NPM por defecto y podríamos usarlo para empezar a trabajar, el estándar del curso será **PNPM**.

Existen dos formas principales de instalar PNPM, pero el profesor hace una advertencia importante:
*   **❌ Forma no recomendada (a través de NPM):** Hacer `npm install -g pnpm` es tentador, pero asocia esa instalación de PNPM a la versión de Node que tengas activa en ese momento, lo que puede dar problemas de compatibilidad al cambiar de versión en el futuro.
*   **✅ Forma recomendada (Script independiente):** Utilizar el script de instalación nativo por consola (`curl` o `wget` en Linux/Mac, o el script de PowerShell en Windows). Al instalarlo de forma independiente, no se casa con ninguna versión concreta de Node.

* Para Windows abrimos una PowerShell e introducimos el siguiente comando: `Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression`

* Para Linux en la terminal ejecutamos el siguiente comando: `curl -fsSL https://get.pnpm.io/install.sh | sh -`

**Nota sobre versiones:**
Durante el curso se trabajará principalmente con la **versión 12 de PNPM**, ya que da cobertura a la inmensa mayoría de desarrollos modernos (hasta Node v18). Si en el futuro un proyecto requiere una versión anterior, PNPM permite reconfigurarlo directamente desde el archivo `package.json` del proyecto y se autodescargará la versión correcta.

*Recuerda: Tras instalar PNPM, es obligatorio cerrar la terminal y abrir una nueva para que el comando `pnpm -v` funcione.*
