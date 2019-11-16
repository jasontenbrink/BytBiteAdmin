import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import Main from "./Main";
import store from "./state/store";

const flexContainer = {
  display: "flex"
};

const app = document.getElementById("app");
render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  app
);
