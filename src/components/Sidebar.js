import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Call, Person, Group, Settings } from "@material-ui/icons";

import CallDashboard from "../pages/CallDashboard";
import CustomerDashboard from "../pages/CustomerDashboard";
import GroupDashboard from "../pages/GroupDashboard";
import SettingsDashboard from "../pages/SettingsDashboard";

const routes = [
  { icon: <Call />, text: "Quản lý cuộc gọi", path: "/" },
  {
    icon: <Person />,
    text: "Quản lý tài khoản khách hàng",
    path: "/khachhang",
  },
  { icon: <Group />, text: "Quản lý nhóm", path: "nhom" },
  {
    icon: <Settings />,
    text: "Quản lý tham số cấu hình hệ thống",
    path: "caidat",
  },
];

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(10),
  },
}));

const SideBar = () => {
  const classes = useStyles();
  return (
    <Router>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          {routes.map((route) => (
            <Link to={route.path}>
              <ListItem button key={route.text}>
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <div className={classes.content}>
        <div className={classes.toolbar}>
          <Switch>
            <Route exact path="/" component={CallDashboard}></Route>
            <Route path="/khachhang" component={CustomerDashboard}></Route>
            <Route path="/nhom" component={GroupDashboard}></Route>
            <Route path="/caidat" component={SettingsDashboard}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default SideBar;
