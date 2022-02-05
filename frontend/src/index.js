import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/store";
import { authenticate } from "./redux/actions/auth";
import { LOGIN_FAIL } from "./redux/constant";

// Check for token and update application state if required
const token = localStorage.getItem("token");
if (token && store.getState().auth.isAuthentication !== true) {
  store.dispatch(authenticate());
} else {
  store.dispatch({ type: LOGIN_FAIL });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
