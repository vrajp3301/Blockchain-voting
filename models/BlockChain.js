const db = require("../db");
const mongoose = require("mongoose");

const BlockChainModel = db.model(
    "BlockChain",
    new mongoose.Schema({
        index: { type: String, required: true, unique: true },
        timestamp: { type: String, required: true },
        data: { required: true },
        prevHash: { type: String, required: true },
        hash: { type: String, required: true },
    }),
    "BlockChain"
);

module.exports = BlockChainModel;
