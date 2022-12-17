const Blockchain = require('./Blockchain');
const Block = require('./Block');
const assert = require('assert');
const SHA256 = require("crypto-js/sha256");

let blockchain = new Blockchain(); 
blockchain.addBlock(new Block("Dan"));
blockchain.addBlock(new Block("Peter"));
blockchain.addBlock(new Block("James"));
  
console.log(blockchain.lastBlock())
console.log(blockchain.isValid())