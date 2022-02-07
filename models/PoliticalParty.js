const db = require("../db");
const mongoose = require("mongoose");

const PPModel = db.model(
    "PoliticalParty",
    new mongoose.Schema({
        name: { type: String, required: true, unique: true },
        chairman: { type: String, required: true, unique: true },
        viceChairman: { type: String, required: true, unique: true },
        description: { type: String },
        established: { type: Date },
    }),
    "PoliticalParty"
);

module.exports = PPModel;
