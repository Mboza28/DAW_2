import './App.css'
import logo from '/src/assets/akatsuki-icon.png';
import Boton from './components/Boton';
import Contador from './components/Contador';
import { useState } from 'react';

function App() {

  // En esta zona es donde se introduce la lógica que necesitemos

  const [numClicks, setNumClicks] = useState(0);

  const hacerClick = () => {
    setNumClicks(numClicks + 1);
  }

  const reiniciarContador = () => {
    setNumClicks(0);
  }

  return(

    <div className='App'>  
      <div className="contenedor-logo">

        <img 
        src={logo}
        alt="Icono de Akatsuki"
        className ='logo' />
      
      </div>

      <div className="contenedor-principal">

        <Contador
          numClicks =  {numClicks}        
        />

        <Boton
          texto = "Click"
          esBotonDeClick={true}
          manejarClick={hacerClick}/>

        <Boton
          texto = "Reiniciar"
          esBotonDeClick={false}
          manejarClick={reiniciarContador}/>
      </div>
    </div>
  )
}

export default App;
