import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper, Snackbar } from "@material-ui/core";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { Switch, Route, Redirect } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import Alert from "../components/Alert";
import { userInfo, authError, authLoading } from "../selectors/authSelectors";
import { login, register, hideError } from "../actions/authActions";

import bgImage from "../images/dukan.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
  },
  img: {
    maxWidth: 100,
  },
  image: {
    backgroundColor: "red",
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
  },
  tagline: {
    fontWeight: "bold",
    color: "#fff",
  },
  icon: {
    fontSize: "156px",
  },
}));

function Home({ user, loading, error, login, register, hideError }) {
  const classes = useStyles();

  if (user.authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Grid
      className={classes.root}
      container
      justify="space-between"
      alignItems="stretch"
    >
      <Grid
        className={classes.image}
        item
        container
        md={6}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <LocalMallIcon className={classes.icon} color="primary" />
        <Typography className={classes.tagline} variant="h4">
          Take Your Dukaan Digital.
        </Typography>
      </Grid>

      <Grid item md={6} component={Paper}>
        <Switch>
          <Route path="/signup">
            <SignUpForm loading={loading} onRegister={register} />
          </Route>
          <Route exact path="/">
            <LoginForm loading={loading} onLogin={login} />
          </Route>
        </Switch>
      </Grid>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={5000}
        onClose={hideError}
      >
        <Alert severity="error" onClose={hideError}>
          {error}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    user: userInfo(state),
    error: authError(state),
    loading: authLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideError: () => {
      dispatch(hideError());
    },
    login: (user) => {
      dispatch(login(user));
    },
    register: (user) => {
      dispatch(register(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
