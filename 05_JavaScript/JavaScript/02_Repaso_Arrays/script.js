window.addEventListener("DOMContentLoaded", function(){

    /**
     Los Arrays en Javascript permiten almacenar distintos tipos de datos y 
     longitudes variables
    */
    let miArray = ["manzana", "pera", "uva", 44, false]
    console.log(miArray)

    //FUNCIONES DE LOS ARRAYS
    let arrayFrutas = ["manzana", "pera", "uva"]

    // push agrega el elemento o los elementos al final del array
    arrayFrutas.push("kiwi", "platano")
    console.log(arrayFrutas)

    // pop elimina el ultimo elemento del array y permite guardarlo en una variable
    arrayFrutas.pop()
    let frutaExtraida = arrayFrutas.pop()

    console.log(frutaExtraida)
    console.log(arrayFrutas)

    // shift elimina el primer elemento del array y permite guardarlo como pop
    arrayFrutas.shift()
    console.log(arrayFrutas)

    // unshift añade en la primera posicion del array
    arrayFrutas.unshift("coco")
    console.log(arrayFrutas)

    /** 
    splice permite eliminar elementos de cualquier posicion del array y ademas a su vez agregar 
    elementos en esas posiciones. Uso:
    array.splice(posicion, numeros de elementos a extraer, primer elemento, segundo...)
    si pongo solo la posicion elimina a partir de esa posicion todo lo demas
    si pongo posicion, numero de elementos elimina a partir de esa posicion el numero
    */
    arrayFrutas.splice(1, 1)
    console.log(arrayFrutas)

    arrayFrutas.splice(1, 2, "limon", "naranja", "kiwi")
    console.log(arrayFrutas)

    /* 
    slice devuelve un subarray con los elementos del array original que elegimos pero sin modificar el array original
    array.slice(posicion de empiece, posicion de acabado(no incluida))
    */

    let copiaArrayFrutas = arrayFrutas.slice(1, 3)
    console.log(copiaArrayFrutas)

    // Este metodo nos permite realizar una copia completa de un array usando length, sin parametros o con length
    let copiaArrayCompleta = arrayFrutas.slice(0, arrayFrutas.length)
    console.log(copiaArrayCompleta)

    // El metodo toString concatena todos los elementos de un array y los convierte en un String
    console.log(typeof(arrayFrutas))
    console.log(arrayFrutas.toString())
    console.log(typeof(arrayFrutas.toString()))

    // join hace lo mismo que toString pero permite decir que elemento usar para separar
    // Se utiliza para trabajar con arrays en string y poder volver al array original, al cambiar la coma como caracter diferenciador
    console.log(arrayFrutas.join("@"))
    let arrayArrobas = arrayFrutas.join("@")

    // split permite convertir un string a un array indicando el elemento separador
    let arrayNuevo = arrayArrobas.split("@")
    console.log(arrayNuevo)

    // sort permite ordenar un array por sus elementos (alfabeticamente en string)
    arrayOrdenado = arrayFrutas.sort()
    console.log(arrayOrdenado)

    // concat permite unir arrays en uno solo
    let arrayConcatenado = arrayOrdenado.concat(copiaArrayFrutas)
    console.log(arrayConcatenado)

    // reverse permite darle la vuelta al array 
    console.log(arrayConcatenado.reverse())

    // para ordenar al contrario, mayor a menor, Z a A primero ordeno y le hago reverse
    let arrayOrdenadoReves = arrayConcatenado.sort().reverse()
    console.log(arrayOrdenadoReves)

    /** 
       Funciones para localizar un elemento
         - indexOf nos dice la posicion en la que se sitúa un elemento, si no existe devuelve -1,
           si el elemento se repite solo saca la primera coincidencia que tenga
         - lastIndexOf nos dice la ultima coincidencia que tenga
    */ 
    // 
    console.log(arrayConcatenado.indexOf("kiwi"))
    console.log(arrayConcatenado.lastIndexOf("limon"))

})