const { sequelize } = require('./src/models/asociaciones')
const { obtenerResumenProductos, obtenerProductosActivosBaratos, obtenerProductosNoDisponibles, 
        buscarProductosCompuesta, obtenerProductosyCategoria, obtenerEstadisticasPorEstado } = require('./src/queries/consultasProducto');


/** Creación de las tablas   
sequelize.authenticate()
  .then(() => sequelize.sync())
  .then(() => console.log('Base de datos conectada y sincronizada'))
  .catch((error) => console.error(error));

*/

async function ejecutarConsultasProductos() {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos prueba_bd correctamente')

    console.log('Select de campos especificos');
    console.table(await obtenerResumenProductos());

    console.log('Select filtrando por precio y estado');
    console.table(await obtenerProductosActivosBaratos(150));

    console.log('Select de productos reservados o vendidos');
    console.table(await obtenerProductosNoDisponibles());

    console.log('Select con datos de varias tablas');
    console.table(await buscarProductosCompuesta());

    console.log('Select con funciones de agregacion, totales y precio medio');
    console.table(await obtenerEstadisticasPorEstado());

    console.log('Select con un INNER JOIN de productos y categoria');
    const productosDetalle = await obtenerProductosyCategoria();
    console.log(JSON.stringify(productosDetalle, null, 2));
  
  } catch (err) {
    console.error('Error realizando las consultas: ', err);
  } finally {
    await sequelize.close();
    console.log('Desconectado de la base de datos');
  }
}

ejecutarConsultasProductos();