const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, prevHash = " ") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.computeHash();
    }
    computeHash() {
        let dataBlock = [
            this.index,
            this.prevHash,
            this.timestamp,
            JSON.stringify(this.data),
        ];
        return SHA256(dataBlock.join("_#_")).toString();
    }
}

module.exports = Block;
