import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  key: {
    textTransform: "capitalize",
  },
}));

export default function DetailView({ title, details }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom component="div">
            {title}
          </Typography>
        </Grid>
        {Object.keys(details).map((key) => (
          <>
            <Grid item xs={4}>
              <Typography className={classes.key} variant="body2" align="right">
                {key} &nbsp;
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="subtitle2">{details[key]}</Typography>
            </Grid>
          </>
        ))}
      </Grid>
    </div>
  );
}
