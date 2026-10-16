# Introducción a React

## 1. ¿Qué es React?

React es una biblioteca (library) de JavaScript de código abierto, mantenida principalmente por Meta (Facebook), diseñada para construir interfaces de usuario (UI) interactivas, eficientes y escalables.

A diferencia de frameworks completos como Angular (que te imponen una estructura y herramientas específicas), React se centra exclusivamente en la capa de la vista (la "V" en el patrón MVC).
Sus características principales son:

*   **Declarativo:** En lugar de manipular el DOM paso a paso (imperativo), le dices a React cómo quieres que se vea la interfaz para un estado concreto, y React se encarga de actualizar el DOM para que coincida.

*   **Basado en Componentes:** Permite construir UIs complejas a partir de piezas de código pequeñas, aisladas y reutilizables.

*   **Unidireccional (One-way data flow):** El flujo de datos va siempre en una única dirección (de padre a hijo), lo que hace que la aplicación sea más predecible y fácil de debugear.

---

## 2. Partes que conforman React

Para entender el ecosistema básico de React, hay que diferenciar sus piezas fundamentales:

*   **React Core (react):** Es la librería principal que contiene la lógica para definir componentes, estado, props y hooks. No sabe nada del entorno donde se va a ejecutar (navegador, móvil, etc.).

*   **React DOM (react-dom):** Es la "fijación" (binding) de React para el navegador. Toma los componentes creados con el core y se encarga de insertarlos y actualizarlos en el DOM real del navegador.

*   **Virtual DOM:** Es una representación en memoria (un árbol de objetos JavaScript) del DOM real. Cuando el estado de un componente cambia, React crea un nuevo Virtual DOM, lo compara con el anterior (proceso llamado Reconciliation o Reconciliación) y calcula la forma más eficiente de actualizar solo las partes del DOM real que han cambiado. Esto es lo que hace a React tan rápido.

*   **JSX:** La sintaxis extendida que permite escribir código similar a HTML dentro de JavaScript.

---

## 3. Tipos de componentes

En React existen dos tipos de componentes básicos diferenciados según su estructura, los componentes Funcionales y los componentes de Clase.
Los componentes Funcionales son los más utilizados hoy en día por su facilidad de implantación y limpieza de código.
Hoy en día es muy común escribirlos utilizando Arrow Functions (funciones flecha) de ES6, ya que permiten un código más limpio e incluso retornos implícitos.

*  **Componentes Funcionales**:
Un componente Funcional es una funcion Javascript que retorna un elemento de React, escrito en una sintaxis extendida de JavaScript (JSX). Va a ser un elemento de HTML que es lo que queremos representar en nuestra aplicacion.

```javascript
function Saludo(props){
    return <h1> ¡Hola, {props.nombre}!</h1>
}

//Version Arrow Function
const Saludo = ({ nombre }) => { // Usamos destructuring para extraer 'nombre' de las props directamente
    return <h1>¡Hola, {nombre}!</h1>;
}
```

Tenemos la palabra reservada de función (o función flecha), el nombre del componente que va con PascalCase (Mayúscula la primera, fundamental para que React no lo confunda con una etiqueta HTML (Saludo)), props que son propiedades que se pueden recibir como parámetro en los parentesis del componente, y retorna una mezcla entre HTML y Javascript (JSX).

**En React**, los componentes generan otros componentes (composición). Podemos tener componentes anidados dentro de otros componentes. Los props (propiedades) son de solo lectura (read-only) y solo se pueden enviar de componente padre a hijo (top-down), nunca al contrario.

*  **Componente de Clase**: 
Un componente de Clase es una Clase de ES6 que retorna un elemento JSX. Actualmente se consideran "Legacy" (herencia del pasado) y no se recomienda crear nuevos componentes así, pero es vital entenderlos para mantener código antiguo.

```javascript
class Saludo extends React.Component {
    render() {
        return <h1> ¡Hola, {this.props.nombre}!</h1>
    }
}
```

Su sintaxis es mucho más elaborada que la de un componente funcional. Dentro de la clse tendremos que definir un método `render()` para mostrar ese componente que retornamos.

- Extiende de React.Component.
- Debe tener obligatoriamente el método render().
- Puede recibir valores si es necesario pero el acceso se hace a través de la instancia (this.props).
- Requerían manejar el contexto de this (bindear métodos) lo cual solía ser una fuente común de bugs.

## 4. Estado (State)

**El estado es la representación en JavaScript de las propiedades de un componente y sus valores actuales.**
Con propiedades en este concepto no nos referimos a las props de los componentes, (que vienen de fuera y no se pueden modificar), sino a la información privada y local que gestiona el propio componente.

Concepto Clave - La Inmutabilidad: El estado en React es inmutable. Nunca debes modificar el estado directamente (ej: estado = nuevoValor). Siempre debes usar la función actualizadora que te proporciona React. Al usar la función actualizadora, React detecta el cambio y lanza una re-renderización del componente para actualizar la interfaz.

Las propiedades del componente tienen unos valores especificos que se podran actualizar en algun momento determinado de la ejecucion de la aplicacion (por ejemplo, si tenemos un boton que cuenta las veces que lo pulsamos, el Estado (State) de ese boton es el "numero de clicks" y se ira actualizando conforme vayamos interactuando con él. La propiedad "numero de clicks" va a ser parte del Estado del componente y React re-renderiza el botón mostrando el nuevo número).

## 5. ¿Por qué tenemos dos tipos de componentes?

Anteriormente, se usaban componentes de Clase obligatoriamente para poder trabajar con "estados" y "ciclos de vida" (métodos que se ejecutan cuando el componente se monta, se actualiza o se destruye). Los componentes de Clase eran más poderosos porque en los Funcionales no podiamos tener estados en versiones anteriores a React 16.8 (Se les llamaba Stateless).

