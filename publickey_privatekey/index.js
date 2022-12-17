const toHash = require("./toHash")
const address = require("./address")
const secp = require("ethereum-cryptography/secp256k1")
const {utf8ToBytes,toHex} = require("ethereum-cryptography/utils")

const message = "MITRA DI CHHATTRI"
const hash = toHash(message)

const PRIVATE_KEY = secp.utils.randomPrivateKey()
const sign = secp.signSync(hash, PRIVATE_KEY, {recovered:true})

const add = address(sign,hash)
console.log(add)