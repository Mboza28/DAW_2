import './ListaProductos.css'
import {Tarjeta} from '../Tarjeta/Tarjeta.jsx'

export function ListaProductos({productos, onAgregarAlCarrito}) {

  return (

    <section className='lista-productos-contenedor'>
      <h2>Catálogo de productos</h2>
      <div className="grid-productos">
        {productos.map((producto) => 
          <Tarjeta
            key={producto.id}
            producto={producto}
            onAgregar={onAgregarAlCarrito}
          ></Tarjeta>
        )}
      </div>
    </section>
  )
}
