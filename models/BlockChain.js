const db = require("../db");
const mongoose = require("mongoose");

const BlockChainModel = db.model(
    "BlockChain",
    new mongoose.Schema({}),
    "BlockChain"
);

module.exports = BlockChainModel;
