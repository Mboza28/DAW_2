const { DataTypes, Model } = require('sequelize');
const sequelize = require('../bbdd/conect');

const Usuarios = sequelize.define('Usuarios', {
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Usuarios