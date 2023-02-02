import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <DynamicContextProvider
      settings={{
        appLogoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/3/34/Examplelogo.svg",
        appName: "Example App",
        environmentId: "35ffa6e7-6b7b-4351-8c2a-4a025022a2db",
      }}
    >
      <App />
    </DynamicContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
