const secp = require("ethereum-cryptography/secp256k1")
const {keccak256} = require("ethereum-cryptography/keccak")
const {utf8ToBytes,toHex} = require("ethereum-cryptography/utils")

// function generate(privatekeys,addresses){
//     for(let i =0;i<3;i++){
//         const PRIVATE_KEY = secp.utils.randomPrivateKey()
//         const PUBLIC_KEY = secp.getPublicKey(PRIVATE_KEY)
//         const address = keccak256(PUBLIC_KEY.slice(1,PUBLIC_KEY.length)).slice(-20)
//         privatekeys.push(PRIVATE_KEY)
//         addresses.push(address)
//     }
// }
// It' not safe to send private keys so we are sending the signatures
function generate(hash,signatures){
    for(let i =0;i<3;i++){
        const PRIVATE_KEY = secp.utils.randomPrivateKey()
        const signature = secp.signSync(hash,PRIVATE_KEY,{recovered:true});
        signatures.push(signature)
    }
}

function getAddress(hash,signature){
    const PUBLIC_KEY = secp.recoverPublicKey(hash,signature[0],signature[1])
    const address = keccak256(PUBLIC_KEY.slice(1,PUBLIC_KEY.length)).slice(-20)
    return address
}

module.exports = {generate:generate,getAddress:getAddress}