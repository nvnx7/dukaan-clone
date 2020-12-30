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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
          <Button onClick={logout}>LOGOUT</Button>
        </ButtonGroup>
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
