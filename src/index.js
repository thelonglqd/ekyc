import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#008ecc",
    },
    secondary: {
      main: "#77d0f3",
    },
    error: {
      main: "#ff5526",
    },
    warning: {
      main: "#ffe16c",
    },
    info: {
      main: "#c4cdfc",
    },
    success: {
      main: "#48df8c",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
