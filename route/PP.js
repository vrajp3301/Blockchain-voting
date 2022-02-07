const PPRoute = require("express").Router();
const { Candidate } = require("../controller/PP");

PPRoute.get("/candidate", Candidate);

module.exports = PPRoute;
