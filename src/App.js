import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import "./index.css";
import { connect } from "react-redux";
import $ from "jquery";

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

  function testAnswerCall() {
    call.answer(function (res) {
      console.log("answer res", res);
      $("#incoming-call-div").hide();
    });
  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      console.log("+++++ Add stringee event listeners +++++");
      var client = new StringeeClient();
      console.log("+++++ ACCESS TOKEN +++++", auth.stringeeAccessToken);
      client.connect(auth.stringeeAccessToken);

      client.on("connect", function () {
        console.log("connected");
      });

      client.on("authen", (res) => {
        console.log("authen", res);
        console.log("+++++ userID +++++", res.userId);
      });

      client.on("incomingcall", function (incomingcall) {
        call = incomingcall;
        settingCallEvent(incomingcall);

        //			call.videoResolution = {width: 1280, height: 720};

        // $("#incoming-call-div").show();

        call.ringing(function (res) {});

        console.log("++++++++++++++ incomingcall", incomingcall);
      });

      function settingCallEvent(call1) {
        // callStarted();

        call1.on("addremotestream", function (stream) {
          console.log("addremotestream");
          // reset srcObject to work around minor bugs in Chrome and Edge.
          remoteVideo.srcObject = null;
          remoteVideo.srcObject = stream;
        });

        call1.on("addlocalstream", function (stream) {
          console.log("addlocalstream");
          // reset srcObject to work around minor bugs in Chrome and Edge.
          localVideo.srcObject = null;
          localVideo.srcObject = stream;
        });

        call1.on("error", function (info) {
          console.log("on error: " + JSON.stringify(info));
        });

        call1.on("signalingstate", function (state) {
          console.log("signalingstate ", state);
          var reason = state.reason;
          $("#callStatus").html(reason);

          if (state.code === 6) {
            //call Ended
            $("#incoming-call-div").hide();
            callEnded();
          } else if (state.code === 5) {
            //busy
            callEnded();
          }
        });

        call1.on("mediastate", function (state) {
          console.log("mediastate ", state);
        });

        call1.on("info", function (info) {
          console.log("on info:" + JSON.stringify(info));
        });

        call1.on("otherdevice", function (data) {
          console.log("on otherdevice:" + JSON.stringify(data));
          if (
            (data.type === "CALL_STATE" && data.code >= 200) ||
            data.type === "CALL_END"
          ) {
            $("#incoming-call-div").hide();
            callEnded();
          }
        });
      }
    }
  }, [auth.isAuthenticated]);
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <LoadingSpinner isShown={ui.loading} />
        <div style={{ position: "absolute", top: "50%", left: "30%" }}>
          <div id="incoming-call-div">
            <br />
            <button id="answerBtn" onClick={testAnswerCall}>
              Answer
            </button>
            <button id="rejectBtn" onclick="testRejectCall()">
              Reject
            </button>
          </div>
          <div>
            <video
              id="localVideo"
              playsInline
              autoPlay
              muted
              style={{ width: "350px", background: "#424141" }}
            />
            <video
              id="remoteVideo"
              playsInline
              autoPlay
              style={{ width: "350px", background: "#424141" }}
            />
          </div>
        </div>
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
