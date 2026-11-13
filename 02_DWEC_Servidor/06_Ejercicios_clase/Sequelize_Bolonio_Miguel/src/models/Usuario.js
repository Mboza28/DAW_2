const { DataTypes } = require('sequelize');
const sequelize = require('../bbdd/conect');

const Usuario = sequelize.define('Usuario', {
  usuario_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  nombre_usuario: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
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
  reputacion: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  creado_en: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  estado: {
    type: DataTypes.ENUM('activo', 'suspendido', 'inactivo'),
    defaultValue: 'activo'
  },
  rol: {
    type: DataTypes.ENUM('administrador', 'premium', 'usuario', 'moderador', 'soporte'),
    defaultValue: 'usuario'
  },
  biografia: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  verificado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'Usuario',
  timestamps: false
});

module.exports = Usuario;