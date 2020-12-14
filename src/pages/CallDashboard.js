import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  toolbarOffset: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const CallDashboard = ({ auth }) => {
  const classes = useStyles();

  return (
    <>
      <h1>CallDashboard</h1>
      <h2>{auth.fullName}</h2>
      <h2>{auth.avatarUrl}</h2>
      <h2>{auth.stringeeAccessToken}</h2>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CallDashboard);
