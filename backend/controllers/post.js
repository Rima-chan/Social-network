require("dotenv").config();
const fs = require("fs");
const Post = require("../models/post");

exports.createNewPost = (req, res) => {
  const { content } = req.body;
  const attachment = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : undefined;
  const userId = req.user[0].id;

  if (!content && !attachment) {
    return res.status(400).json({ error: "Missing parameters" });
  }
  if (!userId) {
    return res.status(500).json({ error: "Cannot identify user" });
  }

  const newPost = new Post({
    userId,
    content,
    attachment,
  });
  Post.create([
    newPost.userId,
    newPost.content,
    newPost.attachment,
    newPost.comments,
    newPost.likes,
  ])
    .then((response) => res.status(201).json({ response }))
    .catch((err) => {
      res.status(400).json({ error: "Cannot create Post", err });
    });
};

exports.getOnePost = (req, res) => {
  const postId = parseInt(req.params.id, 10);
  Post.findById(postId)
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(500).json({ err }));
};

exports.updatePost = async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const userId = parseInt(req.user[0].id, 10);
  if (!req.body.content && !req.file) {
    return res.status(400).json({ error: "Missing parameters" });
  }
  try {
    const post = await Post.findById(postId);
    if (post.length === 0) {
      return res.status(404).json({ error: "post not found" });
    }
    if (userId !== post[0]?.user_id) {
      return res.status(403).json({ error: "Unauthorized request" });
    }
    const content = req.body.content ? req.body.content : post[0].content;
    let attachment = req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null;
    const deleteOldImage = req.body.deleteImage
      ? parseInt(req.body.deleteImage, 10)
      : null;

    if (attachment) {
      if (post[0].image_url) {
        const filename = post[0].image_url?.split("/images/")[1];
        fs.unlink(`images/${filename}`, (error) => {
          if (error) throw error;
        });
      }
    } else if (post[0].image_url && deleteOldImage === 1) {
      const filename = post[0].image_url?.split("/images/")[1];
      fs.unlink(`images/${filename}`, (error) => {
        if (error) throw error;
      });
    } else {
      attachment = post[0].image_url;
    }

    Post.update([content, attachment, postId])
      .then((response) => {
        res.status(200).json({ data: response });
      })
      .catch(() => {
        res.status(500).json({ error: "Cannot update Post" });
      });
  } catch (err) {
    console.log(err);
  }
};

exports.deletePost = async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const userId = parseInt(req.user[0].id, 10);
  const { isAdmin } = req.user[0];

  try {
    const post = await Post.findById(postId);
    if (post.length === 0) {
      return res.status(404).json({ error: "post not found" });
    }
    if (userId === post[0]?.user_id || isAdmin === 1) {
      Post.delete(postId)
        .then(() => {
          if (post[0].image_url) {
            const filename = post[0].image_url?.split("/images/")[1];
            fs.unlink(`images/${filename}`, (error) => {
              if (error) throw error;
            });
          }
          return res.status(200).json({ message: "Post successfully deleted" });
        })
        .catch(() => {
          res.status(500).json({ error: "Cannot delete Post" });
        });
    } else {
      return res.status(403).json({ error: "Unauthorized request" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getAllPosts = (req, res) => {
  Post.getAll()
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(500).json({ error: "Cannont find Posts", err }));
};
