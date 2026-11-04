import './Contador.css';

import React from 'react'

function Contador({ numClicks }) {
  return (
    <div className='contenedor-contador'>
        <p>Número de clicks realizados: </p>
        <div>
            {numClicks}
        </div>
    </div>
  )
}

export default Contador

// Utilizamos un hook, un hook nos permite acceder al estado o ciclo de vida del componente, existe useState y useEffect
// useState permite dos parametros primero el valor y segundo una funcion que nos permite actualizar dicho estado
// Es el padre el que se encarga de los hooks, en este caso App