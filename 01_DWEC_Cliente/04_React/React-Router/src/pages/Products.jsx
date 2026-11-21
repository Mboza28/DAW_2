import { Link, useSearchParams } from 'react-router-dom';
import videojuegos from '../data/videojuegos';

function Products() {

	const [searchParams, setSearchParams] = useSearchParams();

	const genero = searchParams.get("genero") || "";
	const titulo = searchParams.get("titulo") || "";

	function actualizarFiltros(clave, valor){
		const nuevosParams = new URLSearchParams(searchParams);

		if (valor) {
			nuevosParams.set(clave, valor);
		} else {
			nuevosParams.delete(clave);
		}

		setSearchParams(nuevosParams);
	}

	const juegosFiltrados = videojuegos.filter((juego) => {
		const nuevoTitulo = titulo ? juego.titulo === titulo : true;
		const nuevoGenero = genero ? juego.genero === genero : true;

		return nuevoTitulo && nuevoGenero
	})

	return (
		<>
			<h1>CATÁLOGO DE VIDEOJUEGOS</h1>

			<input 
				type="text" 
				placeholder='Introduce el título' 
				value={titulo}
				onChange={(evento) => actualizarFiltros('titulo', evento.target.value)}
			/>

			<h3>Filtrar por género</h3>
			<select 
				id='generoJuego'
				value = {genero}
				onChange={(evento) => actualizarFiltros('genero', evento.target.value)}
			>
				<option value="">Todos los géneros</option>
				<option value="Acción">Acción</option>
				<option value="Aventura">Aventura</option>
				<option value="Shooter">Shooter</option>
			</select>
			<button onSubmit={actualizarFiltros}>Buscar</button>

			{	juegosFiltrados > 0 ? (juegosFiltrados.map(juego => (
				
				<div key={juego.id}>
					<h2>{juego.nombre}</h2>
					<p>Precio: {juego.precio}</p>

					<Link to={`/products/${juego.id}`}>
						Ver detalles
					</Link>
				</div>
				))	
			) : (
				<p>No hay videojuegos que coincidan con la búsqueda</p>
			)}

			
		</>
	);
}

export default Products;