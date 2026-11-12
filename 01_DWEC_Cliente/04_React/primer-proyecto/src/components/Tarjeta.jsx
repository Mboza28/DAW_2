import '../styles/Tarjeta.css'

function Tarjeta({nombre, imagen, descripcion, texto}) {
  return (
    <div className="contenedor-tarjeta">
      <img 
      className="imagen-tarjeta"
      // con el require nos aseguramos de que la imagen se cargue antes de montar el componente para evitar fallos al cargar la pagina
      // y cuando no se conocia la ruta, ahora podemos importar la ruta al principio y utilizarla dentro del src
      src= {imagen}
      alt= {`Imagen de ${nombre} `}/>
      <div className="contenedor-texto">
        <p className="nombre-tarjeta">{nombre}</p>
        <p className="descripcion-tarjeta">{descripcion}</p>
        <p className="texto-tarjeta">{texto}</p>
      </div>
    </div>
  )
}

export default Tarjeta