
import './Boton.css';

function Boton({ texto, esBotonDeClick, manejarClick }) {
  return (

    <button className={ esBotonDeClick ? "btn-click" : "btn-reiniciar" } onClick={manejarClick}>
        {texto}
    </button>

  )
}

export default Boton

// Las funciones las contiene el padre, en este caso el componente App y es él el que se encarga de ejecutarlo, aquí
// en botón solamente se pasa por props la funcion, pero es una referencia a la función, no es el hijo el que la ejecuta,
// es el padre. El hijo solo avisa al padre de que ha sido pulsado.