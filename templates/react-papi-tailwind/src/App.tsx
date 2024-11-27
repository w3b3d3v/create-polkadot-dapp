import { type ChainId } from "@reactive-dot/core";

import { ConnectionButton } from "dot-connect/react.js";

import "./App.css";
import { ChainSwitch } from "./components/ChainSwitch";
import { ChainPage } from "./ChainPage";

import polkadotLogo from "./assets/polkadot-logo.svg";

import { AccountList } from "./components/AccountList";

function App({ chainId, setChainId }: {
  chainId: ChainId;
  setChainId: React.Dispatch<React.SetStateAction<ChainId>>
}) {

  return (
    <>
      <div className="fixed top-10 right-10">
        <div className="inline-block ml-5">
          <ConnectionButton />
        </div>
        <div className="inline-block ml-5">
          <ChainSwitch chainId={chainId} setChainId={setChainId} />
        </div>
      </div>

      <img src={polkadotLogo} className="mx-auto h-52	p-4 logo" alt="Polkadot logo" />
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
