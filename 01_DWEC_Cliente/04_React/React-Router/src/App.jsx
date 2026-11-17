import './App.css'

// forma antigua ------> import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import { RouterProvider, createBrowserRouter, Outlet, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Footer from './components/Footer/Footer'
import Users from './pages/Users'
import ErrorPage from './pages/ErrorPage'

/** Router es el contenedor de rutas, que va a contener a cada Route individual
    Link se encarga de las redirecciones para eliminar componentes y traer componentes nuevos
    Hay dos opciones dependiendo de como queramos componetizar la aplicación: 
      - Situar los elementos estáticos fuera de las etiquetas de Router, por ejemplo, el header, footer y navbar.
      - Componetizar todos los elementos hasta los estáticos o reutilizar alguno de otro proyecto.

    Link tiene una propiedad que es TO es como el href, ahi pondremos las vistas a las que queremos redireccionar

    El componente Routes va a definir cada una de las rutas individuales a las que tiene que redirigir los Links
    Cada componente Route individual tiene dos atributos el PATH que se refiere a la ruta a la que tiene que ir y el 
    atributo element que es el elemento que tiene que renderizar al ir a esa direccion

    A partir de React-Router 6 podemos manejar la carga de datos y tener manejo de errores dentro de las rutas
    Con createBrowserRouter creamos el Router y se lo damos al RouterProvider que es el que lo usara.
    Ahora podremos en Route tener aparte de path y element, el atributo children que seria una ruta anidada dentro de la ruta padre
    Las rutas hijas se van a renderizar dentro del componente Outlet

    Para utilizar un loader, lo definimos en su propia ruta, con el atributo o clave loader, con la lógica que necesite la carga de datos

    Podemos crear una forma de manejar errores con el hook useRouteError el cual devuelve un objeto de respuesta, un error de javascript 
    o lo que nosotros hayamos lanzado con un throw new error...
    Para ello deberemos de crear una página de error en el proyecto ( /pages )
 */


function App() {

  // La funcion createBrowserRouter devuelve un array de objetos, cada uno es una ruta que tendremos que definir en la creacion
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <div className='App'>
          <Nav></Nav>
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
      ),
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path:'Home',
          element: <Home></Home>
        },
        {
          path:'Users',
          element: <Users></Users>,
          loader: async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/users");
            return res.json();
          }
        },
        {
          path:'About',
          element: <About></About>
        },
        {
          path:'Products',
          element: <Products></Products>
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router}></RouterProvider>
  )

  // Esto seria con la forma antigua
  /**return (

    <div className='App'>
      <Router>
        <Nav></Nav>
        <Routes>
          <Route path='/' element={<Home></Home>}/>
          <Route path='/about' element={<About></About>}/>
          <Route path='/products' element={<Products></Products>} children={}/>
        </Routes>

      </Router>
    </div> 
  )*/
}

export default App
