import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Link,
} from "@material-ui/core";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { Link as RouterLink, Switch, Route } from "react-router-dom";

import { logout } from "../actions/authActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
  },
}));

function Header({ logout }) {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <LocalMallIcon fontSize="large" />
        <Typography variant="h6" className={classes.title} p={8}>
          DUKAAN
        </Typography>

        <Switch>
          <Route path="/dashboard">
            <Button variant="contained" onClick={logout}>
              LOGOUT
            </Button>
          </Route>

          <Route path="/shop">{}</Route>

          <Route path="/">
            <Box
              width="164px"
              display="flex"
              container
              justifyContent="space-between"
            >
              <Link component={RouterLink} to="/signup" underline="none">
                <Button variant="contained">SIGNUP</Button>
              </Link>

              <Link component={RouterLink} to="/" underline="none">
                <Button variant="contained">LOGIN</Button>
              </Link>
            </Box>
          </Route>
        </Switch>
      </Toolbar>
    </AppBar>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(null, mapDispatchToProps)(Header);
