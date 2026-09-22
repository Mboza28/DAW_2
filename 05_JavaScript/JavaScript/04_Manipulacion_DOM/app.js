window.addEventListener("DOMContentLoaded", () => {

    // Con document.getElementById() capturamos un elemento del DOM por ID
    // Si tenemos varios elementos con el mismo ID solamente capturaremos el primero que haya

    const contenedor = document.getElementById("contenedor")
    
    // Podemos comprobar la captura del elemento haciendo un console.log()
    console.log(contenedor)

    // Y podemos transformarlo en un string con .innerHTML
    console.log(contenedor.innerHTML)

    const titulo = document.getElementById("titulo")

    console.log(titulo)

    // Con .innerText podemos acceder al String directamente obviando las etiquetas HTML
    console.log(titulo.innerText)

    // Con .tagName podemos averiguar de qué tipo es la etiqueta del elemento que hemos capturado
    console.log(titulo.tagName)


    // Tenemos otra forma de capturar elementos con .getElementsByClassName
    const toppings = document.getElementsByClassName("topping")

    // Este metodo lo que guarda es una especie de array, mas bien una coleccion de elementos
    // llamada HTMLCollection.

    // ¡¡¡¡OJO!!!! No es un array ! No dispone de los métodos de los que dispone un array
    console.log(toppings)


    // Si quisiera imprimir solamente un elemento podria acceder con el índice como si fuera un array
    console.log(toppings[0])
    console.log(toppings[0].id)

    // Podemos capturar todos los elementos con una etiqueta mediante el metodo getElementsByTagName
    const listas = document.getElementsByTagName("li")
    console.log(listas)

    // Si quisiera seleccionar un elemento con un determinado ID o Clase, utilizamos .querySelector
    const toppingAceitunas = document.querySelector("#aceitunas")
    console.log(toppingAceitunas)

    // Tambien podemos coger el primer elemento por clase de los que tengan la misma clase
    const toppingAceitunas2 = document.querySelector(".topping")
    console.log(toppingAceitunas2)

    // El poder del querySelector es que podemos combinar varias especificaciones a la hora de capturar
    // un elemento, para ser mas selectivos en la busqueda, de la siguiente forma
    const primerToppingNaranja = document.querySelector("ul li.fondo-naranja")
    console.log(primerToppingNaranja)

    // Se puede utilizar el operador :not para capturar algo que NO tenga esa propiedad
    const champi = document.querySelector("ul li:not(.fondo-marron)")
    console.log(champi)

    // Si queremos seleccionar varios elementos podemos utilizar .querySelectorAll
    // Este método nos devuelve una NODE LIST (lista de nodos), es muy parecida al HTMLCollection

    const toppingsNaranjas = document.querySelectorAll(".topping.fondo-naranja")
    console.log(toppingsNaranjas)
    console.log(toppingsNaranjas[1])
    console.log(toppingsNaranjas.length)
    console.log(typeof(toppingsNaranjas))

    // Con console.dir podemos ver todas las propiedades de un elemento
    console.dir(toppingsNaranjas)


    // Manipulacion del estilo de los elementos a traves del DOM

    const primerTopping = document.querySelector(".topping")
    primerTopping.style.color = "#ffc400"
    primerTopping.style.textTransform = "uppercase"

    // Para ver un listado de todas las propiedades que puedo modificar mediante el .style
    console.log(primerTopping.style)

    // Manipulación y obtención del texto de los elementos a traves del DOM
    const listaToppings = document.getElementById("lista-toppings")

    // Con .textContent nos devuelve el texto plano que contiene un elemento en sí
    console.log(listaToppings.textContent)

    // Con .innerText nos devuelve el texto MODIFICADO tal como aparece reflejado en el html
    console.log(listaToppings.innerText)

    // Con .innerHTML nos devuelve un texto plano de tipo String con todo el contenido del html
    console.log(listaToppings.innerHTML)

    // Tambien podemos modificar el texto de un elemento asignando un nuevo valor al .innerText
    const titulo2 = document.getElementById("titulo")
    titulo2.innerText = "Mis Toppings Favoritos"


    // Podemos modificar enlaces por ejemplo y su posibilidad de enlazar, o cambiar el enlace
    const enlace = document.getElementsByTagName("a")
    console.log(enlace[0].getAttribute("href"))

    // enlace[0].removeAttribute("href")

    enlace[0].setAttribute("href", "https://www.pizzahut.es")
    console.log(enlace[0].getAttribute("href"))


    // Con .classList podemos consultar qué clases tiene el elemento
    console.log(primerTopping.classList)

    // Podemos añadir una clase a un elemento con .classList.add
    primerTopping.classList.add("fondo-verde")

    // Podemos ver si un elemento contiene una clase determinada devolviendo true o false
    console.log(primerTopping.classList.contains("fondo-verde"))

    // Podemos eliminar una clase con el .remove
    // primerTopping.classList.remove("topping")
    
    // Podemos crear elementos en el DOM con el .createElement del tipo que sea con su etiqueta
    const toppingNuevo = document.createElement("li")
    
    // Le agregamos propiedades y estilos para que encaje en el diseño previo de la pagina
    toppingNuevo.classList.add("topping", "fondo-marron")
    
    // Ahora es un elemento vacio con los estilos pero necesitamos añadirle texto con .innerText
    toppingNuevo.innerText = "Queso"

    // Coge un nodo parental y le añade un nodo hijo, así añadimos elementos dentro de otros elementos
    // Permite añadir varios elementos, añadiendolos en parametros
    listaToppings.append(toppingNuevo)

    // Tambien tenemos disponible el .appendChild para añadir un nodo hijo
    listaToppings.appendChild(toppingNuevo)

    // Para recorrer el DOM y localizar elementos padres, hijos o hermanos
    // Utilizamos .parentNodes y .parentElements
    // El .parentElement solamente nos devuelve el HTML
    // EL .parentNodes nos arroja las propiedades, estilos, comentarios, el nodo completo
    console.log(listaToppings.parentElement)

    // Podemos concatenar estos métodos para acceder al padre, abuelo....
    console.log(listaToppings.parentElement.parentElement)

    // Podemos acceder tambien a los hijos de los elementos con .firstChild y .firstElementChild // .lastChild y .lastElementChild
    // Con .firstChild / .lastChild nos devuelve el siguiente nodo
    // Con .firstElementChild / .lastElementChild nos devuelve el primer elemento hijo
    console.log(listaToppings.firstChild)
    console.log(listaToppings.firstElementChild)

    //Podemos acceder a cualquier elemento hijo con .children y accediendo al indice del elemento que queremos
    console.log(listaToppings.children[0])

    // Podemos obtener tambien elementos hermanos con .previousElementSibling // .nextElementSibling
    console.log(listaToppings.previousElementSibling)

})