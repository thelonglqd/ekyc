import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem as MuiListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { NavLink, Route, Switch } from "react-router-dom";
import { Call, Person, Group, Settings } from "@material-ui/icons";
import { withRouter } from "react-router";

import CallDashboard from "../pages/CallDashboard";
import CustomerDashboard from "../pages/CustomerDashboard";
import GroupDashboard from "../pages/GroupDashboard";
import SettingsDashboard from "../pages/SettingsDashboard";

const routes = [
  { icon: <Call />, text: "Cuộc gọi", path: "/" },
  {
    icon: <Person />,
    text: "Khách hàng",
    path: "/khachhang",
  },
  { icon: <Group />, text: "Nhóm", path: "/nhom" },
  {
    icon: <Settings />,
    text: "Hệ thống",
    path: "/caidat",
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
    backgroundColor: theme.palette.primary.main,
    borderRight: "none",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(10),
  },
  navlink: {
    textDecoration: "none",
    color: "inherit",
  },
  itemText: { color: "white" },
  itemIcon: { color: "white " },
}));

const ListItem = withStyles(({ palette }) => ({
  root: {
    "&$selected, &$selected:hover, &:hover": {
      backgroundColor: palette.info.main,
      color: "white",
    },
  },
  selected: {},
}))(MuiListItem);

const SideBar = ({ location }) => {
  const classes = useStyles();

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <div className={classes.toolbar} />
        <List>
          {routes.map((route) => (
            <NavLink strict to={route.path} className={classes.navlink}>
              <ListItem
                className={classes.navItem}
                selected={location.pathname === route.path}
                button
                key={route.text}
              >
                <ListItemIcon className={classes.itemIcon}>
                  {route.icon}
                </ListItemIcon>
                <ListItemText
                  className={classes.itemText}
                  primary={route.text}
                />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
      <div className={classes.content}>
        <div className={classes.toolbar}>
          <Switch>
            <Route path="/" exact strict component={CallDashboard}></Route>
            <Route path="/khachhang" component={CustomerDashboard}></Route>
            <Route path="/nhom" component={GroupDashboard}></Route>
            <Route path="/caidat" component={SettingsDashboard}></Route>
          </Switch>
        </div>
      </div>
    </>
  );
};

export default withRouter(SideBar);
