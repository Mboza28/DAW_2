window.addEventListener("DOMContentLoaded", () => {

    // En la programación funcional el código se centra en qué debe hacer una funcion más que el cómo hacerlo. Se intenta evitar el uso de bucles for y while.
    // Desde la version de JavaScript 5.1 incorporamos métodos de programación funcional, especialmente para trabajar con los Arrays.
    
    // Método filter: Devuelve un nuevo Array con los elementos que cumplen con una condición
    // Sintaxis:    .filter((elemento a filtrar, indice opcional) => { funcion de comparación o busqueda } )

    const arrayNotas = [5.2, 3.9, 6, 9.75, 3, 7.25, 8];

    aprobados = arrayNotas.filter(nota => nota >= 5);
    console.log(aprobados);

    // Método find: Es un método similar al filter pero no devuelve un Array, devuelve el primer elemento que cumple con la condición que le mandamos.
    // Este método se suele utilizar para encontrar datos muy especificos.
    // Sintaxis:     .find((elemento a filtrar) => { funcion de busqueda a cumplir })

    const primerAprobado = arrayNotas.find(nota => nota >= 5);
    console.log(primerAprobado);

    // Método findIndex: Es un método que devuelve la posicion del primer elemento que coincida con el patron de busqueda.
    // Si no encuentra ningún elemento devuelve -1
    // Sintaxis:    .findIndex((elemeto a evaluar) => { funcion de busqueda a cumplir })

    // Método every: Devuelve true si todos los elementos que examina coinciden con el patron de busqueda.
    // Método some: Devuelve true si al menos UNO de los elementos coincide con el patron de busqueda.

    // Método reduce: Devuelve un elemento calculado a partir de los elementos de un array 

    // Metodo Array.from devuelve un array con la transformacion que le pase por parametro o una simple copia del array original.
    // Sirve para hacer un array desde un tipo de dato con estructura similar pero sin acceso a metodos de los arrays.
    // Por ejemplo desde un HTMLCollection 


    const arrayNotasSubidas = Array.from(arrayNotas, nota => nota + (nota * 0.1))
    console.log(arrayNotasSubidas);

    const notas = {
        id: 5,
        info:'Hola'
    }
    
    let notasArray = Array.from(notas);
    console.log(notasArray)

    // Método map: 
    

});