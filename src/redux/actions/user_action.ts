import {
  createAction, 
} from "@reduxjs/toolkit";
import {
  User,
} from "../types/user_type";

export const setUser = createAction<User | undefined>("user/set_user");
