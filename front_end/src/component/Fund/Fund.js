import React, { useState, useContext } from "react";
import web3 from "web3";
import contractInfo from "../../contractInfo";
import { Web3Context } from "../../web3-context";
import "./Fund.scss";
function Fund(props) {
  const [fundValue, setFundValue] = useState("");
  const web3Context = useContext(Web3Context);
  const fund = async () => {
    console.log(web3Context.accounts);
    await contractInfo.methods
      .fund(props.user)
      .send({
        from: web3Context.accounts[0],
        value: web3.utils.toWei(fundValue)
      })
      .once("receipt", async result => {
        console.log(result);
      });
  };
  return (
    <div className="fund">
      <div className="fund_title">{props.name}</div>
      <div className="fund_reason">
        <span>Reason: </span>
        <p>{props.reason}</p>
      </div>
      <div className="fund_money">
        <span>{web3.utils.fromWei(props.value, "ether")} Ether</span>
      </div>
      <div className="fund_money">
        <span>
          Funded: {web3.utils.fromWei(props.fundedValue, "ether")} Ether
        </span>
      </div>
      <div className="fund-form">
        <input
          type="number"
          id="name"
          className="form__input form__input-gray"
          placeholder="Value"
          value={fundValue}
          onChange={e => setFundValue(e.target.value)}
          required
        />
        <button className="fund_btn" onClick={fund}>
          <span>fund</span>
        </button>
      </div>
    </div>
  );
}

export default Fund;
