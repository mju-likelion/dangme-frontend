import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import { RecoilRoot } from "recoil";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
axios.defaults.baseURL = "https://1ab7-58-78-54-29.jp.ngrok.io/";
//axios.defaults.withCredentials = true;
root.render(
  <BrowserRouter>
    <RecoilRoot>
      <GlobalStyle />
      <App />
    </RecoilRoot>
  </BrowserRouter>
);
