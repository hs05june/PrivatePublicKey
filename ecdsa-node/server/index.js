const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const {generate,getAddress}  = require("./generate")
const {toHex} = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const message = "MITRA DI CHHATRI"
const hash = keccak256(utf8ToBytes(message))

let signatures = [] 
let balances = {}

generate(hash,signatures)

let amount = 100

signatures.forEach((e)=>{
  let address = getAddress(hash,e)
  balances[toHex(address)] = amount
  amount-=25
})

for(let i in balances){
  console.log(i, balances[i])
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
