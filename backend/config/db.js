const mysql = require("mysql2");
const dbConfig = require("./db.config");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Database connected :)");
  connection.release();
});

module.exports = pool;
