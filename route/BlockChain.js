const BCRoute = require("express").Router();
const { isValidChain, Vote } = require("../controller/BlockChain");

BCRoute.get("/isValidChain", isValidChain);
BCRoute.post("/vote", Vote);

module.exports = BCRoute;
