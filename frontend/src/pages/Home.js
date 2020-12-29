import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper } from "@material-ui/core";
import LocalMallIcon from "@material-ui/icons/LocalMall";

import { Switch, Route, Redirect } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

import bgImage from "../images/dukan.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

export default function Home() {
  const classes = useStyles();

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

      <Grid item md={6}>
        <Paper square>
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/signup">
              <SignUpForm />
            </Route>
          </Switch>
        </Paper>
      </Grid>
    </Grid>
  );
}
