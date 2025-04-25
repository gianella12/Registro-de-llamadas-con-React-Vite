import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config(); 



console.log('HOST:', process.env.DB_HOST);
console.log('USER:', process.env.DB_USER);
console.log('PASSWORD:', process.env.DB_PASSWORD);
console.log('DB:', process.env.DB_NAME);

const conexion = await    mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


  console.log('Conectado a la base de datos');


export default conexion;
