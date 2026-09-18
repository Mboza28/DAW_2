window.addEventListener("DOMContentLoaded", () => {

    /** 
        Guarda en un array una lista de frutas con manzanas, peras, plátanos, 
        kiwis, sandía y melón. Elimina las manzanas. Añade detrás del melón uvas 
        y cerezas. Quita los kiwis y pon en su lugar piña y coco. Elimina finalmente 
        la sandía. 
    */

    let arrayFrutas = ["manzanas", "peras", "platanos", "kiwis", "sandia", "melon"]
    arrayFrutas.shift()
    arrayFrutas.push("uvas", "cerezas")
    arrayFrutas.splice(2, 1, "piña", "coco")
    arrayFrutas.splice(4,1)
    console.log(arrayFrutas)

    /**
        Haz una función que ordene las notas de un array pasado como parámetro. 
        Si le pasamos [4,8,3,10,5] nos tiene que devolver [3,4,5,8,10]. 
        Imprímelo por consola una vez hecho.
    */

    const ordenarArray = (array) => {
        let arrayOrdenado = array.sort((a,b) => a - b)
        console.log(arrayOrdenado)
    }
    let arrayNumerico = [4,8,3,10,5]
    ordenarArray(arrayNumerico)


    /**
        Dado un array con los días de la semana, obtén todos los días que empiezan por la letra ‘M’. 
        Hacerlo primero con un bucle for normal.
    */

    let arraySemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
    let diasConM = [];
    for (let i = 0; i < arraySemana.length; i++) {
        if(arraySemana[i].startsWith("M")){
            diasConM.push(arraySemana[i])
        }
    }
    console.log(diasConM)

    /**
        Dado el array anterior, obtener la posición en el array del primer día que empieza por M.
     */
    for (let i = 0; i < arraySemana.length; i++) {
        if(arraySemana[i].startsWith("M")){
            console.log(i)
            break
        }
    }

    /**
        Dado el mismo array, indicar si algún día empieza por la letra ‘S’ y si todos los días 
        acaban por la letra ‘s’
     */
    
    let empiezaPorS = false
    let terminaPorS = true
    for (let i = 0; i < arraySemana.length; i++) {
        
        if(arraySemana[i].startsWith("S")){
            empiezaPorS = true
        }
        if(!arraySemana[i].endsWith("s")){
            terminaPorS = false
        }        
    }
    console.log(`Es ${empiezaPorS} que al menos algun dia empiece por S`)
    console.log(`Es ${terminaPorS} que todos los dias terminen en S`)

    /**
        Con el mismo array, crea un array con los mismos días pero con todas las letras en mayúsculas
     */

    let semanaString = arraySemana.join("@")
    let semanaStringMayus = semanaString.toUpperCase()
    let arrayMayusculo = semanaStringMayus.split("@")
    console.log(arrayMayusculo)

})

