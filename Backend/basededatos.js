import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); 

const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

conexion.connect(error => {
  if (error) {
    console.error('Error al conectar:', error);
    return;
  }
  console.log('Conectado a la base de datos');
});

export default conexion;
