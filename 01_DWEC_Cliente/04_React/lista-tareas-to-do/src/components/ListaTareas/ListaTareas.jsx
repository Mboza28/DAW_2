import './ListaTareas.css'
import TareaFormulario from '../TareaFormulario/TareaFormulario'
import Tarea from '../Tarea/Tarea';
import { useState } from 'react';

function ListaTareas(props) {

    const [tareas, setTareas] = useState([]);
    
    const eliminarTarea = (id) => {
        const tareasActualizadas = tareas.filter(tarea => tarea.id !== id);
        setTareas(tareasActualizadas);
    }
    
    const completarTarea = (id) => {
        const tareasActualizadas = tareas.map(tarea => {
            if(tarea.id === id){
                
                tarea.completada = !tarea.completada
            }
            
            return tarea;
        })
        
        setTareas(tareasActualizadas);
    }
    
        const agregarTarea = (tarea) => {
            if(tarea.texto.trim()){
                tarea.texto = tarea.texto.trim();
                // Utilizamos el spread para añadir una tarea a la copia de tareas que ya tenemos
                // para no perder la lista de tareas que teniamos
                const tareasActualizadas = [tarea, ...tareas];
                setTareas(tareasActualizadas);
            }
        }

    return (
        <>
            <TareaFormulario
                onSubmit = {agregarTarea}
            ></TareaFormulario>
            <div className='tareas-lista-contenedor'>
                {
                    tareas.map((tarea) => 
                        <Tarea 
                            key = {tarea.id}
                            id =  {tarea.id}
                            texto = {tarea.texto}
                            completada = {tarea.completada}
                            eliminarTarea = {eliminarTarea}
                            completarTarea={completarTarea}
                        ></Tarea>
                    )
                }
            </div>
        </>
    )
}

export default ListaTareas

// el <> </> es un FRAGMEMTO, se utiliza para hacer de padre para contener elementos hermanos sin que de error