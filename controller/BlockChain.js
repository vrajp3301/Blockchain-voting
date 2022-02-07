const Blockchain = require("../utils/Blockchain");
const response = require("../utils/Response");
const blockchain = new Blockchain();

const Vote = (req, res) => {
    /**
     * BODY: candidateId
     */
    if (blockchain.exists(token.data.v_id)) {
        res.json({ success: false, msg: "You have already voted" });
    } else {
        var resp = blockchain.newBlock(Date.now(), req.body);
        if (resp == true) {
            var lb = blockchain.lastBlock();
            var query = {
                index: lb.index,
                timestamp: lb.timestamp,
                data: lb.data,
                prevHash: lb.prevHash,
                hash: lb.hash,
            };
            db.getDB()
                .collection(db_block)
                .insertOne(query, (err, result) => {
                    if (err) throw err;
                    res.json({
                        success: true,
                        msg: "Your vote has been casted",
                    });
                });
        } else {
            res.json({
                success: false,
                msg: "Unable to cast your vote! Try again",
            });
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
