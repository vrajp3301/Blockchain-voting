const BlockChainModel = require("../models/BlockChain");
const Blockchain = require("../utils/Blockchain");
const response = require("../utils/Response");
const blockchain = new Blockchain();

const Vote = (req, res) => {
    /**
     * BODY: candidateId
     */
    if (blockchain.exists(req.session.user.voterId)) {
        return response(res, false, "You have already voted");
    } else {
        var resp = blockchain.newBlock(Date.now(), {
            voterId: req.session.user.voterId,
            aadharId: req.session.user.aadharId,
            panId: req.session.user.panId,
            vote: req.body.candidateId,
        });
        if (resp == true) {
            let lb = blockchain.lastBlock();
            const query = new BlockChainModel({
                index: lb.index,
                timestamp: lb.timestamp,
                data: lb.data,
                prevHash: lb.prevHash,
                hash: lb.hash,
            });
            query.save().then(
                (result) => {
                    return response(res, true, "Vote Casted Successfully");
                },
                (err) => {
                    return response(res, false, "Unable to cast you vote", err);
                }
            );
        }
    }
};

const isValidChain = (req, res) => {
    let isVaild = blockchain.isValidChain();
    return response(res, true, "Valid Chain Success", {
        isValid: isVaild,
        lastHash: blockchain.lastBlock.hash,
    });
};

module.exports = { Vote, isValidChain };
