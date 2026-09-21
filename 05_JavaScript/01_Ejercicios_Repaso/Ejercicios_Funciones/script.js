window.addEventListener("DOMContentLoaded", () => {


    // Las funciones en Javascript son bloques de codigo reutilizables
    // Pueden ser funciones anónimas que son las que no llevan nombre, estas se ejecutan una única vez cuando lanzamos la función pero
    // no podemos reutilizarla.

    function saludar(){
        console.log("Hola!")
    }

    saludar()

    // Puede recibir parámetros y ejecutar un bloque de código sin devolver nada o devolviendo un resultado mediante return.
    let saludo = "Hola"
    function saludar2(saludo){
        let saludoCompleto = saludo + " Miguel!"
        return saludoCompleto
    }
    console.log(saludar2(saludo))

    // Las funciones tienen su propio alcance de variables o scope con la definicion de variables con let, si la defines dentro de una funcion
    // no podras utilizarla fuera, a no ser que la retornes
    // Se puede pasar por argumento una variable o un "por defecto" con la siguiente sintaxis
    
    function saludar3(nombre = "Miguel"){
        console.log("Buenos dias " + nombre)
    }

    //Si no le pasas argumento, utilizará el valor por defecto y si le pasas un argumento lo utilizará
    saludar3()
    saludar3("Lu")

    // A partir de EcmaScript 6 aparecieron las funciones flecha, éstas se pueden guardar en una variable, siempre en un CONST, si no la vamos
    // a reutilizar podemos ni siquiera guardarla en una variable, se ejecutará una vez.
    // Ademas si únicamente tiene una linea de codigo, podemos obviar las llaves {} e incluso el return si esque retornara algo.

    function sumar(numero){
        return numero + numero
    }

    console.log(sumar(7))

    const suma = (numero) => numero + numero

    console.log(suma(10))

    // Existen otro tipo de funciones que se denominan CALLBACK, que son funciones que se pasan como argumento a otra función.

    // Callback en elementos del DOM

    const contador = document.getElementById("contador")
    const boton = document.getElementById("btn")
    boton.addEventListener("click", () => {
        console.log("Me han pulsado")
    })
    
    // Callback en temporizadores

    setTimeout(() => {
        console.log("Han pasado 4 segundos")
    }, 4000)

    // Callback en arrays

    const numeros = [1,2,3,4,5]

    const dobles = numeros.map(numero => numero * 2)
    console.log(dobles)

    // En las funciones, cuando las llamamos, si incluimos los parentesis se ejecutará instantaneamente, en
    // un evento por ejemplo que tengamos que esperar, debemos pasarla SIN parentesis para que espere a que ocurra
    // el evento y no esté ejecutandose constantemente.
})