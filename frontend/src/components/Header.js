import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ButtonGroup,
} from "@material-ui/core";

import LocalMallIcon from "@material-ui/icons/LocalMall";

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

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <LocalMallIcon fontSize="large" />
          <Typography variant="h6" className={classes.title} p={8}>
            DUKAAN
          </Typography>

          <ButtonGroup variant="contained">
            <Button>SIGNUP</Button>
            <Button>LOGIN</Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
}
