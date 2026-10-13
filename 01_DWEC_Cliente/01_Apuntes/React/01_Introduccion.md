# Introducción a React

## 1. ¿Qué es React?

---
## 2. Partes que conforman React


---
## 3. Tipos de componentes

En React existen dos tipos de componentes básicos diferenciados según su estructura, los componentes Funcionales y los componentes de Clase.
Los componentes Funcionales son los más utilizados por su facilidad de implantación.

*  **Componentes Funcionales**:
Un componente Funcional es una funcion Javascript que retorna un elemento de React, escrito en una sintaxis extendida de JavaScript (JSX). Va a ser un elemento de HTML que es lo que queremos representar en nuestra aplicacion.

```javascript
function Saludo(props){
    return <h1> ¡Hola, {props.nombre}!</h1>
}
```

Tenemos la palabra function, como una función normal de Javascript, el nombre del componente va con mayúscula (Saludo), props que son propiedades que se pueden recibir como parametro en los parentesis del componente y retorna una mezcla entre HTML y Javascript (JSX).

- En React, ciertos componentes van a generar otros componentes. Podemos tener componentes anidados dentro de otros componentes, y por tanto enviar ciertos valores para personalizarlos. Los props solo se pueden enviar de componente padre a hijo, no al contrario.

*  **Componente de Clase**: 
Un componente de Clase es una Clase de ES6 que retorna un elemento JSX.

```javascript
class Saludo extends React.Component {
    render() {
        return <h1> ¡Hola, {this.props.nombre}!</h1>
    }
}
```

Su sintaxis es mucho más elaborada que la de un componente funcional. Dentro de la clse tendremos que definir un método `render()` para mostrar ese componente que retornamos.

- La primera caracteristica es que extiende de React.Component.
- Debe tener un método render().
- Puede recibir valores si es necesario pero accediendo desde el this.

## 4. Estado

**El estado es la representación en JavaScript de las propiedades de un componente y sus valores actuales.**
Con propiedades en este concepto no nos referimos a las props de los componentes, si no a la informacion que representa el componente en sí.
Las propiedades del componente tienen unos valores especificos que se podran actualizar en algun momento determinado de la ejecucion de la aplicacion (por ejemplo, si tenemos un boton que cuenta las veces que lo pulsamos, el Estado (State) de ese boton sera el numero de veces que ha sido pulsado y se ira actualizando conforme vayamos interactuando con él. La propiedad "numero de clicks" va a ser parte del Estado del componente).

## 5. ¿Por qué tenemos dos tipos de componentes?

Anteriormente, se usaban componentes de Clase para poder trabajar con "estados" de nuestros componentes. Los componentes de Clase eran más poderosos que los Funcionales porque en los segundos no podiamos trabajar con estados en versiones anteriores a React 16.8.
En las versiones posteriores esto cambio, porque aparecieron los hooks que nos permiten agregarle estado a un componente funcional.

## 6. Hook

**Es una función especial que permite trabajar con estados en componentes funcionales y otros aspectos de React.**
Todo esto se puede hacer sin escribir un componente de clase. Esto nos permite escribir codigo mucho mas conciso y facil de entender.

## 7. Event Listener

**Es una funcion en JavaScript que es ejecutada cuando ocurre un evento especifico, tambien llamados "Event Handler".**
Esta funcion se asigna a un elemento de la aplicacion, diciendole a nuestra funcion que debe ser ejecutada.

## 8. JSX

Es una extension de React para la sintaxis de JavaScript. Nos permite describir en JavaScript como se veran los componentes usando una estructura similar a HTML.
Sus principales ventajes son que la estructura de los componentes es mas facil de visualizar y los errores y advertencias van a ser mas utiles. JSX es opcional, no necesariamente se tiene que utilizar pero nos va a ayudar a escribir codigo mucho mas facil.

**Elementos de JSX**

* Los elementos son las unidades mas pequeñas que podemos crear en React. Definen lo que se ve en pantalla.
* La diferencia entre un elemento y un componente es que el componente está hecho de elementos.
* Una vez que tengamos nuestro componente se ocupa el React DOM de mostrarlo, es un paquete que facilita la interacción y actualización del DOM en React y gracias a él podemos interactuar.
* Cada vez que veamos un elemento en minusculas entre <> estaremos hablando de un elemento, mientras que si el nombre entre <> empieza con letra mayúscula estaremos hablando de un componente.

**Atributos**

Se pueden agregar atributos a los elementos JSX para especificar ciertas caracteristicas (clases, estilos, id...). Pero algunos atributos se van a escribir de forma distinta que en HTML normal. 
Uno de los atributos que cambia su nomenclatura seria el class porque es una palabra reservada de javascript para crear una clase, en JSX sería className.
Para agregar estilos hay cambios importantes. El atributo style acepta un objeto Javascript con propiedades CSS escritas en camelCase.
Por ejemplo en CSS las propiedades background-image, background-color.... en JSX se escriben como backgroundImage, backgroundColor.
Normalmente se sigue creando una hoja CSS externa para los estilos, pero se puede haver de esta forma si se quiere crear esta propiedad de forma dinámica o si queremos definir el estilo directamente en el archivo JavaScript.

```javascript
//codigo de stylo
```
Aunque podemos insertar directamente un estilo en la propia etiqueta JSX, se haria de la siguiente forma.

```javascript
<div style= {{color:'yellow}} >Hola, Mundo</div> // Tiene dos llaves porque una entra en Javascript y la segunda define el Objeto.
```

## 9. Estructura de un componente

Al igual que en HTML, los elementos pueden ser anidados en JSX para formar estructuras mas complejas. Una vez definida la estructura, es importante conocer como renderizarlo. En la estructura inicial del archivo HTML base de nuestra aplicacion tendremos un elemento asi:
<div id="root"></div>
Dentro de este elemento se iran anidando todos los componentes de nuestro proyecto, es como el padre de todos.
