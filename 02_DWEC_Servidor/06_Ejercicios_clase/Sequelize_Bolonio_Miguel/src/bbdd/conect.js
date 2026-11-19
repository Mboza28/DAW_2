const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'prueba_bd',
  'root',
  '',
  {
    host:'localhost',
    dialect:'mysql'
  }  
)

module.exports = sequelize;



