const PPRoute = require("express").Router();
const {
    Candidate,
    PartyRegister,
    CandidateRegister,
} = require("../controller/PP");

PPRoute.get("/candidate", Candidate);
PPRoute.post("/registerCandidate", CandidateRegister);
PPRoute.post("/registerParty", PartyRegister);

module.exports = PPRoute;
