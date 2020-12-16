import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbarOffset: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const CallDashboard = ({ auth }) => {
  const location = useLocation();
  const incomingCall = location.data;

  const testAnswerCall = () => {
    incomingCall.answer(function (res) {
      console.log("answer res", res);
    });
  };

  const settingCallEvent = (call1) => {
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
  };

  useEffect(() => {
    if (incomingCall) settingCallEvent(incomingCall);
  }, [incomingCall]);

  return (
    <>
      <h1>CallDashboard</h1>
      <h2>{auth.fullName}</h2>
      <h2>{auth.avatarUrl}</h2>

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
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CallDashboard);
