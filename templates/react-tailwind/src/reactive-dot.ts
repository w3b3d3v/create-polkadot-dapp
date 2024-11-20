import { polkadot, paseo, polkadot_asset_hub, paseo_asset_hub } from "@polkadot-api/descriptors";
import { defineConfig } from "@reactive-dot/core";
import { InjectedWalletProvider } from "@reactive-dot/core/wallets.js";
import { LedgerWallet } from "@reactive-dot/wallet-ledger";
// import { WalletConnect } from "@reactive-dot/wallet-walletconnect";
import { chainSpec as polkadotChainSpec } from "polkadot-api/chains/polkadot";
import { chainSpec as polkadotAHChainSpec } from "polkadot-api/chains/polkadot_asset_hub";
import { chainSpec as paseoChainSpec } from "polkadot-api/chains/paseo";
import { chainSpec as paseoAHChainSpec } from "polkadot-api/chains/paseo_asset_hub";
import { getSmProvider } from "polkadot-api/sm-provider";
import { startFromWorker } from "polkadot-api/smoldot/from-worker";
import { registerDotConnect } from "dot-connect";

const smoldot = startFromWorker(
  new Worker(new URL("polkadot-api/smoldot/worker", import.meta.url), {
    type: "module"
  })
);

const wallets = [
  new InjectedWalletProvider(),
  new LedgerWallet(),
  // Uncomment to configure WalletConnect.
  //new WalletConnect({
  //  projectId: "WALLET_CONNECT_PROJECT_ID",
  //  providerOptions: {
  //    metadata: {
  //      name: "APP_NAME",
  //      description: "APP_DESCRIPTION",
  //      url: "APP_URL",
  //      icons: ["APP_ICON"]
  //    }
  //  },
  //  // https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-13.md
  //  chainIds: [
  //    "polkadot:91b171bb158e2d3848fa23a9f1c25182" // Polkadot
  //  ],
  //  optionalChainIds: [
  //    "polkadot:91b171bb158e2d3848fa23a9f1c25182", // Polkadot
  //    "polkadot:b0a8d493285c2df73290dfb7e61f870f", // Kusama
  //    "polkadot:77afd6190f1554ad45fd0d31aee62aac", // Paseo
  //    "polkadot:e143f23803ac50e8f6f8e62695d1ce9e" // Westend
  //  ]
  //})
];

const polkadotChain = smoldot.addChain({ chainSpec: polkadotChainSpec });
const polkadotAHChain = polkadotChain.then(chain => smoldot.addChain({
  chainSpec: polkadotAHChainSpec,
  potentialRelayChains: [chain]
}));

const paseoChain = smoldot.addChain({ chainSpec: paseoChainSpec });
const paseoAHChain = paseoChain.then(chain => smoldot.addChain({
  chainSpec: paseoAHChainSpec,
  potentialRelayChains: [chain]
}));


export const config = defineConfig({
  chains: {
    polkadot: {
      descriptor: polkadot,
      provider: getSmProvider(polkadotChain)
    },
    polkadot_asset_hub: {
      descriptor: polkadot_asset_hub,
      provider: getSmProvider(polkadotAHChain)
    },
    paseo: {
      descriptor: paseo,
      provider: getSmProvider(paseoChain)
    },
    paseo_asset_hub: {
      descriptor: paseo_asset_hub,
      provider: getSmProvider(paseoAHChain)
    }
  },
  wallets
});

registerDotConnect({ wallets });
