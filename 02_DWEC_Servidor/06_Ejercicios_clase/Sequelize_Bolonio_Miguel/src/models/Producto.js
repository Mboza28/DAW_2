const { DataTypes } = require('sequelize');
const sequelize = require('../bbdd/conect');

const Producto = sequelize.define('Producto', {
  producto_id:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  estado_publi: {
    type: DataTypes.ENUM('activo', 'reservado', 'vendido'),
    defaultValue: 'activo',
    allowNull: false
  },
  acepta_trueque: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  vendedor_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: false
  },
  categoria_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  latitud: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false, 
    validate: {
      min: -90,
      max: 90
    }
  },
  longitud: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false,
    validate: {
      min: -180,
      max: 180
    }
  },
   fecha_publi: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Producto',
  timestamps: false
});

module.exports = Producto