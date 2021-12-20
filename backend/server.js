require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const publicationRoutes = require('./routes/publication');
const commentRoutes =require('./routes/comment');
const publicationLikesRoutes = require('./routes/publicationLikes');
const path = require('path');

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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    next();
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api', userRoutes);
app.use('/api', publicationRoutes);
app.use('/api', publicationLikesRoutes);
app.use('/api/publications', commentRoutes);

const port = process.env.DB_PORT || 8080;

app.listen(port, () => {
    console.log(`Listening on port : ${port}`)
})   