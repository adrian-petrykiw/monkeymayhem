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
    const init = async () => {
      try {
        const clientId = process.env.NEXT_PUBLIC_WEB3_AUTH_ID;

        if (clientId) {
          const web3auth = new Web3AuthCore({
            clientId,
            web3AuthNetwork: "mainnet", // mainnet, aqua, celeste, cyan or testnet
            chainConfig: {
              chainNamespace: CHAIN_NAMESPACES.SOLANA,
              chainId: "0x1",
              rpcTarget: "https://rpc.ankr.com/solana", // This is the public RPC we have added, please pass on your own endpoint while creating an app
            },
          });
          setWeb3auth(web3auth);

          const openloginAdapter = new OpenloginAdapter();
          web3auth.configureAdapter(openloginAdapter);
          // await web3auth.initModal();
          await web3auth.init();

          if (web3auth.provider) {
            setProvider(web3auth.provider);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    // const web3authProvider = await web3auth.connect();
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        // mfaLevel: "none", // Pass on the mfa level of your choice: default, optional, mandatory, none
        loginProvider: "google",
      }
    );
    setProvider(web3authProvider);
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const idToken = await web3auth.authenticateUser();
    uiConsole(idToken);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    uiConsole(user);
  };

  const logout = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    uiConsole(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    uiConsole(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    uiConsole(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    uiConsole(privateKey);
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const dynamicLogout = (
    <div>
      <button className="card" onClick={handleLogOut}>
        Log Out
      </button>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}>Solana login successful!</p>
      </div>
    </div>
  );

  const regularLogout = (
    <div>
      <div className="flex-container">
        {/* <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={authenticateUser} className="card">
            Get ID Token
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get Account
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={sendTransaction} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div>
        <div>
          <button onClick={getPrivateKey} className="card">
            Get Private Key
          </button>
        </div> */}
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>

      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}>Email login successful!</p>
      </div>
    </div>
  );

  const loggedInView = <div>{provider ? regularLogout : dynamicLogout}</div>;

  const loggedoutView = (
    <div>
      <div>
        <DynamicWidget
          buttonClassName="dynamicButton"
          innerButtonComponent="Redeem with Solana"
        />
      </div>
      <div>
        <button onClick={login} className="card">
          Redeem with Google
        </button>
      </div>
    </div>
  );

  return (
    <div className="container">
      <h1 className="title">Monkey Mayhem</h1>

      <div className="grid">
        {provider || user ? loggedInView : loggedoutView}
      </div>

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
  );
}

export default App;
