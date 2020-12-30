import { createSelector } from "reselect";

const userSelector = (state) => state.auth.user;
const authErrorSelector = (state) => state.auth.error;
const authLoadingSelector = (state) => state.auth.loading;

export const userInfo = createSelector([userSelector], (user) => user);
export const authError = createSelector([authErrorSelector], (error) => error);
export const authLoading = createSelector(
  [authLoadingSelector],
  (loading) => loading
);
