const { DataTypes } = require('sequelize');
const sequelize = require('../bbdd/conect'); // Ajusta la ruta a tu conexión

const PuntoEncuentro = sequelize.define('PuntoEncuentro', {
  punto_encuentro_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  latitud: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true,
    validate: {
      min: -90,
      max: 90
    }
  },
  longitud: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true,
    validate: {
      min: -180,
      max: 180
    }
  }
}, {
  tableName: 'Punto_encuentro',
  timestamps: false
});

module.exports = PuntoEncuentro;