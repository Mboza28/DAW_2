window.addEventListener("DOMContentLoaded", () => {

    /**
     * El inventario de Geralt de Rivia:
     * 1. Crear objeto con estadisticas base (visionNocturna, toxicidad) y pociones que tiene.
     * 2. Al consumir una pocion 'Gato' su vision nocturna pasa a true y su toxicidad aumenta.
     * 3. Crear un nuevo objeto de forma inmutable que actualice estos valores.
     */

    const inventarioGeralt = {
        nombre: 'Geralt',
        hp: 100,
        visionNocturna: false,
        toxicidad: 10,
        pociones:{
            gato: 3,
            mielBlanca: 2,
            buhoReal: 5
        }
    }

    const geraltUp = {
        ...inventarioGeralt,
        visionNocturna: true,
        toxicidad: inventarioGeralt.toxicidad * 1.5,
        pociones:{
            ...inventarioGeralt.pociones,
            gato: inventarioGeralt.pociones.gato - 1,
        }
    }

    console.log(inventarioGeralt);
    console.log(geraltUp);

    /**
     * El Multiverso de Spider-Man
     * 1. Crear un objeto peterParker con propiedades anidadas a su traje
     * 2. Crea una deep copy de Spider-Man que sea Noir cambiando su nombre a peter parker (tierra...) y actualizando propiedades internas color negro y defensa 75
     */

    const peterParker = {
        nombre: 'Peter parker',
        traje:{
            color: 'Rojo/Azul',
            defensa: 50
        }
    }

    const spiderNoir = {
        ...peterParker,
        nombre: 'Peter Parker (Tierra-90214)',
        traje:{
            ...peterParker.traje,
            color: 'Negro',
            defensa: 75
        }
    }

    console.log(peterParker);
    console.log(spiderNoir);

    /**
     * La orden 66
     * 1. Array con varios Jedi, cada Jedi es un objeto con propiedades nombre y bando
     * 2. Utilizar el .map() junto con spread para crear un array donde solo anakin skywalker cambie su bando a oscuro y añada la propiedad titulo "lord sith"
     */

    const equipoJedi = [
        {
            nombre: 'Anakin Skywalker',
            bando: 'Luz'
        },
        {
            nombre: 'Obi-Wan',
            bando: 'Luz'
        },
        {
            nombre: 'Yoda',
            bando: 'Luz'
        }
    ]
    
    const titulo = {
        titulo: 'Lord Sith'
    }

    function cambiarBando(equipoJedi){
            const equipoLuz = equipoJedi.map((jedi) => {
                if(jedi.nombre === 'Anakin Skywalker'){
                    return {
                        ...jedi,
                        ...titulo,
                        bando: 'Oscuro',
                    }
                } else {
                    return {...jedi};
                }
            });
            console.log(equipoJedi);
            console.log(equipoLuz);
        }

        cambiarBando(equipoJedi)

    







});