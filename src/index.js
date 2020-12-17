import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { createStore } from "redux";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import rootReducer from "./redux/reducers";

const store = createStore(rootReducer);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#008ecc",
    },
    secondary: {
      main: "#b3bcf5",
    },
    error: {
      main: "#ff5526",
    },
    warning: {
      main: "#ffe16c",
    },
    info: {
      main: "#dff0f7",
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
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
