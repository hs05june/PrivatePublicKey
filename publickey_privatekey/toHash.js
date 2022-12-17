const {sha256} = require("crypto-js/sha256")
const {utf8ToBytes,toHex} = require("ethereum-cryptography/utils")
const {keccak256} = require("ethereum-cryptography/keccak")

function toHash(message){
    return toHex(utf8ToBytes(message))
}

module.exports = toHash;