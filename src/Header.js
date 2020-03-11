import React, { Component } from "react";
import Amplify from "aws-amplify";

import "./index.css";
Amplify.configure({
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_appsync_graphqlEndpoint,
  aws_appsync_region: process.env.REACT_APP_appsync_region,
  aws_appsync_authenticationType:
    process.env.REACT_APP_appsync_authenticationType,
  aws_appsync_apiKey: process.env.REACT_APP_appsync_apiKey
});
class Header extends Component {
  render() {
    return (
      <div className="title">
        <a href="/" className="logo">
          <img className="logoImg" src="logo.png" alt="logo" />
          AJISAQ TIKETING SYSTEM FOR AIRS JUMM
        </a>

        <nav>
          <ul className="nav__items">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/summary">Summary</a>
            </li>
            <li>
              <a href="/remit">Remit</a>
            </li>
          </ul>
        </nav>

        <div className="mobile__nav">
          <input id="toggle" type="checkbox" />
          <label className="hamburger" htmlFor="toggle">
            <div className="hamburger__top"></div>
            <div className="hamburger__meat"></div>
            <div className="hamburger__bottom"></div>
          </label>
          <div className="hamburger__nav">
            <div className="hamburger__nav--wrapper">
              <nav className="hamburger__nav--items">
                <a href="/">Home</a>
                <a href="/summary">Summary</a>
                <a href="/remit">Remit</a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
