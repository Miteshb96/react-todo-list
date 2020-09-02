import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import { configureStore, reducers } from "./shared/store";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

//add header token for every request
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const store = configureStore(axios, {}, reducers);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
