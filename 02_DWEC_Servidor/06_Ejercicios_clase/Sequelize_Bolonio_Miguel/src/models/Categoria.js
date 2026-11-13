const { DataTypes } = require('sequelize');
const sequelize = require('../bbdd/conect');

const Categoria = sequelize.define('Categoria', {
  categoria_id:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  imagen_url: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  categoria_padre_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
}, {
  tableName: 'Categoria',
  timestamps: false
});

module.exports = Categoria