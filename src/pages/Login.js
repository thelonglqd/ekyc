import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper, Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    border: "1px solid #dedede",
    borderRadius: 4,
    padding: 20,
  },
  loginTitle: {
    marginBottom: theme.spacing(4),
  },
  loginButton: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Login = ({ onChangeAuth }) => {
  const classes = useStyles();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const onLoginClick = () => {
    if (username === "admin" && password === "admin") onChangeAuth(true);
    else return;
  };

  return (
    <Grid justify="center" container spacing={10}>
      <Grid item xs={6}>
        <div className={classes.loginContainer}>
          <Typography
            color="primary"
            variant="h5"
            className={classes.loginTitle}
          >
            ĐĂNG NHẬP
          </Typography>
          <TextField
            value={username}
            onChange={onUsernameChange}
            variant="outlined"
            id="standard-full-width"
            label="Tài khoản đăng nhập"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            type="password"
            value={password}
            onChange={onPasswordChange}
            variant="outlined"
            id="standard-full-width"
            label="Mật khẩu"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            className={classes.loginButton}
            variant="contained"
            color="primary"
            onClick={onLoginClick}
          >
            ĐĂNG NHẬP
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
