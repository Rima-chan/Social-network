const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const postLikesRoutes = require("./routes/postLikes");

const app = express();

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   next();
// });
app.use(cors());
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
// app.use(function(req, res, next) {
//     res.header('Content-Type', 'application/json;charset=UTF-8');
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });
// app.use(cors(), function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//     res.header(
//        "Access-Control-Allow-Headers",
//        "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//  });

module.exports = app;
