import { createSelector } from "reselect";

const shopDetailSelector = (state) => state.shop.shopDetail;
const selectedProductSelector = (state) => state.shop.selectedProduct;
const addProductDialogOpenSelector = (state) => state.shop.addProductDialogOpen;
const shopLoadingSelector = (state) => state.shop.loading;

export const shopDetail = createSelector(
  [shopDetailSelector],
  (shopDetail) => shopDetail
);

export const selectedProduct = createSelector(
  [selectedProductSelector],
  (product) => product
);

export const addProductDialogOpen = createSelector(
  [addProductDialogOpenSelector],
  (open) => open
);

export const shopLoading = createSelector(
  [shopLoadingSelector],
  (loading) => loading
);
