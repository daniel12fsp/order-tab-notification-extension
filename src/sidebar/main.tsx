import "reset-css";

import { createRoot } from "react-dom/client";

import { createGlobalStyle } from "styled-components";
import { App } from "./containers/App";

const GlobalStyle = createGlobalStyle`
html,
body,
#rootElem {
  height: 100%;
  margin: 0;
  padding: 0;
}
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

async function main() {
  const root = createRoot(newRootElem);

  root.render(
    <>
      <GlobalStyle />
      <App />
    </>
  );
}

main();
