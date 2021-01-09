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
  Button,
} from "@material-ui/core";

import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import StorefrontRoundedIcon from "@material-ui/icons/StorefrontRounded";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import ShowChartRoundedIcon from "@material-ui/icons/ShowChartRounded";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";

import { Redirect, useRouteMatch } from "react-router-dom";

import Alert from "../components/Alert";
import OwnerShopView from "./OwnerShopView";
import NoShopView from "./NoShopView";
import { userInfo } from "../selectors/authSelectors";
import {
  tabValue,
  selectedShop,
  shopsList,
  errorMessage,
  infoMessage,
  drawerOpen,
  loading,
} from "../selectors/dashboardSelectors";

import {
  changeTab,
  getShopDetail,
  updateShopsList,
  hideErrorInfo,
  toggleDrawer,
  copyShopLink,
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
    height: "100%",
  },
  title: {
    // padding: "16px 0px",
    // flexShrink: 1,
  },
  dashboardContent: {
    height: "100%",
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
  loading,

  // dispatchers
  getShopDetail,
  updateShopsList,
  changeTab,
  hideErrorInfo,
  copyShopLink,
  toggleDrawer,
}) {
  const classes = useStyles();
  const match = useRouteMatch();

  useEffect(() => {
    if (
      user.authenticated &&
      user["owner_shops"] &&
      user["owner_shops"][selectedShop]
    ) {
      getShopDetail(user["owner_shops"][selectedShop]);
    }

    return () => {
      updateShopsList([]);
    };
  }, []);

  // Redirect to Home if not authenticated
  if (!user.authenticated) return <Redirect to="/" />;

  // Return empty shop view if no shop added
  if (!loading && shopsList.length === 0) return <NoShopView user={user} />;

  const handleTabChange = (e, newValue) => {
    changeTab(newValue);
    toggleDrawer();
  };
  const handleDrawerToggle = () => toggleDrawer();
  const handleCopyLink = () =>
    copyShopLink({ url: user["owner_shops"][selectedShop] });

  const activeOrdersCount = getActiveOrdersCount(shopsList[selectedShop]);
  const pendingOrdersCount = getPendingOrdersCount(shopsList[selectedShop]);
  const productsCount = getProductsCount(shopsList[selectedShop]);
  const outOfStockProductsCount = getOutOfStockProductsCount(
    shopsList[selectedShop]
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      className={classes.root}
      container
    >
      {/* Title Bar */}
      <Box p={2}>
        <Grid container alignItems="center">
          <Hidden mdUp xs={2}>
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

          {/* Dummy grid to occupy space */}
          <Hidden smDown>
            <Grid item md={2}></Grid>
          </Hidden>

          <Grid item xs={8}>
            <Typography
              noWrap
              variant="h4"
              className={classes.title}
              align="center"
            >
              {shopsList[selectedShop]
                ? shopsList[selectedShop].title
                : "TITLE"}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Button
              className={classes.copyLinkBtn}
              size="small"
              onClick={handleCopyLink}
              color="primary"
              startIcon={<ShareRoundedIcon />}
            >
              Copy Link
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Divider orientation="horizontal" variant="middle" />
      </Box>

      {/* Dashboard Content */}
      <Box flexGrow={1}>
        <Grid
          className={classes.dashboardContent}
          container
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

          {/* Shop Products List */}
          <Grid item container xs={12} md={8}>
            <OwnerShopView
              routeMatch={match}
              tabValue={tabValue}
              shopDetail={shopsList.length > 0 ? shopsList[selectedShop] : {}}
            />
          </Grid>

          {/* Right Pane */}
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
      </Box>

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
    </Box>
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
    loading: loading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTab: (tabValue) => dispatch(changeTab(tabValue)),
    getShopDetail: (shopUrl) => dispatch(getShopDetail(shopUrl)),
    updateShopsList: (shopsList) => dispatch(updateShopsList(shopsList)),
    hideErrorInfo: () => dispatch(hideErrorInfo()),
    toggleDrawer: () => dispatch(toggleDrawer()),
    copyShopLink: (shopDetail) => dispatch(copyShopLink(shopDetail)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
