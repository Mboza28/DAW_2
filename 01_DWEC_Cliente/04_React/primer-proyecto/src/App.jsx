import './App.css'
import Tarjeta from './components/Tarjeta'
import imagenMario from './images/mario.png'
import imagenBowser from './images/bowser.png'
import imagenDaisy from './images/daisy.png'
import imagenToad from './images/toad.png'
import imagenYoshi from './images/yoshi.png'
import datos from './data/infoPersonajes.js'

function App() {

  return (
    <div className='App'>
      <div className="contenedor-principal">
        <h1>Personajes del SuperMario</h1>

        {for (let index = 0; index < datos.length; index++) {
          {<Tarjeta
        nombre = {datos[index].nombre}
        descripcion = {datos[index].descripcion}
        texto = {datos[index].texto} 
        imagen = {}/>}
          
        }}
      </div>
    </div>
  )
}

export default App


// Ejercicio poner en negrita algunas de las palabras de los textos descriptivos de las tarjetas
// Personalizar el atributo alt de cada imagen para que se adecúe al personaje
// Guardar la informacion en un archivo json, el nombre, descripcion, texto e imagen