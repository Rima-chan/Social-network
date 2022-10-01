const mysql = require("mysql2");
const db = require("../config/db");

// eslint-disable-next-line func-names
const Like = function (like) {
  this.userPosytId = like.userPostId;
  this.postId = like.postId;
};

Like.isLiked = (ids) => {
  let sql =
    "SELECT * FROM publication_likes WHERE user_id = ? AND publication_id = ?";
  sql = mysql.format(sql, ids);
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(new Error(err));
      resolve(result);
    });
  });
};

Like.add = (ids) => {
  let sql = "INSERT INTO publication_likes VALUES(NULL, ?, ?)";
  sql = mysql.format(sql, ids);
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(new Error(err));
      resolve(result);
    });
  });
};

Like.remove = (ids) => {
  let sql =
    "DELETE FROM publication_likes WHERE user_id = ? AND publication_id = ?";
  sql = mysql.format(sql, ids);
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(new Error(err));
      resolve(result);
    });
  });
};

module.exports = Like;
