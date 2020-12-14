import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import "./index.css";

import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import Login from "./pages/Login";
import LoadingSpinner from "./components/LoadingSpinner";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: 800,
  },
}));

const App = ({ ui }) => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);

  console.log("uiiiiii: ", ui);

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <LoadingSpinner isShown={ui.loading} />
        {auth ? (
          <>
            <Header onChangeAuth={setAuth} />
            <SideBar />
          </>
        ) : (
          <Login onChangeAuth={setAuth} />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(App);
