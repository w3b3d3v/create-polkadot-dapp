# create-polkadot-dapp

Create Polkadot DApp in one command:

```
npx create-polkadot-dapp@latest
```

## Templates

* [react-papi-tailwind](https://github.com/paritytech/create-polkadot-dapp/tree/master/templates/react-papi-tailwind):<br/>
  React front-end app with [PAPI](papi.how) [ReactiveDOT](https://reactivedot.dev) + [dotconnect](https://dotconnect.dev/) for chain and wallet interactions.<br/>
  [Tailwind CSS](https://tailwindcss.com) + [Tailwind UI](https://tailwindui.com/). <br/>
  [Vite](https://vite.dev/) for dev tooling.
* [react-solidity-hardhat](https://github.com/paritytech/create-polkadot-dapp/tree/master/templates/react-solidity-hardhat) modern smart contract + react app template, with:
  * [OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/) smart contract library.
  * [hardhat](https://hardhat.org/) smart contract development tooling.
  * [wagmi](https://wagmi.sh/) for smart contract interaction.
  * [Tailwind CSS](https://tailwindcss.com) + [Tailwind UI](https://tailwindui.com/).
  * [Vite](https://vite.dev/) for dev tooling.
* [react-solidity-remix](https://github.com/paritytech/create-polkadot-dapp/tree/master/templates/react-solidity) (deprecated) a monorepo for smart contracts for AssetHub and a React, [Tailwind CSS](https://tailwindcss.com) and [ethers](https://docs.ethers.org/v6/)

## Planned templates
* papi-nodejs: pure server-side application with polkadot-api

## Development

### How to spawn template from local copy
```
cd <path-to-create-polkadot-dapp>
yarn install && yarn build
cd <path-where-to-spawn-the-app>
npx --yes --package=<path-to-create-polkadot-dapp>/dist create-polkadot-dapp
```

### Adding new template
Add sources to `templates/` directory. These will be copied to target directory.  
Add new configuration to `src/templateConfigs/` and export it from `index.ts`. The exported name must match the directory name in `templates/`.

### Back sync
It can be more convenient to develop template code outside of `create-polkadot-dapp`.  
Use `yarn back-sync --source <spawned_repo_path> --template <template_name>` to sync files from a spawned repo back into the template.  
`back-sync` uses `.gitignore` to filter out files that need syncing.  
