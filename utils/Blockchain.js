const Block = require("./Block");

class Blockchain {
    constructor() {
        this.chain = [this.genesisBlock()];
    }
    genesisBlock() {
        return new Block(0, Date.now(), { id: "0000" }, "0");
    }
    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }
    get lastIndex() {
        return this.chain.length;
    }
    newBlock(timestamp, data) {
        let tempBlock = new Block(this.lastIndex, timestamp, data, "0");
        tempBlock.prevHash = this.lastBlock.hash;
        tempBlock.hash = tempBlock.computeHash();
        this.chain.push(tempBlock);
        return true;
    }
    get isValidChain() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const nextBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }
            if (currentBlock.prevHash !== nextBlock.hash) {
                return false;
            }
        }
        return true;
    }
    exists(v_id) {
        for (let i = 1; i < this.chain.length; i++) {
            const curr_v_id = this.chain[i].data.v_id;
            if (curr_v_id == v_id) {
                return true;
            }
        }
        return false;
    }
}

module.exports = Blockchain;
