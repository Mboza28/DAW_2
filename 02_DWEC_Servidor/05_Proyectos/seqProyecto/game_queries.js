//? tablas y rellenar un poco la información de estas
//? la estructura de las tablas, tipo de valor, etc.

const {Sequelize, DataTypes, where} = require("sequelize");

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
    console.log('conexión establecida');
    
}).catch((error)=>{
    console.error('e imposible conectarse ' + error);
    
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

//TODO: Creacion de un registro
/*
sequelize.sync().then(()=>{
    console.log('Acceso a la tabla con éxito');
    
    Juego.create({
        titulo:"Mario Kart",
        autor:"Nintendo",
        fecha_lanzamiento:"2025-11-01",
        precio: 82.99
    }).then((res)=>{
        console.log(res);
    }).catch((error)=>{
        console.error('Fallo al crear el registro ' + error);
    })
}).catch((error)=>{
    console.log('Error a la hora de acceder a la tabla ' + error);
});
*/

//TODO: consulta completa

/*
sequelize.sync().then(()=>{
    console.log('Acceso a la tabla con éxito');
    
    Juego.findAll().then((res)=>{
        console.log(res);
    }).catch((error)=>{
        console.error('Fallo al consultar todos los registros ' + error);
    })
}).catch((error)=>{
    console.log('Error a la hora de acceder a la tabla ' + error);
});
*/

//TODO: filtrado where
/*
sequelize.sync().then(()=>{
    console.log('Acceso a la tabla con éxito');
    
    Juego.findOne({
        where:{
            autor: "Nintendo"
        }
    }).then((res)=>{
        console.log(res);
    }).catch((error)=>{
        console.error('Fallo al consultar el registro ' + error);
    })
}).catch((error)=>{
    console.log('Error a la hora de acceder a la tabla ' + error);
});
*/


//TODO: borrado de datos

sequelize.sync().then(()=>{
    console.log('Acceso a la tabla con éxito');
    
    Juego.destroy({
        where:{
            id: 1
        }
    }).then((res)=>{
        console.log(res);
    }).catch((error)=>{
        console.error('Fallo al eliminar el registro ' + error);
    })
}).catch((error)=>{
    console.log('Error a la hora de acceder a la tabla ' + error);
});









