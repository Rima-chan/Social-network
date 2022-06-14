require('dotenv').config();

module.exports = {
    HOST: 'localhost',
    USER: process.env.DB_DATABASE_USER,
    PASSWORD: process.env.DB_DATABASE_PASS,
    DB: process.env.DB_DATABASE
};