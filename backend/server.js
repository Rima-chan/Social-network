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

app.use(cors());
app.use(bodyParser.urlencoded());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api', userRoutes);
app.use('/api', publicationRoutes);
app.use('/api', publicationLikesRoutes);
app.use('/api/publications', commentRoutes);

const port = process.env.DB_PORT || 8080;

app.listen(port, () => {
    console.log(`Listening on port : ${port}`)
})   