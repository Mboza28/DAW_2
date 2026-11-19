const { Op, fn, col } = require('sequelize');
const { Producto, Usuario, Categoria } = require('../models/asociaciones');

// Select eligiendo solo los campos que quiero
async function obtenerResumenProductos() {
  return await Producto.findAll({
    attributes: ['titulo', 'precio', 'estado_publi', 'acepta_trueque'],
    raw: true
  });
}

// Consulta de filtrado con where, ordenada por precio ascendente y con la condicion con operador AND (Op.and) de productos activos 
// y con precio menor o igual (Op.lte) a 150€
async function obtenerProductosActivosBaratos(precioMax = 150) {
  return await Producto.findAll({
    attributes: ['titulo', 'precio', 'estado_publi'],
    where: {
      [Op.and]: [
        { estado_publi: 'activo' },
        { precio: { [Op.lte]: precioMax } }
      ]
    },
    order: [['precio', 'ASC']],
    raw: true
  });
}

// Consulta de filtrado con where, sin ordenar y con operador OR (Op.or) para mostrar productos que esten reservados o vendidos
async function obtenerProductosNoDisponibles() {
  return await Producto.findAll({
    attributes: ['titulo', 'precio', 'estado_publi'],
    where: {
      [Op.or]: [
        { estado_publi: 'reservado' },
        { estado_publi: 'vendido' }
      ]
    },
    raw: true
  });
}

// Consulta compuesta con rangos de precio con el operador (Op.between), con un estado activo, y que contengan la palabra Gaming en el titulo
// con el operador (Op.like) o que acepten trueque con el operador (Op.or). Ordenada por precio descendente
async function buscarProductosCompuesta() {
  return await Producto.findAll({
    attributes: ['titulo', 'precio', 'acepta_trueque', 'estado_publi'],
    where: {
      estado_publi: 'activo',
      precio: { [Op.between]: [30, 250] },
      [Op.or]: [
        { acepta_trueque: true },
        { titulo: { [Op.like]: '%Gaming%' } }
      ]
    },
    order: [['precio', 'DESC']],
    raw: true
  });
}

// Consulta de varias tablas: de cada producto el titulo, precio y estado 
// con su vendedor ( nombre, reputacion y si esta verificado ) y la 
// categoria a la que pertenece
async function obtenerProductosyCategoria() {
  return await Producto.findAll({
    attributes: ['titulo', 'precio', 'estado_publi'],
    include: [
      {
        model: Usuario,
        as: 'vendedor',
        attributes: ['nombre_usuario', 'reputacion', 'verificado']
      },
      {
        model: Categoria,
        as: 'categoria',
        attributes: ['nombre'],
        include: [
          {
            model: Categoria,
            as: 'categoriaPadre',
            attributes: ['nombre']
          }
        ]
      }
    ]
  });
}

// Consulta con funciones de agregacion, contar los productos totales y el precio medio de cada estado de publicacion
async function obtenerEstadisticasPorEstado() {
  return await Producto.findAll({
    attributes: [
      'estado_publi',
      [fn('COUNT', col('producto_id')), 'total_productos'],
      [fn('ROUND', fn('AVG', col('precio')), 2), 'precio_medio']
    ],
    group: ['estado_publi'],
    raw: true
  });
}

module.exports = {
  obtenerResumenProductos,
  obtenerProductosActivosBaratos,
  obtenerProductosNoDisponibles,
  buscarProductosCompuesta,
  obtenerProductosyCategoria,
  obtenerEstadisticasPorEstado
};