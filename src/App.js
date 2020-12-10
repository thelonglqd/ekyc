import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import Login from "./pages/Login";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: 20,
  },
}));

const App = () => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);

  return (
    <div className={classes.root}>
      {auth ? (
        <>
          <Header />
          <SideBar />
        </>
      ) : (
        <Login onChangeAuth={setAuth} />
      )}
    </div>
  );
};

export default App;
