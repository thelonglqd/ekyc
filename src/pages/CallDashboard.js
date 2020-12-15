import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { StringeeClient, StringeeChat } from "stringee-chat-js-sdk";

const useStyles = makeStyles((theme) => ({
  toolbarOffset: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

class CallDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>CallDashboard</h1>
        <h2>{this.props.auth.fullName}</h2>
        <h2>{this.props.auth.avatarUrl}</h2>

        <div></div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CallDashboard);
