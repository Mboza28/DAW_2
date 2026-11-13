const { DataTypes } = require('sequelize');
const sequelize = require('../bbdd/conect');

const Transaccion = sequelize.define('Transaccion', {
  transaccion_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  comprador_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  vendedor_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  producto_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  producto_trueque_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  punto_encuentro_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  tipo: {
    type: DataTypes.ENUM('compra', 'trueque'),
    allowNull: false
  },
  precio_final: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'aceptada', 'en_curso', 'completada', 'cancelada'),
    defaultValue: 'pendiente'
  },
  tracking_code: {
    type: DataTypes.STRING(22),
    allowNull: true
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Transaccion',
  timestamps: false
});

module.exports = Transaccion;