import React from "react";
import "./loanInfo.scss";
function loanInfo(props) {
  return (
    <div className="loan_form form_animation">
      <div className="form__group">
        <input
          id="ether"
          pattern="^\d*(\.\d{0,2})?$"
          className="form__input"
          placeholder="Ether"
          value={props.amountOfMoney}
          onChange={props.change("amountOfMoney")}
          required
        />
        <label htmlFor="ether" className="form__label">
          Ether
        </label>
      </div>
      <div className="form__group">
        <textarea
          id="reason"
          className="form__input"
          placeholder="Reason"
          value={props.reason}
          onChange={props.change("reason")}
          required
        />
        <label htmlFor="reason" className="form__label">
          Reason
        </label>
      </div>
    </div>
  );
}

export default loanInfo;
