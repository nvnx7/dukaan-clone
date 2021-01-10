import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Fab,
  Dialog,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  Typography,
  Box,
  Container,
} from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { Switch, Route, Redirect } from "react-router-dom";

import EditableProductList from "../components/EditableProductList";
import EditProductForm from "../components/EditProductForm";
import OrdersList from "../components/OrdersList";

import {
  selectedProduct,
  addProductDialogOpen,
  shopLoading,
} from "../selectors/shopSelectors";
import { orderLoading } from "../selectors/orderSelectors";

import {
  showEditProductDialog,
  showAddProductDialog,
  hideProductFormDialog,
  addProduct,
  editProduct,
  deleteProduct,
} from "../actions/shopActions";
import { updateOrderStatus } from "../actions/orderActions";

import AddProductForm from "../components/AddProductForm";
import DetailView from "../components/DetailView";

import {
  getPendingOrdersCount,
  getActiveOrdersCount,
  getProductsCount,
  getOutOfStockProductsCount,
  getShopRevenue,
  getPendingRevenue,
} from "../utils/shopUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: "100%",
  },
  listContainer: {
    position: "relative",
    height: "100%",
  },
  fab: {
    position: "absolute",
    bottom: "4px",
    right: "24px",
  },
}));

function OwnerShopView({
  // Props from parent
  routeMatch,
  tabValue,
  shopDetail,

  // State values
  shopLoading,
  orderLoading,
  selectedProductToEdit,
  addProductDialogOpen,

  // Dispatchers
  showEditProductDialog,
  showAddProductDialog,
  hideProductFormDialog,
  addProduct,
  editProduct,
  deleteProduct,
  updateOrderStatus,
}) {
  const classes = useStyles();

  const handleProductItemClick = (product) => showEditProductDialog(product);
  const handleAddProduct = (product) => addProduct(shopDetail, product);
  const handleEditProduct = (product) => editProduct(shopDetail, product);
  const handleDeleteProduct = (product) => deleteProduct(shopDetail, product);
  const handleUpdateOrderStatus = (order) =>
    updateOrderStatus(shopDetail, order);

  const paths = ["/", "/orders", "/stats"];
  const redirect = <Redirect to={`${routeMatch.path}${paths[tabValue]}`} />;

  const activeOrdersCount = getActiveOrdersCount(shopDetail);
  const pendingOrdersCount = getPendingOrdersCount(shopDetail);
  const productsCount = getProductsCount(shopDetail);
  const outOfStockProductsCount = getOutOfStockProductsCount(shopDetail);
  const totalRevenue = getShopRevenue(shopDetail);
  const pendingRevenue = getPendingRevenue(shopDetail);

  return (
    <Box className={classes.root} fullWidth>
      <Switch>
        <Route path={`${routeMatch.path}/orders`}>
          <Container fullWidth>
            <OrdersList
              orders={shopDetail["orders"] ? shopDetail["orders"] : []}
              loading={orderLoading}
              onOrderAction={handleUpdateOrderStatus}
            />
          </Container>
        </Route>

        <Route path={`${routeMatch.path}/stats`}>
          <Box p={2} display="flex">
            <Grid container fullWidth spacing={2}>
              <Grid item xs={6} lg={3}>
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
              </Grid>

              <Grid item xs={6} lg={3}>
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
              </Grid>

              <Grid item xs={6} lg={3}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Revenue (Rs.)
                    </Typography>
                    <Typography variant="h4">{totalRevenue}</Typography>
                    <Typography variant="body2" component="p" color="error">
                      {pendingRevenue} In Process
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <DetailView
                  title="Shop Details"
                  details={{
                    id: shopDetail["id"],
                    name: shopDetail["title"],
                    created: new Date(
                      shopDetail["date_created"]
                    ).toLocaleString(),
                    revenue: `INR ${shopDetail["revenue"]}`,
                    products: shopDetail["shop_products"]
                      ? shopDetail["shop_products"].length
                      : 0,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Route>

        <Route path={`${routeMatch.path}/`}>
          <Box className={classes.listContainer} fullWidth>
            <EditableProductList
              fullWidth
              productsData={
                shopDetail["shop_products"] ? shopDetail["shop_products"] : []
              }
              onItemClick={handleProductItemClick}
            />
            <Fab
              className={classes.fab}
              color="primary"
              variant="extended"
              onClick={showAddProductDialog}
            >
              <AddRoundedIcon />
              Add Product
            </Fab>
          </Box>
        </Route>
      </Switch>

      {redirect}

      {/* Dialog Box */}
      <Dialog
        open={Boolean(selectedProductToEdit)}
        onClose={hideProductFormDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Edit Product Details</DialogTitle>
        <DialogContent>
          <EditProductForm
            product={selectedProductToEdit}
            loading={shopLoading}
            onSave={handleEditProduct}
            onDelete={handleDeleteProduct}
            onCancel={hideProductFormDialog}
            categories={shopDetail["product_categories"] || []}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={addProductDialogOpen}
        onClose={hideProductFormDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Add Product Details</DialogTitle>
        <DialogContent>
          <AddProductForm
            loading={shopLoading}
            onSave={handleAddProduct}
            onCancel={hideProductFormDialog}
            categories={shopDetail["product_categories"] || []}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedProductToEdit: selectedProduct(state),
    addProductDialogOpen: addProductDialogOpen(state),
    shopLoading: shopLoading(state),
    orderLoading: orderLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showEditProductDialog: (product) =>
      dispatch(showEditProductDialog(product)),
    showAddProductDialog: () => dispatch(showAddProductDialog()),
    hideProductFormDialog: () => dispatch(hideProductFormDialog()),
    editProduct: (shopDetail, product) =>
      dispatch(editProduct(shopDetail, product)),
    addProduct: (shopDetail, product) =>
      dispatch(addProduct(shopDetail, product)),
    deleteProduct: (shopDetail, product) =>
      dispatch(deleteProduct(shopDetail, product)),
    updateOrderStatus: (shopDetail, order) =>
      dispatch(updateOrderStatus(shopDetail, order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerShopView);
