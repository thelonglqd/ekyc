import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import "./index.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import Login from "./pages/Login";
import LoadingSpinner from "./components/LoadingSpinner";
import "./libs/latest.sdk.bundle.min";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: 800,
  },
}));

const App = ({ ui, auth }) => {
  var stringeeClient;
  var fromNumber = "FROM_YOUR_NUMBER";
  var call;
  const history = useHistory();

  useEffect(() => {
    if (auth.isAuthenticated) {
      console.log("+++++ Add stringee event listeners +++++");
      var client = new StringeeClient();
      console.log("+++++ ACCESS TOKEN +++++", auth.stringeeAccessToken);
      client.connect(auth.stringeeAccessToken);

      client.on("connect", function () {
        console.log("+++++ connected to StringeeServer +++++");
      });

      client.on("authen", function (res) {
        console.log("authen", res);
        if (res.r === 0) {
          console.log("+++++ authen successed +++++");
        } else {
          console.log("+++++ authen failed +++++");
        }
      });

      client.on("disconnect", function () {
        console.log("+++++  disconnected +++++");
      });

      client.on("incomingcall", function (incomingcall) {
        window.StringeeIncomingCall = incomingcall;
        history.push({
          pathname: "/",
          data: incomingcall,
        });
        call = incomingcall;
        // settingCallEvent(incomingcall);

        call.ringing(function (res) {});

        console.log("+++++ incomingcall +++++");
      });

      client.on("requestnewtoken", function () {
        console.log("++++++ requestnewtoken +++++");
      });
    }
  }, [auth.isAuthenticated]);
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <LoadingSpinner isShown={ui.loading} />
        {auth.isAuthenticated ? (
          <>
            <Header />
            <SideBar />
          </>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  ui: state.ui,
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
