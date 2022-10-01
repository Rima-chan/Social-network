require("dotenv").config();
const User = require("../models/user");
const Post = require("../models/post");
const Like = require("../models/postLikes");

exports.handleLikes = async (req, res) => {
  const userId = parseInt(req.user[0].id, 10);
  const postId = parseInt(req.params.id, 10);
  try {
    const user = await User.findById("id", userId);
    const post = await Post.findById(postId);
    const isLiked = await Like.isLiked([userId, postId]);
    let likes;
    if (user.length === 0 || post.length === 0) {
      return res.status(404).json({ error: "Cannot found user or post" });
    }
    const like = new Like({
      userId,
      postId,
    });
    if (isLiked.length === 0) {
      likes = post[0].likes + 1;
      Like.add([like.userId, like.postId])
        .then(() => {
          post
            .updateLike([likes, postId])
            .then(() =>
              res.status(200).json({ message: "Like successfully added" })
            )
            .catch(() => res.status(500).json({ error: "Cannot add like" }));
        })
        .catch((err) => res.status(500).json({ err }));
    } else if (isLiked.length === 1) {
      console.log("dislike");
      likes = post[0].likes - 1;
      Like.remove([like.userId, like.postId])
        .then(() => {
          post
            .updateLike([likes, postId])
            .then(() =>
              res.status(200).json({ message: "Like successfully deleted" })
            )
            .catch(() => res.status(500).json({ error: "Cannot delete like" }));
        })
        .catch((err) => res.status(500).json({ err }));
    } else {
      return res.status(400).json({ error: "Wrong parameters" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Cannot handle like" });
  }
};
