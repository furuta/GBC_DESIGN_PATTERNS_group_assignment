import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Web3ContextProvider from "./web3-context";
ReactDOM.render(
  <BrowserRouter>
    <Web3ContextProvider>
      <App />
    </Web3ContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
