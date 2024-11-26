# react-solidity template

This template sets up a combination of Solidity smart contracts and a React front-end app that interacts with these
smart contracts.  
This template includes

* [ethers](https://docs.ethers.org/v6/) for smart contract interaction
* [Tailwind CSS](https://tailwindcss.com) + [Tailwind UI](https://tailwindui.com/).
* [Vite](https://vite.dev/) for dev tooling.

### Writing smart contracts

Currently, only Remix environment is supported.

1. Run `pnpm remixd` to start remixd environment.
2. Go to https://remix.polkadot.io and activate REMIXD plugin.
3. Start hacking! Changes performed in Remix will be synced to local file system.
4. After deploying and pinning a smart contract, it'll be saved on your file system, run `pnpm contracts:build` to
   export contract data.

### Interacting with smart contracts from frontend app

1. Run `pnpm frontend:dev` to start `vite` environment
2. You can import all exported contracts using `import { contracts } from "contracts"`
3. You can call your contracts like this:

```ts
import { Contract, formatEther } from "ethers";
import { contracts, ContractData } from "contracts"

const contractData: ContractData = contracts["1b5b93a223026219f4f75e5b90c20970ab976451"];
const contract = new Contract(contractData.address, contractData.abi, signer);

const transactionResponse = await contract.retrieve(); // method on your smart contract
```

More info at:  
* [contracts.polkadot.io](https://contracts.polkadot.io/): docs on smart contracts  
* [ethers docs](https://docs.ethers.org/v6/)  

