const CandidateModel = require("../models/Candidate");
const response = require("../utils/Response");
const OId = require("mongoose").Types.ObjectId;
const Candidate = (req, res) => {
    let query = {};
    if (req.body.candidateId) query._id = OId(req.body.candidateId);
    CandidateModel.find(query).then(
        (result) => {
            console.log(result);
            return response(res, true, "Candidate fetch Success", result);
        },
        (err) => {
            return response(res, false, "Unable to fetch candidate", err);
        }
    );
};

module.exports = { Candidate };
