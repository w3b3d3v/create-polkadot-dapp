import { type ChainId } from "@reactive-dot/core";

import { ConnectionButton } from "dot-connect/react.js";

import "./App.css";
import { ChainSwitch } from "./components/ChainSwitch";
import { ChainPage } from "./ChainPage";

import polkadotLogo from "./assets/polkadot-logo.svg";

import { AccountList } from "./components/AccountList";

function App({ chainId, setChainId }: { chainId: ChainId; setChainId: React.Dispatch<React.SetStateAction<ChainId>> }) {
  return (
    <>
      <div className="fixed right-10 top-10">
        <div className="ml-5 inline-block">
          <ConnectionButton />
        </div>
        <div className="ml-5 inline-block">
          <ChainSwitch chainId={chainId} setChainId={setChainId} />
        </div>
      </div>

      <img src={polkadotLogo} className="logo mx-auto h-52 p-4" alt="Polkadot logo" />
      <div className="container mx-auto p-2 leading-6">
        <ChainPage />
      </div>

      <div>
        <AccountList />
      </div>
    </>
  );
}

export default App;
