import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    zIndex: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },
  username: {
    marginRight: 5,
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
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
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
        <Paper className={classes.paper}>
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
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
