const express = require("express");
const { NotFoundError } = require("./expressError");
const app = express();

const itemRouter = require("./itemRoutes");
const { items } = require("./fakeDb");
const morgan = require("morgan");

// const request = require("supertest");



// // process traditional form data => req.body
// app.use(express.urlencoded({ extended: true }));

//simple logging info for middleware
app.use(morgan('dev'));

// process JSON body => req.body
app.use(express.json());
app.use("/items", itemRouter);


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;