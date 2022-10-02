const mysql = require("mysql2");
const db = require("../config/db");

// eslint-disable-next-line func-names
const Post = function (post) {
  this.userId = post.userId;
  this.content = post.content;
  this.attachment = post.attachment;
  this.comments = 0;
  this.likes = 0;
};

Post.create = (newPost) => {
  let sql =
    "INSERT INTO Post (userId, content, attachment, comments, likes) VALUES(?, ?, ?, ?, ?)";
  sql = mysql.format(sql, newPost);
  return new Promise((resolve, reject) => {
    db.query(sql, (err) => {
      if (err) reject(new Error("Cannot create post", err));
      resolve({ message: "Post created !" });
    });
  });
};

Post.findById = (postId) => {
  let sql = "SELECT * FROM Post WHERE id = ?";
  sql = mysql.format(sql, postId);
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(new Error("Cannot find post in DB", err));
      resolve(result);
    });
  });
};

Post.update = (updatedPost) => {
  let sql =
    "UPDATE Posts SET content = ?, image_url = ?, updated_at = NOW() WHERE id = ?";
  sql = mysql.format(sql, updatedPost);
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(new Error("Cannot update post", err));
      resolve(result);
    });
  });
};

Post.updateComment = (nbAndId) => {
  let sql = "UPDATE Posts SET comments = ? WHERE id = ?";
  sql = mysql.format(sql, nbAndId);
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(new Error("Cannot update number of comments", err));
      resolve(result);
    });
  });
};

Post.updateLike = (nbAndId) => {
  let sql = "UPDATE Posts SET likes = ? WHERE id = ?";
  sql = mysql.format(sql, nbAndId);
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(new Error("Cannot update number of likes", err));
      resolve(result);
    });
  });
};

Post.delete = (postId) => {
  let sql = "DELETE FROM Posts WHERE id = ?";
  sql = mysql.format(sql, postId);
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(new Error("Cannot delete post", err));
      resolve(result);
    });
  });
};

Post.getAll = () => {
  const sql = "SELECT * FROM Posts";
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) reject(new Error("Cannot find posts", err));
      resolve(result);
    });
  });
};

module.exports = Post;
