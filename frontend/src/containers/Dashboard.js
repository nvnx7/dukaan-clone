import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Hidden,
  Tabs,
  Tab,
  Divider,
  Snackbar,
  Drawer,
  IconButton,
  Card,
  CardContent,
  Box,
} from "@material-ui/core";

import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import StorefrontRoundedIcon from "@material-ui/icons/StorefrontRounded";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import ShowChartRoundedIcon from "@material-ui/icons/ShowChartRounded";
import { Redirect, useRouteMatch } from "react-router-dom";

import Alert from "../components/Alert";
import ShopView from "./ShopView";
import { userInfo } from "../selectors/authSelectors";
import {
  tabValue,
  selectedShop,
  shopsList,
  errorMessage,
  infoMessage,
  drawerOpen,
} from "../selectors/dashboardSelectors";

import {
  changeTab,
  getShopDetail,
  hideErrorInfo,
  toggleDrawer,
} from "../actions/dashboardActions";

import {
  getPendingOrdersCount,
  getActiveOrdersCount,
  getProductsCount,
  getOutOfStockProductsCount,
} from "../utils/shopUtils";

const styledTab = (label, icon) => {
  return (
    <Tab
      label={
        <div>
          {icon}
          <Typography component="span" variant="subtitle2">
            {label}
          </Typography>
        </div>
      }
    />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontWeight: "bold",
    padding: "16px 0px",
  },
  tabsContainer: {
    flexGrow: 1,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  fab: {
    float: "right",
    marginRight: "8px",
  },
  detail: {
    borderLeft: `1px solid ${theme.palette.divider}`,
    padding: "4px",
  },
  drawerTabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: "200px",
  },
  tabIcon: {
    verticalAlign: "top",
    marginRight: "4px",
  },
}));

const container = window !== undefined ? () => window.document.body : undefined;
function Dashboard({
  // states
  user,
  selectedShop,
  tabValue,
  shopsList,
  error,
  info,
  drawerOpen,

  // dispatchers
  getShopDetail,
  changeTab,
  hideErrorInfo,
  toggleDrawer,
}) {
  const classes = useStyles();
  const match = useRouteMatch();

  useEffect(() => {
    if (user["owner_shops"][selectedShop])
      getShopDetail(user["owner_shops"][selectedShop]);
  }, []);

  if (!user.authenticated) return <Redirect to="/" />;

  const handleTabChange = (e, newValue) => {
    changeTab(newValue);
    toggleDrawer();
  };

  const handleDrawerToggle = () => {
    toggleDrawer();
  };

  const activeOrdersCount = getActiveOrdersCount(shopsList[selectedShop]);
  const pendingOrdersCount = getPendingOrdersCount(shopsList[selectedShop]);
  const productsCount = getProductsCount(shopsList[selectedShop]);
  const outOfStockProductsCount = getOutOfStockProductsCount(
    shopsList[selectedShop]
  );

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      alignItems="stretch"
    >
      <Grid item container xs={12} alignItems="center">
        <Hidden mdUp xs={4}>
          <Grid item>
            <label htmlFor="icon-button-drawer">
              <IconButton
                color="primary"
                aria-label="open drawer"
                component="span"
                onClick={handleDrawerToggle}
              >
                <MenuRoundedIcon fontSize="large" />
              </IconButton>
            </label>
          </Grid>
        </Hidden>
        <Grid item xs={8} md={12}>
          <Typography
            noWrap
            variant="h4"
            className={classes.title}
            align="center"
          >
            {shopsList[selectedShop] ? shopsList[selectedShop].title : "TITLE"}
          </Typography>
        </Grid>
      </Grid>

      <Divider orientation="horizontal" variant="middle" />

      <Grid
        className={classes.tabsContainer}
        item
        container
        xs={12}
        justify="space-between"
        alignItems="stretch"
      >
        {/* Left Nav Pane for small screens */}
        <Hidden mdUp>
          <Drawer
            className={classes.drawer}
            container={container}
            variant="temporary"
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerToggle}
          >
            <Tabs
              className={classes.drawerTabs}
              orientation="vertical"
              variant="fullWidth"
              value={tabValue}
              indicatorColor="primary"
              onChange={handleTabChange}
              textColor="primary"
            >
              {styledTab(
                "Stock",
                <StorefrontRoundedIcon className={classes.tabIcon} />
              )}
              {styledTab(
                "Orders",
                <ShoppingCartRoundedIcon className={classes.tabIcon} />
              )}
              {styledTab(
                "Stats",
                <ShowChartRoundedIcon className={classes.tabIcon} />
              )}
            </Tabs>
          </Drawer>
        </Hidden>

        {/* Left Nav Pane for large screens */}
        <Hidden smDown>
          <Grid item md={2}>
            <Tabs
              className={classes.tabs}
              orientation="vertical"
              variant="fullWidth"
              value={tabValue}
              indicatorColor="primary"
              onChange={handleTabChange}
              textColor="primary"
            >
              {styledTab(
                "Stock",
                <StorefrontRoundedIcon className={classes.tabIcon} />
              )}
              {styledTab(
                "Orders",
                <ShoppingCartRoundedIcon className={classes.tabIcon} />
              )}
              {styledTab(
                "Stats",
                <ShowChartRoundedIcon className={classes.tabIcon} />
              )}
            </Tabs>
          </Grid>
        </Hidden>

        <Grid item container xs={12} md={8}>
          <ShopView
            routeMatch={match}
            tabValue={tabValue}
            shopDetail={shopsList.length > 0 ? shopsList[selectedShop] : {}}
          />
        </Grid>

        <Hidden smDown>
          <Grid
            className={classes.detail}
            item
            md={2}
            direction="column"
            justify="flex-start"
          >
            <Box m={1}>
              <Card>
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Active Orders
                  </Typography>
                  <Typography variant="h4">{activeOrdersCount}</Typography>
                  <Typography variant="body2" component="p" color="error">
                    {pendingOrdersCount} Pending
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box m={1}>
              <Card>
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Total Products
                  </Typography>
                  <Typography variant="h4" component="h2">
                    {productsCount}
                  </Typography>
                  <Typography variant="body2" component="p" color="error">
                    {outOfStockProductsCount} Out Of Stock
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Hidden>
      </Grid>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={3000}
        onClose={hideErrorInfo}
      >
        <Alert severity="error" onClose={hideErrorInfo}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(info)}
        autoHideDuration={3000}
        onClose={hideErrorInfo}
      >
        <Alert severity="success" onClose={hideErrorInfo}>
          {info}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    user: userInfo(state),
    tabValue: tabValue(state),
    selectedShop: selectedShop(state),
    shopsList: shopsList(state),
    error: errorMessage(state),
    info: infoMessage(state),
    drawerOpen: drawerOpen(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTab: (tabValue) => dispatch(changeTab(tabValue)),
    getShopDetail: (shopUrl) => dispatch(getShopDetail(shopUrl)),
    hideErrorInfo: () => dispatch(hideErrorInfo()),
    toggleDrawer: () => dispatch(toggleDrawer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
