
/**
    En JavaScript un objeto se puede definir como cualquier otra variable, es decir, no hay que definir que sea un objeto, se utilizan const y let para 
    declararlos y similar a Java se utiliza la notación new Object(); para inicializarla aunque no se recomienda hacerlo de esta manera.
    Se utiliza la creación literal del objeto al inicializarlo creandolo mediante notación JSON. (Antiguamente se hacía con XML)

 */

    window.addEventListener("DOMContentLoaded", () => {

        // Formato NO recomendado
        const pookemon = new Object();

        // Formas de crear propiedades en un Object, con el punto (.) o con los corchetes.
        pookemon.nombre = 'Pikachu';
        pookemon['tipo'] = 'Agua';
        pookemon.numero = 25;
        console.log(pookemon);
        
        // FORMATO RECOMENDADO
        const pokemon = {
            nombre: 'Raichu',
            tipo: 'Electrico',
            numero: 26,
            inventario:{
                ataque1: 'Rayo',
                ataque2: 'Electrocucion',
                pociones:{
                    salud: 5,
                    mana: 4
                }
            }
        }
        console.log(pokemon);
        
        // Para acceder a las propiedades accedemos con el punto (.) o con las llaves de array [].
        pokemon.numero = 54;
        pokemon.nombre = 'Psyduck';

        // Si accedemos a una propiedad que no existe aún en el objeto, nos devolverá "undefined" lo que nos da
        // juego para hacer condicionales de si existe o no, darle un valor... 
        console.log(pokemon.tamanio);

        // Javascript lanza errores cuando intentamos acceder a propiedades de una propiedad que ya de por si 
        // no existe.
        console.log(pokemon.tamanio && pokemon.tamanio.bebe);

        // A partir de EcmaScript 11 esta comprobacion la podemos hacer con una especie de ternaria incluyendo
        // interrogaciones donde creamos que pueda no existir una propiedad para comprobar si existe
        console.log(pokemon.tamanio?.bebe);

        // Se puede utilizar el for-in para recorrer el objeto e ir sacando sus claves y valores por consola.
        for (let propiedad in pokemon){
            console.log(propiedad + ": " + pokemon[propiedad]);
        }
        
        // Podemos añadir funciones en objetos, como una propiedad más, importante utilizar FUNCTION() y no las 
        // funciones flechas sobretodo si queremos acceder a propiedades del mismo objeto con "this" porque las
        // funciones flecha no tienen acceso al this.
        const pokemon2 = {
            nombre: 'Psyduck',
            tipo: 'Agua',
            numero: 54,
            getInfo: function (){
                return `El pokemon ${this.nombre} es de tipo ${this.tipo}`
            }
        }

        // A la hora de utilizar una función que esté dentro de un objeto debemos utilizar los paréntesis ().
        console.log(pokemon2.getInfo())

        // Para hacer una copia de un objeto y añadirle nuevas propiedades podemos utilizar la propiedad
        // spread (...) utilizado para clonar y añadir
        const pokemonAmpliado = {
            ...pokemon,
            habitat: 'lago',
            tamanio: 10
        }

        // SHALLOW COPY: copia superficial, es una copia en la que al modificar algun elemento, modificamos el 
        // original aunque pensemos que no. 
        // Para evitar esto, los objetos y arrays creados con la propiedad spread (...) nos crea una DEEP COPY
        // con esta copia sí que podemos modificar la copia sin afectar al original
        
        // Con este tipo de copia, realmente modificamos el objeto original "pokemon" al modificar algo en la copia.
        const pokemonCopia = pokemon;

        pokemonCopia.nombre = 'Charizard';

        console.log(pokemon.nombre)

        // Sin embargo si utilizamos el spread para clonar un objeto o array y modificamos algun atributo, en el
        // original no habra afectacion


        // AMPLIACION DE EXPLICACION OPERADOR SPREAD
        
        const scyther = {
            nombre: 'Scyther',
            tipo: ['Bicho', 'Volador'],
            ataque: 110,
            defensa: 80
        }

        const revestimientoMetalico = {
            tipo: ['Bicho', 'Acero'],
            defensa: 120,
            ataque: 100,
            itemEquipado: 'Revestimiento Metálico'
        }

        // Este operador podemos utilizarlo para fusionar objetos manteniendo sus atributos independientes y pisar los atributos 
        // del primero. ES IMPORTANTE EL ORDEN!! porque el primero es pisado por el segundo.
        const scizor = {
            ...scyther,
            ...revestimientoMetalico,
            nombre: 'Scizor'
        }

        const scytherUp = {
            ...scyther,
            nivel: 26,
            ataque: 250,
            defensa: 200
        }

        // Desestructuración de objetos

        function calcularDanio(base, bonificacion, objeto) {
            return (base + bonificacion) * objeto;
        }

        // Podemos mandar todos los datos utilizando el operador spread para rellenar parámetros
        const stats = [10, 2, 5];

        console.log(calcularDanio(...stats));
        
        const objetoStats = {
            objeto: 5,
            base: 100,
            bonificacion: 3
        }
        
        // La desestructuración nos permite extraer precisamente las propiedades exclusivas que queramos
        function calcularDanio2 ({objeto = 14, base = 5, bonificacion = 2}){
            return (base + bonificacion) * objeto;
        }

        console.log(calcularDanio2(objetoStats));
        // Para mandar el objeto vacio tenemos que mandar las llaves vacias {}
        console.log(calcularDanio2({}));

        // Propiedades anidadas
        // El operador spread hace una copia de primer nivel, si tenemos un objeto con mas objetos anidados, el operador spread no 
        // nos hace la copia de esos segundos o terceros niveles.

        const mewOriginal = {
            nombre: 'Mew',
            estadisticas:{
                hp: 100,
                ataque:100
            }
        }

        // Aqui por ejemplo si modificamos las estadisticas, las modificara en el original, porque solo coge el primer nivel de deep copy.
        const clonFallido = { ...mewOriginal };
        console.log(clonFallido)
        clonFallido.estadisticas.ataque = 150;
        console.log(mewOriginal)

        // Para poder hacer una copia profunda de varios niveles, tenemos que hacer copias dentro de cada nivel
        const mewtwo = {
            ...mewOriginal,
            nombre: 'Mewtwo',
            estadisticas:{
                ...mewOriginal.estadisticas,
                ataque: 200
            }
        }
        console.log(mewtwo);
        console.log(mewOriginal);

        // Forma de clonar un objeto entero a todos los niveles.
        const mewtwo2 = structuredClone(mewOriginal);
        mewtwo2.estadisticas.ataque = 1;
        console.log(mewOriginal);
        console.log(mewtwo2);

        // Uso del .map() para modificar objetos sin alterar su objeto original y con condiciones
        const equipoPokemon = [
            {    nombre: 'Totodile',
                hp: 12,
                hpMax: 35
            },
            {
                nombre: 'Cyndaquil',
                hp: 25,
                hpMax: 40
            },
            {
                nombre: 'Chikorita',
                hp: 25,
                hpMax: 60
            }
        ]

        function curarEquipo(equipoPokemon){
            const equipoSano = equipoPokemon.map((pokemon) => {
                if(pokemon.hp < (pokemon.hpMax / 2)){
                    return {...pokemon,
                    hp: pokemon.hpMax
                    }
                } else {
                    return {...pokemon};
                }
            });
            console.log(equipoSano);
            console.log(equipoPokemon);
        }

        curarEquipo(equipoPokemon)

        // Asi podemos copiar un objeto de forma inmutable hasta el primer nivel podemos usar el metodo Objetct.assign
        const copiaMewtwo = Object.assign({}, mewtwo);

        // Para hacer una deep copy a todos los niveles podemos hacer un parseo del objeto a JSON y despues volver a pasarlo a objeto con stringify
        const copiaMewtwoDeep = JSON.parse(JSON.stringify(mewtwo));

        // Para hacer una copia profunda de manera mucho mas simple tenemos el metodo structuredClone
        const copiaMewtwoDeepEasy = structuredClone(mewtwo);

    });