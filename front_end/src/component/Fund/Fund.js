import React from "react";
import web3 from "web3";
import "./Fund.scss";
function Fund(props) {
  const [fundValue, setFundValue] = React.useState("");
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
        <span>Funded: {props.fundedValue} Ether</span>
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
        <button className="fund_btn">
          <span>fund</span>
        </button>
      </div>
    </div>
  );
}

export default Fund;
