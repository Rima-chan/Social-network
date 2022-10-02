require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const { headers } = req;
    const cookie = req.cookies;
    const accessToken = cookie.access_token;
    if (!cookie || !accessToken) {
      return res.status(401).json({ error: "Missing token in cookie" });
    }
    if (!headers || !headers["x-xsrf-token"]) {
      return res.status(401).json({ error: "Missing XSRF token in headers" });
    }
    const xsrfToken = headers["x-xsrf-token"];
    const decodedToken = jwt.verify(accessToken, process.env.RANDOM_TOKEN_KEY);
    if (xsrfToken !== decodedToken.xsrfToken) {
      return res.status(401).json({ error: "Bad XSRF token" });
    }
    const { userId } = decodedToken;
    const user = await User.findById(userId);
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: `Internal error : ${err}` });
  }
};
