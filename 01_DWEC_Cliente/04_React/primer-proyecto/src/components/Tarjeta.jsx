import '../styles/Tarjeta.css'

function Tarjeta(props) {
  return (
    <div className="contenedor-tarjeta">
      <img 
      className="imagen-tarjeta"
      // con el require nos aseguramos de que la imagen se cargue antes de montar el componente para evitar fallos al cargar la pagina
      // y cuando no se conocia la ruta, ahora podemos importar la ruta al principio y utilizarla dentro del src
      src= {props.imagen}
      alt= {`Imagen de ${props.nombre} `} />
      <div className="contenedor-texto">
        <p className="nombre-tarjeta">{props.nombre}</p>
        <p className="descripcion-tarjeta">{props.descripcion}</p>
        <p className="texto-tarjeta">{props.texto}</p>
      </div>
    </div>
  )
}

export default Tarjeta