const mysql = require("mysql2");
const db = require("../config/db");

// eslint-disable-next-line func-names
const User = function (user) {
  this.email = user.email;
  this.password = user.password;
  this.username = user.username;
  this.avatar = user.avatar;
  this.isAdmin = false;
};

User.create = (newUser) => {
  let sql = "INSERT INTO User VALUES(NULL, ?, ?, ?, ?, ?)";
  sql = mysql.format(sql, newUser);
  return new Promise((resolve, reject) => {
    db.query(sql, (err) => {
      if (err) reject(new Error("Cannot create user", err));
      resolve({ success: "New user created !" });
    });
  });
};

User.findByEmail = (email) => {
  let sql =
    "SELECT id, username, isAdmin, avatar, email, password FROM User WHERE email = ?";
  sql = mysql.format(sql, email);
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

User.findByPseudo = (pseudo) => {
  let sql = "SELECT username FROM User WHERE username = ?";
  sql = mysql.format(sql, pseudo);
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(new Error("Cannot access to database", err));
      resolve(result);
    });
  });
};

User.findById = (id) => {
  let sql =
    "SELECT id, email, username, avatar, isAdmin FROM User WHERE id = ?";
  sql = mysql.format(sql, id);
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(new Error(err));
      resolve(result);
    });
  });
};

User.getAll = () => {
  const sql = "SELECT id, email, username, avatar FROM User";
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(new Error("Cannot access to database", err));
      resolve(result);
    });
  });
};

User.updateProfil = (updatedProfil) => {
  let sql = "UPDATE User SET email = ?, username = ?, avatar = ? WHERE id = ?";
  sql = mysql.format(sql, updatedProfil);
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(new Error("Cannot update profile", err));
      resolve(result);
    });
  });
};

User.deleteProfil = (userId) => {
  let sql = "DELETE FROM User WHERE id = ?";
  sql = mysql.format(sql, userId);
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(new Error("Cannot delete user", err));
      resolve(result);
    });
  });
};

module.exports = User;
