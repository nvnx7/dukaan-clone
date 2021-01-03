import { createSelector } from "reselect";

const tabSelector = (state) => state.dashboard.tabValue;
const selectedShopSelector = (state) => state.dashboard.selectedShop;
const shopsListSelector = (state) => state.dashboard.shops;

export const tabValue = createSelector([tabSelector], (tabValue) => tabValue);
export const selectedShop = createSelector(
  [selectedShopSelector],
  (selectedShop) => selectedShop
);
export const shopsList = createSelector([shopsListSelector], (shops) => shops);
