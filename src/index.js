import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import ThemeObject from './theme/index'

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: ${props => props.theme.fontFamily.general};

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}`



ReactDOM.render(
  <ThemeProvider theme={ ThemeObject }>
  < GlobalStyle />
  <App />
  </ThemeProvider>, 
  document.getElementById("root"));
