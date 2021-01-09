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
  Container,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";

import {
  useRouteMatch,
  useParams,
  Switch,
  Route,
  Link as RouterLink,
} from "react-router-dom";

import ShopProductList from "../components/ShopProductList";
import ShoppingBag from "../components/ShoppingBag";
import Alert from "../components/Alert";
import CustomerForm from "../components/CustomerForm";

import {
  shopDetail,
  bag,
  loading,
  errorMessage,
  infoMessage,
  placeOrderFormDialogOpen,
} from "../selectors/customerSelectors";
import {
  getCustomerShop,
  updateBagProductCount,
  togglePlaceOrderFormDialog,
  placeOrder,
  hideErrorInfo,
} from "../actions/customerActions";
import {
  getTotalPriceFromBag,
  getOrderDataFromBag,
} from "../utils/customerUtils";

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
  bagContainer: {
    position: "relative",
    minHeight: "400px",
    maxWidth: "1000px",
  },
  fab: {
    position: "absolute",
    right: "42px",
    bottom: "4px",
  },
}));

function ShopfrontView({
  //state
  shopDetail,
  bag,
  loading,
  error,
  info,
  placeOrderFormDialogOpen,

  //dispatchers
  getCustomerShop,
  updateProductCount,
  hideErrorInfo,
  togglePlaceOrderFormDialog,
  placeOrder,
}) {
  const classes = useStyles();
  const { shopId } = useParams();
  const match = useRouteMatch();

  // console.log(shopId);
  useEffect(() => {
    getCustomerShop(shopId);
  }, []);

  const path = `${match.path}`.replace(":shopId", shopId);

  const handleChangeCount = (product, count) => {
    updateProductCount(bag, product, count);
  };

  const handlePlaceOrder = (customerData) => {
    const orderData = getOrderDataFromBag(bag, customerData);
    console.log(orderData);
    placeOrder(shopDetail, orderData);
  };

  let shopProductsData = shopDetail["shop_products"] || [];
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
            <Link
              component={RouterLink}
              to={`${path}/bag`}
              underline="none"
              color="primary"
            >
              <Button
                className={classes.copyLinkBtn}
                variant="outlined"
                color="primary"
                startIcon={<ShoppingBasketIcon />}
              >
                BAG
              </Button>
            </Link>
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
            <Route path={`${path}/bag`}>
              <Grid item xs={12} md={8}>
                <Box p={2}>
                  <Link
                    component={RouterLink}
                    to={`${path}/`}
                    underline="none"
                    color="textPrimary"
                  >
                    <Button
                      variant="contained"
                      startIcon={<ArrowBackIcon />}
                      color="primary"
                    >
                      Back To Shop
                    </Button>
                  </Link>
                  <Container className={classes.bagContainer}>
                    <ShoppingBag bag={bag} onChangeCount={handleChangeCount} />
                    {
                      <Fab
                        className={classes.fab}
                        color="primary"
                        variant="extended"
                        onClick={togglePlaceOrderFormDialog}
                        disabled={bag && bag.length <= 0}
                      >
                        <DoneRoundedIcon />
                        Place Order
                      </Fab>
                    }
                  </Container>
                </Box>
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

              <Box m={1}>
                <Typography variant="subtitle2" color="primary">
                  In your Bag
                </Typography>
                {bag.map((product) => (
                  <Box p={1}>
                    <Typography variant="subtitle2">{product.title}</Typography>
                    <Typography variant="body2" component="span">
                      Qty. {product.count}&nbsp;&nbsp;&nbsp;
                    </Typography>
                    <Typography variant="body2" component="span">
                      Price {product.price}/{product.unit}
                    </Typography>
                    <Divider orientation="horizontal" />
                  </Box>
                ))}
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>

      <Dialog
        open={placeOrderFormDialogOpen}
        onClose={togglePlaceOrderFormDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          <CustomerForm
            loading={loading}
            onSave={handlePlaceOrder}
            onCancel={togglePlaceOrderFormDialog}
          />
        </DialogContent>
      </Dialog>

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
    loading: loading(state),
    shopDetail: shopDetail(state),
    bag: bag(state),
    placeOrderFormDialogOpen: placeOrderFormDialogOpen(state),
    error: errorMessage(state),
    info: infoMessage(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomerShop: (shopId) => dispatch(getCustomerShop(shopId)),
    updateProductCount: (bag, product, count) =>
      dispatch(updateBagProductCount(bag, product, count)),
    togglePlaceOrderFormDialog: () => dispatch(togglePlaceOrderFormDialog),
    placeOrder: (shopDetail, orderData) =>
      dispatch(placeOrder(shopDetail, orderData)),
    hideErrorInfo: () => dispatch(hideErrorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopfrontView);
