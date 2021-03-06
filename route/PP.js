const PPRoute = require("express").Router();
const {
    Candidate,
    PartyRegister,
    CandidateRegister,
    Party
} = require("../controller/PP");

PPRoute.get("/candidate", Candidate);
PPRoute.get("/party", Party);
PPRoute.post("/registerCandidate", CandidateRegister);
PPRoute.post("/registerParty", PartyRegister);

module.exports = PPRoute;
