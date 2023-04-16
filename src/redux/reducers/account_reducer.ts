import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  getAuth,
  updateProfile,
  User,
} from "firebase/auth";

export type UserState = {
  email: string;
  displayName: string;
  photoURL: string;
  uid: string;
}

export type AccountState = {
  currentUser?: UserState;
  isLoading: boolean;
}

export type Profile = {
  displayName?: string;
  photoURL?: string;
}

const initialState: AccountState = {
  currentUser: undefined,
  isLoading: true,
};

const serializeUser = (user: User) => {
  return {
    uid: user.uid,
    email: user.email ?? "",
    displayName: user.displayName ?? "",
    photoURL: user.photoURL ?? "",
  };
}

export const reloadUserProfile = createAsyncThunk("account/reloadUserProfile", async () => {
  const auth = getAuth();
  if (auth.currentUser == null) {
    return;
  }
  await auth.currentUser.reload();
  return serializeUser(auth.currentUser);
});

export const updateUserInfo = createAsyncThunk("account/updateUserInfo", async (data: Profile, thunkAPI) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user == null) {
    throw new Error("Please login before update profile");
  }
  await updateProfile(user, data);
  await thunkAPI.dispatch(reloadUserProfile());
});

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser(state) {
      const auth = getAuth();
      const { currentUser } = auth;
      if (currentUser == null) {
        return;
      }
      state.currentUser = serializeUser(currentUser);
      state.isLoading = false;
    },
    clearUser(state) {
      state.currentUser = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reloadUserProfile.fulfilled, (state, action) => {
        if (action.payload != null) {
          state.currentUser = action.payload;
        }
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {

      })
  },
});

export const {
  setUser,
  clearUser,
} = accountSlice.actions;
export const {
  reducer: accountReducer,
} = accountSlice;
