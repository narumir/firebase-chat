import {
  configureStore,
} from "@reduxjs/toolkit";
import {
  userReducer
} from "src/redux/reducers/user_reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
