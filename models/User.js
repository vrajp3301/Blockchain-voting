const db = require("../db");
const mongoose = require("mongoose");

const UserModel = db.model(
    "User",
    new mongoose.Schema({
        fname: { type: String, required: true },
        lname: { type: String, required: true },
        aadharId: { type: String, required: true, unique: true, length: 12 },
        voterId: { type: String, required: true, unique: true },
        panId: { type: String, required: true, unique: true },
        dob: { type: Date, required: true },
        mobile: { type: String, required: true, unique: true, length: 10 },
        email: { type: String, required: true, unique: true },
        isVerified: { type: Boolean, default: false },
        otp: { type: Number, default: null },
    }),
    "User"
);

module.exports = UserModel;
