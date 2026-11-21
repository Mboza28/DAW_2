import videojuegos from '../data/videojuegos';
import { Link, useParams } from 'react-router-dom';

function ProductDetail() {

    const { id } = useParams();

    const videojuego = videojuegos.find(juego => juego.id === Number(id));

    if (!videojuego) {
        return <h2>Videojuego no encontrado</h2>
    }

    return (
        <>
            <h1>{videojuego.nombre}</h1>
            <p>Género: {videojuego.genero}</p>
            <p>Precio: {videojuego.precio}</p>
            <p>Plataforma: {videojuego.plataforma}</p>
            <p>Descripción: {videojuego.descripcion}</p>

            <Link to={"/products"}>
                Volver a productos
            </Link>
        </>
    )
}

export default ProductDetail;