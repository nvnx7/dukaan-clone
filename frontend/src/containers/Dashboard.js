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
} from "@material-ui/core";
import { Redirect, useRouteMatch } from "react-router-dom";

import ShopView from "./ShopView";
import { userInfo } from "../selectors/authSelectors";
import {
  tabValue,
  selectedShop,
  shopsList,
} from "../selectors/dashboardSelectors";

import { changeTab, getShopDetail } from "../actions/dashboardActions";

// import bgImage from "../images/dukan.jpg";
// const fakeProductsData = [];
// for (let i = 0; i < 10; i++) {
//   fakeProductsData.push({
//     id: i + 1,
//     title: `Fake Product ${i + 1}`,
//     description: "This is fake description",
//     price: 100,
//     stock: 200,
//     unit: "kg",
//     category: 1,
//     imageSrc: bgImage,
//     onClick: () => {
//       console.log("Clicked Fake Product!");
//     },
//   });
// }

// const fakeShopDetail = {
//   id: "123",
//   title: "DUMMY SHOP",
//   address: "XYZ Location",
//   productsData: fakeProductsData,
// };

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
  },
}));

function Dashboard({
  user,
  selectedShop,
  tabValue,
  shopsList,
  getShopDetail,
  changeTab,
}) {
  const classes = useStyles();
  const match = useRouteMatch();

  useEffect(() => {
    if (user["owner_shops"][selectedShop])
      getShopDetail(user["owner_shops"][selectedShop]);
  }, []);

  const handleTabChange = (e, newValue) => {
    changeTab(newValue);
  };

  if (!user.authenticated) return <Redirect to="/" />;

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      alignItems="stretch"
    >
      <Grid item xs={12}>
        <Typography
          noWrap
          variant="h4"
          className={classes.title}
          align="center"
        >
          SHOP TITLE
        </Typography>
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
        <Hidden smDown>
          <Grid item md={2}>
            <Tabs
              className={classes.tabs}
              orientation="vertical"
              variant="fullWidth"
              value={tabValue}
              onChange={handleTabChange}
            >
              <Tab label="Stock" />
              <Tab label="Orders" />
              <Tab label="Shop Details" />
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
          <Grid className={classes.detail} item md={2}>
            <Typography>DETAILS</Typography>
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    user: userInfo(state),
    tabValue: tabValue(state),
    selectedShop: selectedShop(state),
    shopsList: shopsList(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTab: (tabValue) => dispatch(changeTab(tabValue)),
    getShopDetail: (shopUrl) => dispatch(getShopDetail(shopUrl)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
