import React from "react";
import "./personalInfo.scss";
function personalInfo(props) {
  return (
    <div className="personal_form form_animation">
      <div className="form__group">
        <input
          type="text"
          id="name"
          className="form__input"
          placeholder="Full Name"
          value={props.name}
          onChange={props.change("name")}
          required
        />
        <label htmlFor="name" className="form__label">
          Full name
        </label>
      </div>
      <div className="form__group">
        <input
          type="text"
          id="address"
          className="form__input"
          placeholder="Address"
          value={props.address}
          onChange={props.change("address")}
          required
        />
        <label htmlFor="address" className="form__label">
          Address
        </label>
      </div>
      <div className="form__group">
        <input
          type="number"
          id="phone"
          className="form__input"
          placeholder="Phone"
          value={props.phone}
          onChange={props.change("phone")}
          required
        />
        <label htmlFor="phone" className="form__label">
          Phone
        </label>
      </div>
    </div>
  );
}

export default personalInfo;
