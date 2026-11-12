import './Tarjeta.css'

export function Tarjeta({producto, onAgregar}) {

  const {nombre, descripcion, precio, imagen} = producto;

  return (

    <div className="tarjeta-contenedor">
      <img src={imagen} alt={nombre} className="imagen" />
      <div className="tarjeta-texto">
        <h3 className="nombre-producto">{nombre}</h3>
        <p className="descripcion-texto">{descripcion}</p>
        
        <div className="tarjeta-footer">
          <span className='precio-texto'>{precio.toFixed(2)} €</span>
          <button className='btn-agregar' onClick={() => onAgregar(producto)}>
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}