import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  getDatabase,
  ref,
  set,
} from "firebase/database";
import type {
  RootState,
} from "src/redux/store";

type Profile = {
  displayName?: string;
  photoURL?: string;
}
export const updateUserData = createAsyncThunk("db/updateUserInfo", async (data: Profile, thunkAPI) => {

  const rootState: RootState = thunkAPI.getState() as RootState;
  const user = rootState.account.currentUser;
  if (user == null) {
    throw new Error("Please login before update user data");
  }
  const database = getDatabase();
  return set(ref(database, `users/${user.uid}`), data);
});

const dbSlice = createSlice({
  name: "storage",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserData.fulfilled, (state, action) => {

      })
  },
});

// export const {
// } = dbSlice.actions;
export const {
  reducer: dbReducer,
} = dbSlice;
