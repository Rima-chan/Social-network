require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
    try {
        const headers = req.headers;
        const cookie = req.headers.cookie;
        const access_token = cookie ? cookie.split('=')[1] : null;
        if (!cookie || !access_token) {
            return res.status(401).json({error: 'Missing token in cookie'});
        }
        if (!headers || !headers['x-xsrf-token']) {
            return res.status(401).json({error: 'Missing XSRF token in headers'}); 
        }
        const xsrfToken = headers['x-xsrf-token'];
        const decodedToken = jwt.verify(access_token, process.env.RANDOM_TOKEN_KEY);
        if (xsrfToken !== decodedToken.xsrfToken) {
            return res.status(401).json({error: 'Bad XSRF token'});
        }
        const userId = decodedToken.userId; 
        const user = await User.findById('id, email, username, avatar, isAdmin', userId);
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        } else {
            req.user = user;
            next();
        }
    } catch(err) {
        res.status(500).json({error: 'Internal error : ' + err})
    }
}