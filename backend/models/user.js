const db = require("../config/db");
const mysql = require("mysql2");

const User = function (user) {
  this.email = user.email;
  this.password = user.password;
  this.username = user.username;
  this.avatar = user.avatar;
  this.isAdmin = false;
};

User.create = (newUser) => {
  let sql = "INSERT INTO users VALUES(NULL, ?, ?, ?, ?, ?)";
  sql = mysql.format(sql, newUser);
  return new Promise((resolve, reject) => {
    db.query(sql, function (err, result) {
      if (err) reject("Cannot add user in DB : " + err);
      resolve({ success: "New user created !" });
    });
  });
};

User.findByEmail = (email) => {
  let sql = `SELECT id, username, isAdmin, avatar, email, password FROM users WHERE email = ?`;
  sql = mysql.format(sql, email);
  return new Promise((resolve, reject) => {
    db.query(sql, function (err, result) {
      if (err) reject("Cannot access to DB" + err);
      resolve(result);
    });
  });
};

User.findByPseudo = (pseudo) => {
  let sql = "SELECT username FROM users WHERE username = ?";
  sql = mysql.format(sql, pseudo);
  return new Promise((resolve, reject) => {
    db.query(sql, function (err, result) {
      if (err) reject("Cannot access to DB" + err);
      resolve(result);
    });
  });
};

User.findById = (id) => {
  let sql = `SELECT id, email, username, avatar, isAdmin FROM users WHERE id = ?`;
  sql = mysql.format(sql, id);
  return new Promise((resolve, reject) => {
    db.query(sql, function (err, result) {
      if (err) reject({ err });
      resolve(result);
    });
  });
};

User.getAll = () => {
  let sql = "SELECT id, email, username, avatar FROM users";
  return new Promise((resolve, reject) => {
    db.query(sql, function (err, result) {
      if (err) reject("Cannot access to DB : " + err);
      resolve(result);
    });
  });
};

User.updateProfil = (updatedProfil) => {
  let sql = `UPDATE users SET email = ?, username = ?, avatar = ? WHERE id = ?`;
  sql = mysql.format(sql, updatedProfil);
  return new Promise((resolve, reject) => {
    db.query(sql, function (err, result) {
      if (err) reject("Cannot udpate profil" + err);
      resolve(result);
    });
  });
};

User.deleteProfil = (userId) => {
  let sql = "DELETE FROM users WHERE id = ?";
  sql = mysql.format(sql, userId);
  return new Promise((resolve, reject) => {
    db.query(sql, function (err, result) {
      if (err) reject("Cannot deleted profil " + err);
      resolve(result);
    });
  });
};

module.exports = User;
