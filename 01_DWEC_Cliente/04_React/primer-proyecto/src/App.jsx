import './App.css'
import Tarjeta from './components/Tarjeta'

import datos from './data/infoPersonajes.jsx'

function App() {
  
  const tarjeta = datos.map((personaje) => 
    <Tarjeta key = {personaje.nombre} {...personaje} />

    /** Utilizar el SPREAD ... ayuda a no tener que hacer esto, con la key ya sabe que tiene que pasarle los props
    nombre = {personaje.nombre}
    descripcion = {personaje.descripcion}
    texto = {personaje.texto} 
    imagen = {personaje.imagen}*/
  )

  return (
    <div className='App'>
      <div className="contenedor-principal">
        <h1>Personajes del SuperMario</h1>
        {tarjeta}
      </div>
    </div>
  )
}

export default App


// Ejercicio poner en negrita algunas de las palabras de los textos descriptivos de las tarjetas
// Personalizar el atributo alt de cada imagen para que se adecúe al personaje
// Guardar la informacion en un archivo json, el nombre, descripcion, texto e imagen