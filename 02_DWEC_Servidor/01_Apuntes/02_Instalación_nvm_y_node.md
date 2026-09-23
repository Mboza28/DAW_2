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
2. Descargar el instalador ejecutable (el `.exe` que suele venir en los "Releases", como `nvm-setup.exe`).
3. Ejecutar el instalador y dejar **todas las opciones por defecto** dándole a "Siguiente".

### Para Linux (Como el de tu portátil con Linux Mint):
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