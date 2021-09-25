require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const userRoutes = require('./routes/user');

const app = express();

app.use(cors());

const db = mysql.createConnection({
    host:'localhost',
    user: process.env.DB_DATABASE_USER,
    password: process.env.DB_DATABASE_PASS,
    database: 'social_network'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
})

app.use('/api', userRoutes);

module.exports = app;