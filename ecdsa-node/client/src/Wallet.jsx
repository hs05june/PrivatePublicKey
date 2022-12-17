import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1'
import {utf8ToBytes,toHex} from 'ethereum-cryptography/utils'
import {keccak256} from 'ethereum-cryptography/keccak'

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    setPrivateKey(evt.target.value)
    const PUBLIC_KEY = secp.getPublicKey(evt.target.value)
    const address = toHex(keccak256(PUBLIC_KEY.slice(1,PUBLIC_KEY.length)).slice(-20))
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type an address, for example: 0x1" value={privateKey} onChange={onChange}></input>
      </label>
      <label>
        Address
        <input value={address}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
