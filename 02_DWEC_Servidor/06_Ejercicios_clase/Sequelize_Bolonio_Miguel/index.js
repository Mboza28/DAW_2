const { sequelize } = require('./src/models/asociaciones')

sequelize.authenticate()
  .then(() => sequelize.sync())
  .then(() => console.log('Base de datos conectada y sincronizada'))
  .catch((error) => console.error(error));