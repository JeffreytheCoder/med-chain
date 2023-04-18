
<h1 align="center">
  <br>
  <a href="http://www.amitmerchant.com/electron-markdownify"><img src="https://github.com/JeffreytheCoder/med-chain/blob/master/client/src/assets/tealNoBG-cropped.png?raw=true" alt="Markdownify" width="300"></a>
  <br>
</h1>

<h4 align="center">A blockchain-based Electrical Medical Records (EMR) system.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-it-works">How It Works</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#support">Support</a>
</p>

## Key Features

MedChain is powered by [IPFS](https://ipfs.tech/), where every patient's medical records are stored on the distributed file system, not owned by any centralized entity like hospitals or governments. Each patient has a digital identity on [Ethereum](https://ethereum.org/) blockchain, who and whose doctor can access medical records by interacting with smart contracts. 

On MedChain,

- A healthcare provider can register using a crypto wallet like Metamask.
- The healthcare provider can register a patient by using the public address of the patient’s wallet, usually provided during an appointment.
- The health provider can search for a patient’s records using the address, and upload a new record for the patient. 
- The patient can also view his or her records, after connected with a wallet which address is registered by the health provider.

This project is the 3rd place winner of [NextStep Hacks 2022](https://devpost.com/software/medchain-k4wzry).

## How It Works

There are three major components of MedChain:

1. React client (connected with MetaMask)
2. Solidity smart contract on Ethereum blockchain
3. Interplanetary file system (IPFS)

<p align="center">
<img src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/187/785/datas/original.png" width="700"/>
</p>

The client first connects with crypto wallet, and use smart contract to mint a patient or doctor block if the public address of the user’s wallet is not registered.

The client can upload a record file to IPFS, which address is linked to a patient block in ETH chain. The client can get all record addressed stored in a patient block from smart contract, and get a record file by its address from IPFS.

## How To Use

Install Truffle globally if you haven't.

```sh
$ npm install -g truffle
```

Install Truffle dependencies and deploy smart contracts to local Ethereum network like [Ganache](https://trufflesuite.com/ganache/). 

```sh
$ cd truffle
$ npm install
$ truffle compile
$ truffle deploy
```

Install React dependencies and start React app. 

```sh
$ cd ../client
$ npm install
$ npm start
```

You should be able to see the application running at http://localhost:3000.


## Support

If you like this project, please leave a star ⭐️. This helps more people to know this project.

---

> [jeffreyyu.dev](https://jeffreyyu.dev/) &nbsp;&middot;&nbsp;
> GitHub [@jeffreythecoder](https://github.com/JeffreytheCoder/JeffreytheCoder) &nbsp;&middot;&nbsp;
> Twitter [@jeffreyzepengyu](https://twitter.com/jeffreyzepengyu)

