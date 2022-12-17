
const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;
const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
    let transactions = []
    while(transactions.length < MAX_TRANSACTIONS && mempool.length>0){
        transactions.push(mempool.pop())
    }
    let a = {id:blocks.length,transactions}
    a.nonce = 0;
    let hash;

    while(true){
        hash = SHA256(JSON.stringify(a)).toString()
        if(`0x${hash}` < TARGET_DIFFICULTY){
            break;
        }
        a.nonce++;
    }
    blocks.push({...a,hash})
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction,
    mine,
    blocks,
    mempool
};