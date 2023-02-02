import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { Web3AuthCore } from "@web3auth/core";
import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
} from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import RPC from "./solanaRPC";
import "./App.css";
import  Auth from "./Auth";


import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react";

function App() {
  // const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [web3auth, setWeb3auth] = useState<Web3AuthCore | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [currentWallet, setCurrentWallet] = useState<String | null>(null);
  const [dynamicStatus, setDynamicStatus] = useState(false);

  const {
    user,
    handleLogOut,
    setShowAuthFlow,
    showAuthFlow,
    walletConnector,
    authToken,
  } = useDynamicContext();

  useEffect(() => {
    if (user?.walletPublicKey != null) {
      setCurrentWallet(user.walletPublicKey);
      setDynamicStatus(true);
    }
  }, [user?.walletPublicKey]);

  useEffect(() => {

  }, []);

  return (
    <div>
      <div className="container">
        <h1 className="title">Monkey Mayhem</h1>

        <div className="grid">
        <iframe
        title="8thwall"
        className="h-140 w-full"
        src="https://8thwall.8thwall.app/vps-world-explorer/"
        allow="camera;gyroscope;accelerometer;magnetometer;xr-spatial-tracking;microphone;geolocation;"
      />
        </div>

        <Auth />

        <footer className="footer">
          <a
            href="https://docs.google.com/document/d/1Lu1p_RpNh1k0RUjsf6GCjlygCdKE467NFNGUYCBnK1I/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>

          <a
            href="https://docs.google.com/document/d/1jgUsda3gG1w3JZJsCw6HVHUYsBcSnxvuDLJRabZy66o/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
