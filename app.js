const path = require("path");
const xss = require("xss-clean");
const express = require("express");
const Routes = require("./routes/routes");
const AppError = require("./utils/error");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(xss());
app.use("/api/v1", Routes);
app.use("/*", (req, res, next) => {
  next(new AppError("Sorry, this route doesn´t exist", 500));
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
