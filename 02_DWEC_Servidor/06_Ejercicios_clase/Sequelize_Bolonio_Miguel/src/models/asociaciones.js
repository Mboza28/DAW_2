const Usuario = require('./Usuario');
const Categoria = require('./Categoria');
const Producto = require('./Producto');
const Transaccion = require('./Transaccion');
const PuntoEncuentro = require('./PuntoEncuentro');
const sequelize = require('../bbdd/conect');


// ------------------- Categoria con su subcategoria -------------------
Categoria.hasMany(Categoria, {
  as: 'subcategorias',
  foreignKey: 'categoria_padre_id',
  onDelete: 'SET NULL'
});

Categoria.belongsTo(Categoria, {
  as: 'categoriaPadre',
  foreignKey: 'categoria_padre_id',
  onDelete: 'SET NULL'
});


// ------------------- Usuario <-> Producto -------------------

Usuario.hasMany(Producto, {
  as: 'productos',
  foreignKey: 'vendedor_id',
  onDelete: 'RESTRICT'
});

Producto.belongsTo(Usuario, {
  as: 'vendedor',
  foreignKey: 'vendedor_id',
  onDelete: 'RESTRICT'
});


// ------------------- Categoria <-> Producto -------------------

Categoria.hasMany(Producto, {
  as: 'productos',
  foreignKey: 'categoria_id',
  onDelete: 'RESTRICT'
});

Producto.belongsTo(Categoria, {
  as: 'categoria',
  foreignKey: 'categoria_id',
  onDelete: 'RESTRICT'
});


// ------------------- Usuario <-> Transaccion (Comprador y Vendedor) -------------------

Usuario.hasMany(Transaccion, {
  as: 'compras',
  foreignKey: 'comprador_id',
  onDelete: 'RESTRICT'
});

Transaccion.belongsTo(Usuario, {
  as: 'comprador',
  foreignKey: 'comprador_id',
  onDelete: 'RESTRICT'
});

Usuario.hasMany(Transaccion, {
  as: 'ventas',
  foreignKey: 'vendedor_id',
  onDelete: 'RESTRICT'
});

Transaccion.belongsTo(Usuario, {
  as: 'vendedor',
  foreignKey: 'vendedor_id',
  onDelete: 'RESTRICT'
});


// ------------------- Producto <-> Transaccion (Producto principal y Producto de trueque) -------------------

Producto.hasMany(Transaccion, {
  as: 'transacciones',
  foreignKey: 'producto_id',
  onDelete: 'RESTRICT'
});

Transaccion.belongsTo(Producto, {
  as: 'producto',
  foreignKey: 'producto_id',
  onDelete: 'RESTRICT'
});

Producto.hasMany(Transaccion, {
  as: 'truequesOfrecidos',
  foreignKey: 'producto_trueque_id',
  onDelete: 'RESTRICT'
});

Transaccion.belongsTo(Producto, {
  as: 'productoTrueque',
  foreignKey: 'producto_trueque_id',
  onDelete: 'RESTRICT'
});


// ------------------- PuntoEncuentro <-> Transaccion -------------------

PuntoEncuentro.hasMany(Transaccion, {
  as: 'transacciones',
  foreignKey: 'punto_encuentro_id',
  onDelete: 'SET NULL'
});

Transaccion.belongsTo(PuntoEncuentro, {
  as: 'puntoEncuentro',
  foreignKey: 'punto_encuentro_id',
  onDelete: 'SET NULL'
});



module.exports = {
  sequelize,
  Usuario,
  Categoria,
  Producto,
  PuntoEncuentro,
  Transaccion
};