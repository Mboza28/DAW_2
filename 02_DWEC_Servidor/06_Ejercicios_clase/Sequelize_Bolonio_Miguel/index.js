const { sequelize } = require('./src/models/asociaciones')

const { 
  obtenerResumenProductos, obtenerProductosActivosBaratos, 
  obtenerProductosNoDisponibles, buscarProductosCompuesta, 
  obtenerProductosyCategoria, obtenerEstadisticasPorEstado 
} = require('./src/queries/consultasProducto');

const { 
  obtenerPerfilesPublicos, obtenerVendedoresDestacados, 
  obtenerUsuariosConProductosActivos, obtenerUsuariosFiltrados, 
  obtenerVendedoresConfianza, obtenerUsuariosReputacion, 
  obtenerUsuariosConBiografia, obtenerReputacionPorRoles 
} = require('./src/queries/consultasUsuario')

const { obtenerHistorialTransaccionesCompleto, obtenerTruequesOEnvios } = require('./src/queries/consultasTransaccion')

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

    console.log(' ============================== CONSULTAS DE PRODUCTOS ==============================')

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

    console.log(' ============================== CONSULTAS DE USUARIOS ==============================')
    console.log('Select excluyendo el hash y coordenadas');
    console.table(await obtenerPerfilesPublicos());

    console.log('Select filtrando vendedores de mas de 4 reputacion');
    console.table(await obtenerVendedoresDestacados());

    console.log('Select con un INNER JOIN de usuarios y sus productos activos');
    const usuariosProductosActivos = await obtenerUsuariosConProductosActivos();
    console.log(JSON.stringify(usuariosProductosActivos, null, 2));

    console.log('Select de usuarios filtrados por estado suspendido o reputacion menor a 3.00');
    console.table(await obtenerUsuariosFiltrados());

    console.log('Select de vendedores activos, con reputacion entre 4.00 y 5.00 y que su rol sea premium o esté verificado');
    console.table(await obtenerVendedoresConfianza());

    console.log('Select ordenando usuarios por reputacion');
    console.table(await obtenerUsuariosReputacion());

    console.log('Select de usuarios con biografia y en estado activo');
    console.table(await obtenerUsuariosConBiografia());

    console.log('Select agrupando roles y calculando su reputacion media. Ordenada');
    console.table(await obtenerReputacionPorRoles());

    console.log(' ============================== CONSULTAS DE TRANSACCIONES ==============================')

    console.log('Select de transacciones con join de las 5 tablas');
    const transacciones = await obtenerHistorialTransaccionesCompleto();
    console.log(JSON.stringify(transacciones, null, 2));

    console.log('Select con filtrado de trueques o envios');
    console.table(await obtenerTruequesOEnvios());


  } catch (err) {
    console.error('Error realizando las consultas: ', err);
  } finally {
    await sequelize.close();
    console.log('Desconectado de la base de datos');
  }
}

ejecutarConsultasProductos();