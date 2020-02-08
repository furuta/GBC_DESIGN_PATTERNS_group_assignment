import React, { useState, useEffect, useContext, useCallback } from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import Funds from "./container/Funds/Funds";
import Wallet from "./container/Wallet/Wallet";
import RequestForm from "./container/RequestForm/RequestForm";
import getWeb3 from "./getWeb3";
import { Route, Switch, Redirect } from "react-router-dom";
import { Web3Context } from "./web3-context";
function App() {
  const [accounts, setAccounts] = useState("");
  const [web3, setWeb3] = useState("");
  const web3Context = useContext(Web3Context);
  const getAccounts = useCallback(async () => {
    const web3 = await getWeb3();
    setWeb3(web3);
    let accounts = await web3.eth.getAccounts();
    setAccounts(accounts);
    web3Context.setAccounts(accounts);
    web3Context.setWeb3(web3);
  }, [web3Context]);
  useEffect(() => {
    getAccounts();
  }, [getAccounts]);
  return (
    <Layout>
      <Switch>
        <Route path="/fund" render={() => <Funds />} />
        <Route
          path="/borrow"
          render={() => <RequestForm account={accounts[0]} web3={web3} />}
        />
        <Route path="/wallet" render={() => <Wallet />} />
        <Redirect from="/" to="/fund" />
      </Switch>
    </Layout>
  );
}

export default App;
