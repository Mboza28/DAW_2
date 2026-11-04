import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(
    'ejemplo_db',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

// Para probar la conexion 
sequelize.authenticate().then(() => {
    console.log('Conexion a la base de datos correcta');
}).catch((error) => {
    console.error('No se ha podido conectar a la base de datos', error)
})

const ejemplo_db = sequelize.createSchema('ejemplo_db')

// Creación de una tabla desde sequelize
const Juego = sequelize.define("juegos", {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },

    fecha_lanzamiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    precio:{
        type: DataTypes.INTEGER,
    }
});

// El metodo sync permite que el orm acceda a la base de datos, mire qué tablas existen, qué tablas estan creadas en código con .define() y si no existen las crea
sequelize.sync().then(() => {
    console.log('Tabla creada con exito');
}).catch((error) => {
    console.error('No se ha podido crear la tabla', error)
});
