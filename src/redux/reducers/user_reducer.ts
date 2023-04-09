import {
  createReducer,
} from "@reduxjs/toolkit";
import {
  setUser,
} from "../actions/user_action";
import {
  User
} from "../types/user_type";

const initialState: {isLoading: boolean, currentUser?: User} = { 
  currentUser: undefined,
  isLoading: true,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
	  state.currentUser = action.payload;
      state.isLoading = false;
    });
});
