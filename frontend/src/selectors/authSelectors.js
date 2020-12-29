import { createSelector } from "reselect";

const userSelector = (state) => state.auth.user;
const authErrorSelector = (state) => state.auth.error;

export const userInfo = createSelector([userSelector], (user) => user);
export const authError = createSelector([authErrorSelector], (error) => error);
