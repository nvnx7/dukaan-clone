import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ButtonGroup,
  Link,
} from "@material-ui/core";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { Link as RouterLink } from "react-router-dom";

import { logout } from "../actions/authActions";
import { userInfo } from "../selectors/authSelectors";

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

function Header({ user, logout }) {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <LocalMallIcon fontSize="large" />
        <Typography variant="h6" className={classes.title} p={8}>
          DUKAAN
        </Typography>

        {user.authenticated ? (
          <Button variant="contained" onClick={logout}>
            LOGOUT
          </Button>
        ) : (
          <ButtonGroup variant="contained">
            <Button>
              <Link component={RouterLink} to="/signup" underline="none">
                SIGNUP
              </Link>
            </Button>
            <Button>
              <Link component={RouterLink} to="/" underline="none">
                LOGIN
              </Link>
            </Button>
          </ButtonGroup>
        )}
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    user: userInfo(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
