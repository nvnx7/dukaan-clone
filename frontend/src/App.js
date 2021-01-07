import { Provider } from "react-redux";

import { Box, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Switch, Route } from "react-router-dom";

import store from "./store";

import Header from "./containers/Header";
import Home from "./containers/Home";
import Dashboard from "./containers/Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
  },
  content: {
    flexGrow: 1,
  },
  header: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <Box className={classes.root} container direction="column">
        <CssBaseline />
        <Box className={classes.header} item height="8%">
          <Header />
        </Box>

        <Box className={classes.content} item height="92%">
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Box>
      </Box>
    </Provider>
  );
}

export default App;
