/** Routes for sample app for items */

const express = require("express");

const db = require("./fakeDb");
const itemRouter = new express.Router();

module.exports = itemRouter;