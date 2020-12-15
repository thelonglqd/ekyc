import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";

import { useDispatch } from "react-redux";

import { AccountCircle } from "@material-ui/icons";
import { LOGOUT_SUCCESS } from "../redux/actions/types";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    boxShadow: "none",
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = () => {
    setAnchorEl(null);
    dispatch({ type: LOGOUT_SUCCESS });
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <div className={classes.title}></div>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Typography className={classes.username} variant="h6">
            admin
          </Typography>
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Đổi mật khẩu</MenuItem>
          <MenuItem onClick={handleClose}>Đổi avatar</MenuItem>
          <MenuItem onClick={onLogoutClick}>Đăng xuất</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
