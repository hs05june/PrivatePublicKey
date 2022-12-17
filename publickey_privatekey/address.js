const toHash = require("./toHash");
const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function address(sign,hash) {
  const PUBLIC_KEY = secp.recoverPublicKey(hash, sign[0], sign[1]);
  return toHex(keccak256(PUBLIC_KEY.slice(1,PUBLIC_KEY.length)).slice(-20))
}

module.exports = address