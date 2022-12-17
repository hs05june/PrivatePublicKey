const Block = require('./Block');
const SHA256 = require("crypto-js/sha256")

class Blockchain {
    constructor() {
        this.chain = [ new Block() ];
    }
    addBlock(block){
        block.previousHash = this.chain[this.chain.length-1].toHash()
        this.chain.push(block)
    }
    isValid(){
        for(let i = this.chain.length-1;i>0;i--){
            let block = this.chain[i]
            let previous = this.chain[i-1]
            if(block.previousHash.toString()!=previous.toHash().toString()){
                return false;
            }
        }
        return true
    }
    lastBlock(){
        return this.chain[this.chain.length-1];
    }
}

module.exports = Blockchain;