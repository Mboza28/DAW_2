# Teoría del DOM (Document Object Model)

## 1. ¿Qué es el DOM?
El **DOM** (Modelo de Objetos del Documento) es una interfaz de programación (API) que los navegadores web proporcionan para que lenguajes como JavaScript puedan interactuar con documentos HTML y XML.

Cuando el navegador lee tu archivo HTML, no lo usa directamente como texto. Lo analiza (parsea) y lo convierte en una estructura de datos en la memoria RAM del ordenador. Esa estructura, orientada a objetos, es el DOM. 

*   **Document:** Representa la página web entera.
*   **Object:** Cada etiqueta, atributo o texto se convierte en un "objeto" que tiene propiedades y métodos.
*   **Model:** Es la representación estructurada (el "mapa") de esos objetos.

---

## 2. La Estructura de Árbol (DOM Tree)
El DOM se organiza con una estructura jerárquica de árbol invertido. 

*   El objeto global principal en el navegador es `window` (que representa la pestaña/ventana).
*   Dentro de `window` vive el `document` (la raíz del DOM).
*   A partir de ahí, las etiquetas se ramifican. Por ejemplo, `<html>` es el elemento raíz, que se divide en `<head>` y `<body>`, y estos a su vez en más elementos.

```text
Document
 └── <html>
      ├── <head>
      │    ├── <title>
      │    │    └── "Mi Página" (Nodo de texto)
      │    └── <meta>
      └── <body>
           ├── <h1>
           │    └── "Hola Mundo" (Nodo de texto)
           └── <p>
```

---

## 3. Tipos de Nodos
En el DOM, **todo es un nodo**, pero no todos los nodos son etiquetas HTML. Existen varios tipos, siendo los 4 más importantes:

1.  **Document Node (Tipo 9):** El nodo raíz absoluto (`document`).
2.  **Element Node (Tipo 1):** Las etiquetas HTML puras (`<div>`, `<p>`, `<a>`). Son con los que más trabajamos.
3.  **Text Node (Tipo 3):** El texto real que va dentro de las etiquetas. ¡Ojo! **Los saltos de línea y espacios en blanco en el código HTML también generan Nodos de Texto invisibles**.
4.  **Comment Node (Tipo 8):** Los comentarios en el HTML (`<!-- comentario -->`) también son nodos en el árbol.

> **💡 Relación con la práctica:** Por esto existe `.firstChild` y `.firstElementChild`. El primero te puede devolver un "Text Node" (un salto de línea en tu código), mientras que el segundo te garantiza que te devuelve un "Element Node" (una etiqueta HTML).

---

## 4. El DOM no es exactamente tu código HTML
Es un error común pensar que el código fuente HTML que escribes es el DOM. Hay tres diferencias clave:

1.  **Errores corregidos:** Si escribes HTML mal formado (ej. abres un `<table>` pero olvidas el `<tbody>`), el navegador lo corrige automáticamente al construir el DOM. El DOM tendrá el `<tbody>` aunque tu archivo HTML no.
2.  **Modificaciones con JavaScript:** Si usas `document.createElement()` y lo inyectas, el DOM cambia instantáneamente y la pantalla se actualiza, pero tu archivo `.html` original en el servidor sigue intacto.
3.  **Inspeccionar vs Ver Código Fuente:** 
    *   *Clic derecho -> Ver código fuente de la página:* Muestra tu archivo HTML original.
    *   *Clic derecho -> Inspeccionar:* Muestra el DOM actual en tiempo real (con todas las modificaciones hechas por JS).

---

## 5. El BOM vs El DOM
No hay que confundirlos, aunque trabajen juntos:
*   **DOM (Document Object Model):** Controla el contenido de la página web (el `document`).
*   **BOM (Browser Object Model):** Controla el navegador en sí (el `window`). Con el BOM interactuamos con el historial, el ancho de la pantalla, la geolocalización, el `localStorage` o alertas como `alert()` y `prompt()`.