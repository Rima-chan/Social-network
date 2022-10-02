const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const cookierParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const postLikesRoutes = require("./routes/postLikes");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookierParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", postLikesRoutes);
app.use("/api/publications", commentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

module.exports = app;
