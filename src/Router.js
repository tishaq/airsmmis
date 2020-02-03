import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Remit from "./Remit";
import App from "./App";
import Summary from "./Summary";
export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Remit} />
          <Route path="/remit" component={Remit} />
          <Route path="/summary" component={Summary} />
        </Switch>
      </BrowserRouter>
    );
  }
}
