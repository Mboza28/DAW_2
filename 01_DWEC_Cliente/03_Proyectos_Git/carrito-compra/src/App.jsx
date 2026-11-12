import './App.css'
import { productos } from './assets/data/listado-productos'
import {ListaProductos} from './components/ListaProductos/ListaProductos'
import { useState } from 'react';

function App() {

  const [carrito, setCarrito] = useState([]);

  const handleAgregarAlCarrito = (productoAAgregar) => {
    setCarrito((carritoPrevio) => {
      return [...carritoPrevio, { ...productoAAgregar}];
    });
  };

  return (
    <>
      <div className="app-container">
      <header className="app-header">
        <h1>Mi Tienda</h1>
      </header>
      <main className="app-main">
        <ListaProductos 
          productos={productos} 
          onAgregarAlCarrito={handleAgregarAlCarrito} 
        />
      </main>
    </div>
    </>
  )
}

export default App
