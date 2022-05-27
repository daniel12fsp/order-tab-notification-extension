import "reset-css/reset.css";

import { createRoot } from "react-dom/client";
import * as React from "react";

import { createGlobalStyle } from "styled-components";
import { App } from "./containers/App";

const GlobalStyle = createGlobalStyle`
  body {
    color: #222;
    background: #fff;
    font-family: sans-serif;
  }

  @media (prefers-color-scheme: dark) {
    body {
      color: #eee;
      background: #121212;
    }
  }
`;

const rootElem = document.getElementById("rootElem");
if (rootElem) {
  rootElem.remove();
}

const newRootElem = document.createElement("div");
newRootElem.id = "rootElem";
document.body.appendChild(newRootElem);

const root = createRoot(newRootElem);
root.render(
  <>
    <GlobalStyle />
    <App />
  </>
);
