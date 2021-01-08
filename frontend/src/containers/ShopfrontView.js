import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Hidden,
  Divider,
  Snackbar,
  Card,
  CardContent,
  Box,
  Button,
  Link,
} from "@material-ui/core";

import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import {
  useRouteMatch,
  useParams,
  Switch,
  Route,
  Link as RouterLink,
} from "react-router-dom";

import ShopProductList from "../components/ShopProductList";
import {
  shopDetail,
  bag,
  loading,
  errorMessage,
  infoMessage,
} from "../selectors/customerSelectors";
import {
  getCustomerShop,
  updateProductCount,
} from "../actions/customerActions";
import { getTotalPriceFromBag } from "../utils/customerUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  shopInfo: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  bag: {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
}));

function ShopfrontView({
  //state
  shopDetail,
  bag,
  loading,
  error,
  info,

  //dispatchers
  getCustomerShop,
  updateProductCount,
}) {
  const classes = useStyles();
  const { shopId } = useParams();
  const match = useRouteMatch();

  // console.log(shopId);
  useEffect(() => {
    getCustomerShop(shopId);
  }, []);

  // console.log(shopDetail);

  const handleChangeCount = (product, count) => {
    updateProductCount(bag, product, count);
  };

  let shopProductsData = shopDetail["shop_products"]
    ? shopDetail["shop_products"]
    : [];
  if (shopProductsData.length > 0) {
    shopProductsData = shopProductsData.map((shopProduct, idx) => {
      const bagProduct = bag.find((v) => shopProduct.id === v.id);
      let count = 0;
      if (bagProduct) {
        count = bagProduct.count;
      }

      return Object.assign({}, shopProduct, { count });
    });
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      className={classes.root}
      container
    >
      <Box p={2}>
        <Grid container alignItems="center">
          <Hidden mdUp xs={2}>
            <Grid item></Grid>
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
              {shopDetail.title ? shopDetail.title : ""}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Button
              className={classes.copyLinkBtn}
              variant="outlined"
              //   onClick={handleCopyLink}
              color="primary"
              startIcon={<ShoppingBasketIcon />}
            >
              <Link
                component={RouterLink}
                to={`${match.path}/bag`}
                underline="none"
                color="primary"
              >
                BAG
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Divider orientation="horizontal" variant="middle" />
      </Box>

      {/* Dashboard */}
      <Box flexGrow={1}>
        <Grid container justify="space-between" alignItems="stretch">
          {/* Left pane */}
          <Hidden smDown>
            <Grid className={classes.shopInfo} item md={2}>
              <Box p={1}>
                <Typography variant="subtitle2">
                  {shopDetail["shop_products"]
                    ? `${shopDetail["shop_products"].length} Products`
                    : ""}
                </Typography>
              </Box>
              <Box p={1}>
                <Typography variant="subtitle2">Address</Typography>
                <Typography variant="body2">
                  {shopDetail.address || ""}
                </Typography>
              </Box>
              <Box p={1}>
                <Typography variant="subtitle2">Contact</Typography>
                <Typography variant="body2">
                  {shopDetail.contact || ""}
                </Typography>
              </Box>
            </Grid>
          </Hidden>

          {/* Products List / BAG */}
          <Switch>
            <Route path={`${match.path}/bag`}>
              <Grid item container xs={12} md={8}>
                BAG
              </Grid>
            </Route>
            <Route path={`${match.path}/`}>
              <Grid item container xs={12} md={8}>
                <ShopProductList
                  productsData={shopProductsData}
                  onChangeCount={handleChangeCount}
                />
              </Grid>
            </Route>
          </Switch>

          {/* Right pane */}
          <Hidden smDown>
            <Grid className={classes.bag} item md={2} direction="column">
              <Box m={1}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Items In Bag
                    </Typography>
                    <Typography variant="h4" component="h2">
                      {bag.length}
                    </Typography>
                    <Typography variant="body2" component="p" color="primary">
                      Total - Rs. {getTotalPriceFromBag(bag)}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: loading(state),
    shopDetail: shopDetail(state),
    bag: bag(state),
    error: errorMessage(state),
    info: infoMessage(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomerShop: (shopId) => dispatch(getCustomerShop(shopId)),
    updateProductCount: (bag, product, count) =>
      dispatch(updateProductCount(bag, product, count)),
    //   hideErrorInfo: () => dispatch(hideErrorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopfrontView);
