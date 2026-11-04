import './Boton.css'

function Boton(props) {

    const esOperador = valor => isNaN(valor) && (valor !== '.') && (valor !== '=');

  return (
    <div 
      className={`boton-contenedor ${esOperador(props.children) ? 'btn-operador' : ""}`.trimEnd()} 
      onClick={() => {props.manejarClick(props.children)}}>
        { props.children }
    </div>
  )
}

export default Boton

// props.children hace referencia a lo que pongamos dentro de las llaves cuando usamos el 
// componente.

// La funcion isNaN arroja un true o false dependiendo de si el valor que le pasamos es o no un numero.

// La funcion del onClick se ejecuta constantemente por los parentesis, para evitar este
// comportamiento, lo que hacemos es envolverla en una funcion flecha, para que no se ejecute
// hasta que realmente ocurra el evento.