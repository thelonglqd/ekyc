import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingSpinner = ({ isShown }) => {
  return isShown ? (
    <CircularProgress
      style={{ position: "absolute", top: "50%", left: "50%", zIndex: 1 }}
    />
  ) : null;
};

export default LoadingSpinner;
