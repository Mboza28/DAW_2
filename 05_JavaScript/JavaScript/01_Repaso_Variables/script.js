window.addEventListener("DOMContentLoaded", function(){

    /**
     La diferencia entre VAR y LET es el ambito de uso de cada uno
     VAR es de ambito general, lo ve todo el programa
     LET es de ambito local, lo ve la funcion donde está declarado
    */

    let saludo = "Hola"

    let numero = 4

    console.log(saludo)
    

    /**
     En Javascript podemos utilizar una variable creada con let
     reasignarla con otro tipado distinto sin problema
    */
    numero = "Hola"
    numero = true
    numero = 0.4

    //Para verificar qué tipo tiene una variable utilizamos typeof
    console.log(typeof(numero))

    let frase = "Hola, soy el "
    let numero2 = 7
    //Esto nos deja concatenar tipados distintos en un String
    let fraseCompleta = frase + numero2
    console.log(fraseCompleta)

    let frase2 = "mesa"
    console.log(frase2[1])
})