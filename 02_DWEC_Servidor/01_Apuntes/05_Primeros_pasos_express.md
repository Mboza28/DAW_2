# Primeros pasos con Express

Express es una libreria de node.js que nos permite el desarrollo de servidores http de forma más rápida y fácil, proporcionando diversas herramientas y métodos para ello. Podemos hacer lo mismo que con http nativo.

## 1. Instalación del paquete de Express

Para instalarlo, nos situamos en la carpeta del proyecto dónde ya hemos iniciado pnpm con `pnpm init` y lanzamos el comando `pnpm install express`. Al finalizar la instalación deberiamos tener en el package.json del proyecto una nueva propiedad denominada "Dependencies" y dentro de esta un objeto con el modulo express y la versión que hemos instalado en el proyecto.

```javascript
 "dependencies": {
    "express": "^5.2.1"
  }
```

---

## 2. Arrancar un servidor http con express

Para arrancar un servidor http simplemente tenemos que importar el módulo de express al javascript y declarar una variable que guarde nuestro express, luego simplemente llamando al método listen el servidor se levanta en el puerto en el que le digamos.

```javascript
const express = require('express');

// Inicializamos la aplicación con express
const app = express();

let PORT = 4004;

app.listen(PORT, () => {
    console.log(`App running in ${PORT}`);
});
```

---

## 3. Añadir rutas get

Para añadir rutas es tan simple como utilizar el método `.get()`. Su sintaxis requiere de un primer parámetro indicando la ruta desde la que estamos llamando en el navegador por ejemplo la raiz ('/') o cualquier otra como ('/usuarios'). Y también una función callback con la request y la response  como parámetros y dentro de esta toda la funcionalidad que le queramos añadir.

Por ejemplo:
```javascript
app.get('/', (request, response) => {
    response.send('Hola desde el servidor');
});
```

## 4. Añadir parámetros a las rutas y acceder a ellos (ruteo paramétrico)

Podemos usar .... RELLENAR EN CASA

## 5. Definición y usos del concepto Middleware

Es la función que se ejecuta cuando hay un ciclo request / response de hecho ese es el evento que lo dispara, por cada petición, colocar una función middleware es útil en determinados casos de seguridad para que se ejecute antes de llegar al ruteo, es decir, antes de que se vaya a ejecutar esa función puede hacer algo para verificar la petición, normalmente son SETS de varias directivas de seguridad, comprobaciones, para evitar procesar o acceder a esa ruta.

Por ejemplo si para todas las rutas queremos que se genere un determinado código utilizaremos un código, por ejemplo unos logs que queremos que se lancen siempre.

## 6. Creación de un Middleware

RELLENAR EN CASA...


## 7. Helmet

Helmet es un Set de Directivas de Seguridad, es decir un paquete que engloba herramientas y métodos para aumentar la seguridad del servidor.
