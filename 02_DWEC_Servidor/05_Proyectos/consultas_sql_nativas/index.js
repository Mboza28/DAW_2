const mysql = require('mysql')

/* const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ejecrud'
}) */

const conexion = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ejecrud'
})

//Consultas

const tabla = "CREATE TABLE empleados (id int(15) NOT NULL AUTO_INCREMENT," +
              "nombre varchar(40) DEFAULT NULL,"+
              "apellido varchar(40) DEFAULT NULL,"+
              "sueldo float(10) DEFAULT NULL,"+
              "PRIMARY KEY (id)) ENGINE = InnoDB DEFAULT CHARSET=latin1";

const insertarRegistro = 'INSERT INTO empleados (nombre, apellido,sueldo) VALUE (?,?,?)';

const consultarDatos = 'SELECT * FROM empleados';

const actualizarDatos = 'UPDATE empleados SET sueldo=? WHERE nombre=? AND apellido =?';

const borrarDatos = 'DELETE FROM empleados WHERE nombre=? and apellido=?'


//HACER CONEXION, habría dos posibles errores el primero sería error de conexion y el segundo sería el error en la query que estamos haciendo dentro

//PARA CREAR LA TABLA
 /* conexion.getConnection(function(err,conex){
  conex.query(tabla, function(error){
    if (error) throw error;
    else{
      console.log("Tabla creada con éxito");
    } 
  })

  //liberamos la conexion con el metod realese, asique no hace falta tratar el primer err

  conex.release();
})          
 */

/* //PARA HACER EL REGISTRO
conexion.getConnection(function(err,conex){
  conex.query(insertarRegistro,['Pepito', 'Grillo', 20000], function (error){
    if (error) throw error;
    else{
      console.log("Registro creado con éxito");
    } 
  })

  //liberamos la conexion 

  conex.release();
}) */

/*   //PARA CNSULTAR LOS SELECT
conexion.getConnection(function(err,conex){
  conex.query(consultarDatos, function (error, datos){
    if (error) throw error;
    else{
      console.log("Consulta realizada con éxito");
      console.log(datos);
    } 
  })

  //liberamos la conexion 

  conex.release();
})  */

/*   //PARA ACTULIZAR DATOS
conexion.getConnection(function(err,conex){
  conex.query(actualizarDatos,[30000,'Pepito', 'Grillo'], function (error, res){
    if (error) throw error;
    else{
      console.log("Actualización realizada con éxito");
      console.log(res);
    } 
  })

  //liberamos la conexion 

  conex.release();
})  */

// BORRADO DE DATOS
conexion.getConnection(function(err,conex){
  conex.query(borrarDatos,['Pepito', 'Grillo'], function (error, res){
    if (error) throw error;
    else{
      console.log("Borrado realizado con éxito");
      console.log(res);
    } 
  })

  //liberamos la conexion 

  conex.release();
}) 