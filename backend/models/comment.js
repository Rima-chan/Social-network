const db = require('../config/db');
const mysql = require('mysql');

const Comment = function(comment) {
    this.userId = comment.userId;
    this.publicationId = comment.publicationId;
    this.content = comment.content;
    this.attachment = comment.attachment;
}

Comment.create = (newComment) => {
    let sql = 'INSERT INTO comments VALUES(NULL, ?, ?, ?, ?, NOW(), NOW())';
    sql = mysql.format(sql, newComment);
    return new Promise((resolve, reject) => {
        db.query(sql, function(err, result) {
            if (err) reject({error: 'Cannot create comment' + err});
            resolve(result);
        })
    })
}

Comment.update = (updatedComment) => {
    let sql = 'UPDATE comments SET content = ?, image_url = ?, updated_at = NOW() WHERE id = ?';
    sql = mysql.format(sql, updatedComment);
    return new Promise((resolve, reject) => {
        db.query(sql, function(err, result) {
            if (err) reject({error: 'Cannot update comment ' + err});
            resolve(result);
        })
    })
}

Comment.findById = (commentId) => {
    let sql = 'SELECT * FROM comments WHERE id = ?';
    sql = mysql.format(sql, commentId);
    return new Promise((resolve, reject) => {
        db.query(sql, function(err, result) {
            if (err) reject({error: 'Cannont find comment' + err});
            resolve(result);
        })
    })
}

Comment.deleteComment = (commentId) => {
    let sql = 'DELETE FROM comments WHERE id = ?';
    sqp = mysql.format(sql, commentId);
    return new Promise((resolve, reject) => {
        db.query(sql, function(err, result) {
            if (err) reject({error: err});
            resolve(result);
        })
    })
}

Comment.getAll = (publicationId) => {
    let sql = 'SELECT * FROM comments WHERE publication_id = ?';
    sql = mysql.format(sql, publicationId);
    return new Promise((resolve, reject) => {
        db.query(sql, function(err, result) {
            if (err) reject({error: 'Cannot get comments'});
            resolve(result);
        })
    })
}

module.exports = Comment;