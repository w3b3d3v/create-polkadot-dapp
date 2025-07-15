# react-solidity-remix template

This template sets up a combination of Solidity smart contracts and a React front-end app that interacts with these
smart contracts.  
This template includes

* [ethers](https://docs.ethers.org/v6/) for smart contract interaction
* [Tailwind CSS](https://tailwindcss.com) + [Tailwind UI](https://tailwindui.com/).
* [Vite](https://vite.dev/) for dev tooling.

## Writing smart contracts

Currently, two ways of developing smart contracts are supported. Both are deploying to Passet Hub.

### Remix

1. Install remixd globally: `npm install -g @remix-project/remixd`
2. Run `npm run remixd` in `contracts` dir to start remixd environment.
3. Go to https://remix.polkadot.io and activate REMIXD plugin.
4. Start hacking! Changes performed in Remix will be synced to local file system.
5. Deploy **and pin** your smart contract; it'll be saved on your file system.

### Local development

1. Edit smart contracts in `contracts` dir.
2. Run `npm run build` to compile smart contracts.
3. Run `npm run deploy-contracts` to deploy them.  
   Required environment variables:
  * `ACCOUNT_SEED`: seed phrase for the account that will sign the deployment.
  * `RPC_URL`: for Passet Hub, `https://testnet-passet-hub-eth-rpc.polkadot.io`, for kitchensink, probably `http://localhost:8545`.

## Interacting with smart contracts from frontend app

1. Run `npm run import-contracts` to generate contracts data from deployed contracts
2. Run `npm run dev` to start `vite` environment
3. You can import all exported contracts using `import { contracts } from "./contracts"`
4. You can call your contracts like this:

```ts
import { Contract, formatEther } from "ethers";
import { contracts, ContractData } from "./contracts"

const contractData: ContractData = contracts["1b5b93a223026219f4f75e5b90c20970ab976451"];
const contract = new Contract(contractData.address, contractData.abi, signer);

const transactionResponse = await contract.retrieve(); // method on your smart contract
```

More info at:
* [contracts.polkadot.io](https://contracts.polkadot.io/): docs on smart contracts
* [ethers docs](https://docs.ethers.org/v6/)  

