import { createSelector } from "reselect";

const orderLoadingSelector = (state) => state.order.loading;

export const orderLoading = createSelector(
  [orderLoadingSelector],
  (loading) => loading
);
