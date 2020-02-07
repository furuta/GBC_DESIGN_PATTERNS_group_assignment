import React from "react";
import "./Fund.scss";
function Fund(props) {
  return (
    <div className="fund">
      <div className="fund_title">Leo Dinh</div>
      <div className="fund_reason">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat
        </p>
      </div>
      <div className="fund_money">
        <span>1 Ether</span>
      </div>
      <button className="fund_btn">
        <span>fund</span>
      </button>
    </div>
  );
}

export default Fund;
