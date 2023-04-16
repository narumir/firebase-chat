import {
  configureStore,
} from "@reduxjs/toolkit";
import {
  dbReducer,
  storageReducer,
  accountReducer,
} from "./reducers";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    storage: storageReducer,
    db: dbReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
