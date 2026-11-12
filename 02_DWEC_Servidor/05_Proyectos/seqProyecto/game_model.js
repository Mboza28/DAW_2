//? tablas y rellenar un poco la información de estas
//? la estructura de las tablas, tipo de valor, etc.

const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(

    'ejemplodb',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(()=>{
    console.log('Conexión establecida');
    
}).catch((error)=>{
    console.error('Es imposible conectarse ' + error);
    
});

const Juego = sequelize.define("juegos", {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha_lanzamiento: {
        type: DataTypes.DATEONLY,
    },
    precio:{
        type: DataTypes.DECIMAL
    }

});

sequelize.sync().then(()=>{

    console.log('tabla creada con éxito');
    
}).catch((error)=>{
    console.error('e imposible crear la table que no la tabla nen: ' + error);
    
});



