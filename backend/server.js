require("dotenv").config();
const app = require("./app");
const port = process.env.DB_PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port : ${port}`);
});
