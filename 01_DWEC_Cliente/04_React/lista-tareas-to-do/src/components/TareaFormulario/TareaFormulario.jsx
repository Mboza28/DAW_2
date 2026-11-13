import { useState } from 'react';
import './TareaFormulario.css';
import { v4 as uuidv4 } from 'uuid';

function TareaFormulario(props) {

  const [input, setInput] = useState('');

  const manejarCambio = (evento) => {
    setInput(evento.target.value);
  }

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    const tareaNueva = {
      id: uuidv4(),
      texto: input,
      completada: false
    }

    props.onSubmit(tareaNueva);
  }

  return (
    <form 
      className = 'tarea-formulario'
      onSubmit = {manejarEnvio}
    >
        <input 
            type="text" 
            name="nuevaTarea"
            className="tarea-input"
            placeholder='Escribe una tarea'
            onChange={manejarCambio}
        />
        <button className = 'tarea-boton'>
            Agregar tarea
        </button>
    </form>
  )
}

export default TareaFormulario