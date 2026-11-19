const { Op } = require('sequelize');
const { Transaccion, Usuario, Producto, PuntoEncuentro } = require('../models/asociaciones');

// Select haciendo un join de las 5 tablas para ver transaccion, comprador, vendedor,
//  producto, producto trueque si existe y el punto de encuentro si no es envio
async function obtenerHistorialTransaccionesCompleto() {
  return await Transaccion.findAll({
    attributes: ['transaccion_id', 'tipo', 'precio_final', 'estado', 'tracking_code'],
    include: [
      {
        model: Usuario,
        as: 'comprador',
        attributes: ['nombre_usuario']
      },
      {
        model: Usuario,
        as: 'vendedor',
        attributes: ['nombre_usuario']
      },
      {
        model: Producto,
        as: 'producto',
        attributes: ['titulo', 'precio']
      },
      {
        model: Producto,
        as: 'productoTrueque',
        attributes: ['titulo', 'precio']
      },
      {
        model: PuntoEncuentro,
        as: 'puntoEncuentro',
        attributes: ['nombre', 'direccion']
      }
    ]
  });
}

// Select filtrando que sean trueques o envios (que tengan codigo de tracking != null (Op.ne))
async function obtenerTruequesOEnvios() {
  return await Transaccion.findAll({
    attributes: ['tipo', 'precio_final', 'estado', 'tracking_code'],
    where: {
      [Op.or]: [
        { tipo: 'trueque' },
        { tracking_code: { [Op.ne]: null } }
      ]
    },
    raw: true
  });
}

module.exports = {
  obtenerHistorialTransaccionesCompleto,
  obtenerTruequesOEnvios
};