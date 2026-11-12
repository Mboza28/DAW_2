import './App.css'
import logoKirby from './assets/logo-kirby.svg'
import ListaTareas from './components/ListaTareas/ListaTareas'

function App() {
  return(
    <div className='aplicacion-tareas'>
      <div className="logo-contenedor">
        <img src={logoKirby} alt="Logo de Kirby" className='logo-kirby'/>
      </div>

      <div className="tareas-lista-principal">
        <h1>Mis tareas</h1>
        <ListaTareas></ListaTareas>
      </div>

    </div>
  )
}

export default App
