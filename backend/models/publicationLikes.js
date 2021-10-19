const db = require('../config/db');
const mysql = require('mysql');

const Like = function(like) {
    this.userId = like.userId;
    this.publicationId = like.publicationId;
}

Like.isLiked = (ids) => {
    let sql = 'SELECT * FROM publication_likes WHERE user_id = ? AND publication_id = ?';
    sql = mysql.format(sql, ids);
    return new Promise((resolve, reject) => {
        db.query(sql, function(err, result) {
            if (err) reject({err});
            resolve(result);
        })
    })
}

Like.add = (ids) => {
    let sql = 'INSERT INTO publication_likes VALUES(NULL, ?, ?)';
    sql = mysql.format(sql, ids);
    return new Promise((resolve, reject) => {
        db.query(sql, function(err, result) {
            if (err) reject(err);
            resolve(result);
        })
    })
}

Like.remove = (ids) => {
    let sql = 'DELETE FROM publication_likes WHERE user_id = ? AND publication_id = ?';
    sql = mysql.format(sql, ids);
    return new Promise((resolve, reject) => {
        db.query(sql, function(err, result) {
            if (err) reject(err);
            resolve(result);
        })
    })
}

module.exports = Like;