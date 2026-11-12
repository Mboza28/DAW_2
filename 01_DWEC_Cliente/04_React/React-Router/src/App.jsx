import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'


// Router es el contenedor de rutas, que va a contener a cada Route individual
// Link se encarga de las redirecciones para eliminar componentes y traer componentes nuevos
//  Hay dos opciones dependiendo de como queramos componetizar la aplicación: 
//    - Situar los elementos estáticos fuera de las etiquetas de Router, por ejemplo, el header, footer y navbar.
//    - Componetizar todos los elementos hasta los estáticos o reutilizar alguno de otro proyecto.


// Link tiene una propiedad que es TO es como el href, ahi pondremos las vistas a las que queremos redireccionar

// El componente Routes va a definir cada una de las rutas individuales a las que tiene que redirigir los Links
// Cada componente Route individual tiene dos atributos el PATH que se refiere a la ruta a la que tiene que ir y el 
// atributo element que es el elemento que tiene que renderizar al ir a esa direccion


function App() {

  return (
    <div className='App'>
      <Router>
        <Nav></Nav>
        <Routes>
          <Route path='/' element={<Home></Home>}/>
          <Route path='/about' element={<About></About>}/>
          <Route path='/products' element={<Products></Products>}/>
        </Routes>

      </Router>
    </div>
  )
}

export default App