Esto cambió radicalmente con la aparición de los Hooks, que nos permiten "enganchar" (hook) el estado y el ciclo de vida a un componente funcional. Esto supuso un cambio de paradigma hacia la programación funcional, eliminando la complejidad del this y la estructura verbosa de las clases.

## 6. Hook

**Es una función especial nativa de React que permite trabajar con estados y ciclos de vida en componentes funcionales.**

Esto nos permite escribir codigo mucho mas conciso y facil de entender.

Existen reglas estrictas para los Hooks:

1. Solo se pueden llamar en el nivel superior del componente (no dentro de bucles, condicionales o funciones anidadas).
2. Solo se pueden llamar desde componentes funcionales de React o desde "Custom Hooks" (Hooks personalizados).

Los dos Hooks más importantes son:

*   **useState:** Para declarar variables de estado. (Ej: const [contador, setContador] = useState(0);)
*   **useEffect:** Para manejar efectos secundarios (llamadas a APIs como fetch/axios, suscripciones, manipulación manual del DOM). Sustituye a los ciclos de vida de las clases.

## 7. Event Listener

**Es una funcion en JavaScript que es ejecutada cuando ocurre un evento especifico, tambien llamados "Event Handler".**
En React, el manejo de eventos tiene dos diferencias cruciales con el HTML tradicional:

1. Se nombran usando camelCase en lugar de minúsculas (ej: `onClick` en lugar de `onclick`, `onChange` en lugar de `onchange`).
2. Se pasa una referencia a la función (o una función flecha), no un string ni la ejecución de la función.

Incorrecto: `<button onClick={miFuncion()}>` (Esto ejecutaría la función instantáneamente al renderizar).

Correcto: `<button onClick={miFuncion}>` o `<button onClick={() => miFuncion(parametro)}>`

Además, React usa "Synthetic Events" (Eventos Sintéticos), que son envoltorios (wrappers) alrededor de los eventos nativos del navegador para asegurar que funcionen exactamente igual en todos los navegadores (cross-browser compatibility).

## 8. JSX

Es una extension de React para la sintaxis de JavaScript (JavaScript XML). Nos permite describir en JavaScript como se veran los componentes usando una estructura similar a HTML. Bajo el capó, cada etiqueta JSX se transpila (usualmente mediante herramientas como Babel o Vite) a llamadas de JavaScript puro React.createElement().

Sus principales ventajes son que la estructura de los componentes es mas facil de visualizar y los errores y advertencias van a ser mas útiles. JSX es opcional, no necesariamente se tiene que utilizar pero nos va a ayudar a escribir codigo mucho mas facil.

**Elementos de JSX**

* Los elementos son las unidades mas pequeñas que podemos crear en React. Definen lo que se ve en pantalla.
* La diferencia entre un elemento y un componente es que el componente está hecho de elementos, los "fabrica".
* Una vez que tengamos nuestro componente el React DOM se ocupa de mostrarlo, es un paquete que facilita la interacción y actualización del DOM en React.
* Cada vez que veamos un elemento en minusculas entre <> estaremos hablando de un elemento, mientras que si el nombre entre <> empieza con letra mayúscula estaremos hablando de un componente.

Regla de Oro de JSX: Un componente siempre debe retornar un único elemento padre. Si necesitas devolver varios elementos al mismo nivel, debes envolverlos en un contenedor o usar Fragmentos (<> ... </>) para no ensuciar el DOM con `<div>` innecesarios.

**Atributos**

Se pueden agregar atributos a los elementos JSX para especificar ciertas caracteristicas (clases, estilos, id...). Pero algunos atributos se escriben de forma distinta que en HTML normal. 
Uno de los atributos que cambia su nomenclatura seria el class porque es una palabra reservada de javascript para crear una clase, en JSX sería className.
Para agregar estilos hay cambios importantes. El atributo style acepta un objeto Javascript con propiedades CSS escritas en camelCase.
Por ejemplo en CSS las propiedades background-image, background-color.... en JSX se escriben como backgroundImage, backgroundColor.
Normalmente se sigue creando una hoja CSS externa para los estilos, pero se puede haver de esta forma si se quiere crear esta propiedad de forma dinámica o si queremos definir el estilo directamente en el archivo JavaScript.

```javascript
//codigo de stylo
const estilosDelBoton = {
    backgroundColor: '#3498db',
    borderRadius: '5px',
    padding: '10px 20px',
    color: 'white'
};

const Boton = () => {
    return <button style={estilosDelBoton}>Click aquí</button>;
}
```
Aunque podemos insertar directamente un estilo en la propia etiqueta JSX, se haria de la siguiente forma.

```javascript
<div style= {{color:'yellow}} >Hola, Mundo</div> // Tiene dos llaves porque una entra en Javascript y la segunda define el Objeto.
```

## 9. Estructura de un componente (y de la aplicación)

Al igual que en HTML, los elementos pueden ser anidados en JSX para formar estructuras mas complejas. Una vez definida la estructura, es importante conocer como renderizarlo. En la estructura inicial del archivo HTML base de nuestra aplicacion tendremos un elemento asi:

`<div id="root"></div>`

Dentro de este elemento se irán inyectando todos los componentes. En las versiones modernas de React (React 18+), la inicialización que conecta ese div con tu componente principal (normalmente llamado `<App/>`) se hace en el archivo de entrada de Javascript (suele ser main.jsx o index.js) de esta manera:

```javascript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Seleccionamos el div con id "root" del HTML y creamos la raíz de React
const root = createRoot(document.getElementById('root'));

// Renderizamos nuestro componente principal <App /> dentro del root
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```