# create-polkadot-dapp

Create Polkadot DApp in one command:

```
npx create-polkadot-dapp
```
_FIXME: the package is yet to be published_


## Templates

* [react-tailwind](./templates/react-tailwind):<br/>
  React front-end app with [ReactiveDOT](https://reactivedot.dev) + [dotconnect](https://dotconnect.dev/) for chain and wallet interactions.<br/>
  [Tailwind CSS](https://tailwindcss.com) + [Tailwind UI](https://tailwindui.com/). <br/>
  [Vite](https://vite.dev/) for dev tooling.

## Planned templates
* react-tailwind-solidity: a unified setup for developing Solidity smart contracts on Asset Hub
* papi-nodejs: pure server-side application with polkadot-api

## Development

### How to spawn template from local copy
```
cd <path-to-create-polkadot-dapp>
yarn install && yarn build
cd <path-where-to-spawn-the-app>
npx --yes --package=<path-to-create-polkadot-dapp>/dist create-polkadot-dapp
```
