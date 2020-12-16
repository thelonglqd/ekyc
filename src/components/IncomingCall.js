import React from "react";

const IncomingCall = ({ onAccept, onReject }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "70%",
        left: "50%",
      }}
    >
      <button onClick={onAccept}>ACCEPT CALL</button>
      <button onClick={onReject}>REJECT CALL</button>
    </div>
  );
};

export default IncomingCall;
