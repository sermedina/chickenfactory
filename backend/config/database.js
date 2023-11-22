const { Sequelize } = require("sequelize");

// Extraer las variables de entorno para la configuración de la DB
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

// Crear una instancia de Sequelize para la conexión a la base de datos
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgresql",
  logging: false, // puedes cambiarlo a console.log si quieres ver las consultas SQL
});

module.exports = sequelize;
