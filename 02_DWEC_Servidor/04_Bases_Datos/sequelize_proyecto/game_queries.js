import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize(
    'ejemplo_db',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

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

//  Creacion de un registro
/**
sequelize.sync().then(() => {
    console.log('Acceso a la tabla con éxito')
    Juego.create({
        titulo: 'Assassins Creed',
        autor: 'Ubisoft',
        fecha_lanzamiento: "2024-10-01",
        precio: 50
    }).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.error('No se ha podido crear el registro', error);
    })
}).catch((error) => {
    console.error('Error al acceder a la tabla', error);
});

// Hacer un SELECT *, para listar todo
sequelize.sync().then(() => {
    console.log('Acceso a la tabla con éxito');
    Juego.findAll().then((res) => {
        console.log(res);
    }).catch((error) => {
        console.error('No se ha podido obtener el registro', error);
    })
}).catch((error) => {
    console.error('Error al acceder a la tabla', error);
});

// Hacer un SELECT con filtrado de WHERE sacando únicamente el primer registro con findOne

sequelize.sync().then(() => {
    console.log('Acceso a la tabla con éxito');
    Juego.findOne({
        where:{
            autor: 'Nintendo'
        }
    }).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.error('No se ha podido consultar el registro', error);
    })
}).catch((error) => {
    console.error('Error al acceder a la tabla', error);
});
*/

// Hacer un borrado de un registro 

sequelize.sync().then(() => {
    console.log('Acceso a la tabla con éxito');
    Juego.destroy({
        where:{
            id: 1
        }
    }).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.error('No se ha podido borrar el registro', error);
    })
}).catch((error) => {
    console.error('Error al acceder a la tabla', error);
});