import React from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import Funds from "./container/Funds/Funds";
import RequestForm from "./container/RequestForm/RequestForm";
import { Route, Switch, Redirect } from "react-router-dom";
function App() {
  return (
    <Layout>
      {/* <Funds /> */}
      <Switch>
        <Route path="/fund" render={() => <Funds />} />
        <Route path="/borrow" render={() => <RequestForm />} />
        <Redirect from="/" to="/fund" />
      </Switch>
    </Layout>
  );
}

export default App;
