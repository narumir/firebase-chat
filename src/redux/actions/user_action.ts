import {
  createAction,
} from "@reduxjs/toolkit";
import {
  User,
} from "src/redux/types/user_type";

export const setUser = createAction<User | undefined>("user/set_user");
export const clearUser = createAction("user/clear_user");
