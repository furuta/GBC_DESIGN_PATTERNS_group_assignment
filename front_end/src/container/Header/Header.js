import React from "react";
import "./Header.scss";
import Logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <React.Fragment>
      <div className="logo">
        <img src={Logo} alt="microfinance" className="logo_image" />
        <span className="logo_title">Microfinance</span>
      </div>
      <nav className="user-nav">
        <NavLink
          to="/fund"
          exact
          className="user-nav__item"
          activeClassName="user-nav__item-active"
        >
          <span>FUND</span>
        </NavLink>
        <NavLink
          to="/borrow"
          exact
          className="user-nav__item"
          activeClassName="user-nav__item-active"
        >
          <span>REQUEST</span>
        </NavLink>
      </nav>
    </React.Fragment>
  );
}

export default Header;
