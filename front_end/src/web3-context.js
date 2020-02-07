import React, { useState } from "react";

export const Web3Context = React.createContext({
  accounts: "",
  setAccounts: () => {},
  setWeb3: () => {},
  web3: ""
});
const Web3ContextProvider = props => {
  const [accounts, setAccounts] = useState("");
  const [web3, setWeb3] = useState("");
  return (
    <Web3Context.Provider
      value={{
        accounts: accounts,
        setAccounts: setAccounts,
        web3: web3,
        setWeb3: setWeb3
      }}
    >
      {props.children}
    </Web3Context.Provider>
  );
};
export default Web3ContextProvider;
