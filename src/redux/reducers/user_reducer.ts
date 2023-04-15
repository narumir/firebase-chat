import {
  createReducer,
} from "@reduxjs/toolkit";
import {
  setUser,
  clearUser,
} from "src/redux/actions/user_action";
import {
  User
} from "src/redux/types/user_type";

const initialState: { isLoading: boolean, currentUser?: User } = {
  currentUser: undefined,
  isLoading: true,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    })
    .addCase(clearUser, (state, action) => {
      state.currentUser = undefined;
    });
});
