require("dotenv").config();
const app = require("./app");

const port = process.env.DB_PORT || 8000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port : ${port}`);
});
