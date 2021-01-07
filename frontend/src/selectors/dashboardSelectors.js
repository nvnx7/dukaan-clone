import { createSelector } from "reselect";

const tabSelector = (state) => state.dashboard.tabValue;
const selectedShopSelector = (state) => state.dashboard.selectedShop;
const shopsListSelector = (state) => state.dashboard.shopsList;
const loadingSelector = (state) => state.dashboard.loading;
const errorSelector = (state) => state.dashboard.error;
const infoSelector = (state) => state.dashboard.info;
const drawerSelector = (state) => state.dashboard.drawerOpen;
const addShopDialogFormSelector = (state) =>
  state.dashboard.addShopDialogFormOpen;

export const tabValue = createSelector([tabSelector], (tabValue) => tabValue);
export const selectedShop = createSelector(
  [selectedShopSelector],
  (selectedShop) => selectedShop
);
export const shopsList = createSelector([shopsListSelector], (shops) => shops);
export const loading = createSelector([loadingSelector], (loading) => loading);
export const errorMessage = createSelector([errorSelector], (msg) => msg);
export const infoMessage = createSelector([infoSelector], (msg) => msg);
export const drawerOpen = createSelector([drawerSelector], (open) => open);
export const addShopFormDialogOpen = createSelector(
  [addShopDialogFormSelector],
  (open) => open
);
