# Introducción a la Arquitectura Web: Cliente, Servidor y Base de Datos

## 1. Separación de Responsabilidades (Modularidad)
En el desarrollo web moderno, las diferentes tecnologías no deben mezclarse en el mismo archivo. Cada capa tiene su propósito y, a menudo, la trabajan personas con perfiles distintos:

*   **HTML / CSS (Capa Estática):** Define la estructura visual y el diseño. Puede crearla un diseñador o maquetador que no necesariamente sabe programar lógica.
*   **JavaScript (Capa Dinámica / Cliente):** Se encarga de dar vida y funcionalidad al HTML estático. Debe ir en ficheros separados (`.js`) para mantener el código modular. Si mezclamos lógica y diseño, el mantenimiento se vuelve un caos.

## 2. Gestión de Eventos en el Cliente
El HTML por sí solo "no hace nada" (un botón de búsqueda no busca por arte de magia). 
La función del código cliente (JavaScript) es estar a la escucha. Cuando el usuario realiza una acción (ej. escribir "suspense" en un buscador y hacer clic), JavaScript **recoge ese evento** y ejecuta una funcionalidad como respuesta.

## 3. LA REGLA DE ORO DE LA SEGURIDAD
**Prohibido conectar el Cliente directamente a la Base de Datos.**
*   **El Problema:** El navegador web es un entorno sobre el que el usuario tiene control total (interacción directa). 
*   **El Riesgo:** Si conectamos JavaScript directamente a nuestra base de datos, estamos abriendo una brecha de seguridad gigantesca ("un agujero enorme"). Cualquiera podría manipular la conexión.
*   *Nota del profesor:* Esto es un fallo suspensivo. Nunca se ataca a la base de datos desde el navegador.

## 4. El Flujo de Comunicación (El Servidor como intermediario)
Para solucionar el problema de seguridad, introducimos el **Servidor** (usando lenguajes como PHP, Node.js, Java Spring, etc.). El servidor es un entorno seguro donde el usuario no tiene acceso directo.

El viaje de los datos (Ejemplo: Buscar películas de suspense):
1.  **Petición (Cliente -> Servidor):** JavaScript recoge la palabra "suspense" y envía una petición al servidor. Los datos de esta petición pueden viajar en la cabecera (headers), en el cuerpo (body) y habitualmente se empaquetan en formato **JSON**.
2.  **Consulta (Servidor -> Base de Datos):** El servidor recibe el JSON, procesa la petición y él sí se conecta de forma segura a la base de datos para ejecutar la consulta (ej. un `SELECT`).
3.  **Respuesta (Base de Datos -> Servidor):** La base de datos devuelve los registros encontrados (rutas de las imágenes, sinopsis, etc.) al servidor.
4.  **Envío al Cliente (Servidor -> Cliente):** El servidor tiene la información, pero **no puede pintar el HTML** porque no tiene acceso al DOM del navegador. Así que empaqueta esos datos (normalmente en JSON otra vez) y se los devuelve a JavaScript.
5.  **Renderizado (Cliente):** JavaScript recibe los datos finales del servidor, busca los elementos en el DOM y "pinta" las películas en la pantalla del usuario.

## 5. Ventajas de la Arquitectura Cliente-Servidor (Desacoplamiento)
El principal beneficio de esta separación es el **trabajo independiente y modular**. 
*   Un equipo puede desarrollar el Cliente (Frontend) y otro el Servidor (Backend) simultáneamente sin pisarse.
*   **El Contrato de Datos:** Lo único que necesitan acordar ambos equipos es "el contrato": qué formato van a tener los datos que se envían y cómo se van a recibir (la estructura del JSON). El resto del código es completamente independiente para cada capa.

## 6. Abstracción de la Base de Datos: Introducción a los ORM
Si mantenemos una arquitectura limpia, cambiar el motor de base de datos en el futuro no debería romper la aplicación. Para llevar esta modularidad al máximo, en el servidor se utilizan los **ORM (Object-Relational Mapping)**.
*   **¿Qué es un ORM?** Es una capa intermedia de software que traduce los registros de la base de datos a objetos de nuestro lenguaje de programación.
*   **Ventaja principal:** En lugar de lanzar sentencias SQL "puras" o "crudas" directamente en el código, le pedimos los datos al ORM mediante métodos (ej. `obtenerPeliculas()`). Si el día de mañana cambiamos de MySQL a PostgreSQL, el código del servidor no se toca; solo se reconfigura el ORM.

## 7. Tecnologías a utilizar (El Stack del Curso)
*   **Cliente (Frontend):** El ecosistema está dominado por **JavaScript** y sus frameworks derivados (aunque existen alternativas como Dart).
*   **Servidor (Backend):** Utilizaremos **Node.js**. Al estar basado en el motor de JavaScript, nos permite aprovechar la sintaxis que ya conocemos de la parte cliente y acelerar el desarrollo del proyecto sin tener que aprender un lenguaje nuevo desde cero.

⚠️ **Advertencia del Profesor (Importante):** 
Si durante la Fase 1 programamos bien, manteniendo la modularidad y evitando el **acoplamiento** (dependencias innecesarias entre partes del código), la conexión en enero será muy sencilla. Si no respetamos la arquitectura limpia y metemos dependencias donde no tocan, la fase de conexión dará fallos constantes y habrá que rehacer mucho trabajo.