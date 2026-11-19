const { Op, fn, col } = require('sequelize');
const { Usuario, Producto } = require('../models/asociaciones');

// Select sin el campo sensible hash y las coordenadas
async function obtenerPerfilesPublicos() {
  return await Usuario.findAll({
    attributes: { exclude: ['hash', 'latitud', 'longitud'] },
    raw: true
  });
}

// Select filtrando y ordenando por reputacion
async function obtenerUsuariosReputacion(){
  return await Usuario.findAll({
    attributes: ['nombre_usuario', 'rol', 'verificado', 'reputacion'],
    order: [['reputacion','DESC']],
    raw: true
  })
}

// Select de usuarios con biografia completa
async function obtenerUsuariosConBiografia() {
  return await Usuario.findAll({
    attributes: ['nombre_usuario', 'email', 'biografia'],
    where:{
      estado: 'activo',
      biografia: {[Op.ne]: null}
    },
    raw: true
  })
}

// Select agrupando por rol y calculando la reputacion media de cada grupo
async function obtenerReputacionPorRoles() {
  return await Usuario.findAll({
    attributes: [
      'rol',
      [fn('COUNT', col('usuario_id')), 'total_usuarios'],
      [fn('ROUND', fn('AVG', col('reputacion')), 2), 'reputacion_media']
    ],
    group: ['rol'],
    order: [['reputacion_media', 'DESC']],
    raw: true
  });
}

// Select con filtrado para obtener usuarios activos, con reputacion >= (Op.gte) a 4.0 y que estén 
// verificados o (Op.or) el rol sea premium o administrador (Op.in). Ordenados por reputacion descendente
async function obtenerVendedoresDestacados() {
  return await Usuario.findAll({
    attributes: ['nombre_usuario', 'email', 'reputacion', 'rol', 'verificado'],
    where: {
      estado: 'activo',
      reputacion: { [Op.gte]: 4.0 },
      [Op.or]: [
        { verificado: true },
        { rol: { [Op.in]: ['premium', 'administrador'] } }
      ]
    },
    order: [['reputacion', 'DESC']],
    raw: true
  });
}

// Select con INNER JOIN para ver usuarios y su reputacion pero que tengan productos activos exclusivamente --> required:true hace un INNER 
async function obtenerUsuariosConProductosActivos() {
  return await Usuario.findAll({
    attributes: ['nombre_usuario', 'reputacion'],
    include: [
      {
        model: Producto,
        as: 'productos',
        attributes: ['titulo', 'precio'],
        where: { estado_publi: 'activo' },
        required: true
      }
    ]
  });
}

// Select de usuarios suspendidos o con reputacion menor (Op.lt) a 3.00
async function obtenerUsuariosFiltrados() {
  return await Usuario.findAll({
    attributes: ['nombre_usuario', 'email', 'estado', 'reputacion'],
    where: {
      [Op.or]: [
        {estado: 'suspendido'},
        {reputacion: {[Op.lt]: 3.00}}
      ]
    },
    raw: true
  })
}

// Select de vendedores activos, con reputacion entre (Op.between) 4.00 y 5.00 y que tenga rol premium o que esten verificados
async function obtenerVendedoresConfianza() {
  return await Usuario.findAll({
    attributes: ['nombre_usuario', 'reputacion', 'estado', 'rol', 'verificado'],
    where: {
      estado: 'activo',
      reputacion: {[Op.between]: [4.00, 5.00]},
      [Op.or]: [
        {rol: 'premium'},
        {verificado: true}
      ]
    },
    raw: true
  })
}

module.exports = {
  obtenerPerfilesPublicos,
  obtenerUsuariosReputacion,
  obtenerUsuariosConBiografia,
  obtenerReputacionPorRoles,
  obtenerVendedoresDestacados,
  obtenerUsuariosConProductosActivos,
  obtenerUsuariosFiltrados,
  obtenerVendedoresConfianza
};