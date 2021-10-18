const db = require('../config/db');
const mysql = require('mysql');

const Publication = function(publication) {
    this.userId = publication.userId;
    this.content = publication.content;
    this.attachment = publication.attachment;
    this.comments = 0;
    this.likes = 0;
}

Publication.create = (newPublication) => {
    let sql = 'INSERT INTO publications VALUES(NULL, ?, ?, ?, ?, ?, NOW(), NOW())';
    sql = mysql.format(sql, newPublication);
    return new Promise((resolve, reject) => {
        db.query(sql, function(err, result) {
            if (err) reject({error: 'Cannot add publication in DB ' + err})
            resolve({message: 'Publication created !'})
        })
    })
}

Publication.findById = (publicationId) => {
    let sql = 'SELECT * FROM publications WHERE id = ?';
    sql = mysql.format(sql, publicationId);
    return new Promise((resolve, reject) => {
        db.query(sql, function(err, result) {
            if (err) reject({error: 'Cannont find publication in DB' + err})
            resolve(result);
        })
    })
}

Publication.update = (updatedPublication) => {
    let sql = 'UPDATE publications SET content = ?, image_url = ?, updated_at = NOW() WHERE id = ?';
    sql = mysql.format(sql, updatedPublication);
    return new Promise((resolve, reject) => {
        db.query(sql, function(err, result) {
            if (err) reject({error: 'Cannot update publication ' + err})
            resolve(result)
        })
    })
}

Publication.addComment = (nb) => {
    let sql ='UPDATE publications SET comments = ?';
    sql = mysql.format(sql, nb);
    return new Promise((resolve, reject) => {
        db.query(sql, function(err, result) {
            if (err) reject({error: 'Cannot update nb of comments' + err});
            resolve(result);
        })
    })
}

Publication.delete = (publicationId) => {
    let sql = 'DELETE FROM publications WHERE id = ?';
    sql = mysql.format(sql, publicationId);
    return new Promise((resolve, reject) => {
        db.query(sql, function(err, result) {
            if (err) reject({error: 'Cannot delete publication'});
            resolve(result);
        })
    })
}

Publication.getAll = () => {
    let sql = 'SELECT * FROM publications';
    return new Promise((resolve, rejcet) => {
        db.query(sql, function(err, result) {
            if (err) reject({error: 'Cannot find publications' + err})
            resolve(result)
        })
    })
}

module.exports = Publication;