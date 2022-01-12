const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
const port = 9001;
app.listen(port, () => {
  console.log(`listening on port ${port}....`);
});
