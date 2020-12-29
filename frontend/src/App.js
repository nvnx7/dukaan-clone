import { Provider } from "react-redux";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Switch, Route } from "react-router-dom";

import store from "./store";

import Header from "./components/Header";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
  },
  header: {
    // flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <Box className={classes.root} container direction="column">
        <Box className={classes.header} item>
          <Header />
        </Box>

        <Box className={classes.content} item>
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
