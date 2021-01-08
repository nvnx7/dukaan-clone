import { createSelector } from "reselect";

const shopDetailSelector = (state) => state.customer.shopDetail;
const bagSelector = (state) => state.customer.bag;
const loadingSelector = (state) => state.customer.loading;
const placeOrderFormDialogOpenSelector = (state) =>
  state.customer.placeOrderFormDialogOpen;
const errorSelector = (state) => state.customer.error;
const infoSelector = (state) => state.customer.info;

export const shopDetail = createSelector([shopDetailSelector], (shop) => shop);
export const bag = createSelector([bagSelector], (bag) => bag);
export const loading = createSelector([loadingSelector], (loading) => loading);
export const placeOrderFormDialogOpen = createSelector(
  [placeOrderFormDialogOpenSelector],
  (open) => open
);
export const errorMessage = createSelector([errorSelector], (msg) => msg);
export const infoMessage = createSelector([infoSelector], (msg) => msg);
