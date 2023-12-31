const express = require("express");
const baseRoutes = require("./routes/base");
const ExpressError = require("./expressError");

const app = express();

app.use(express.json());
app.use("/base", baseRoutes);

// 404 handler
// app.use(function (req, res, next) {
//   return new ExpressError("Not Found", 404);
// });

// general error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: err.message,
  });
});

module.exports = app;
