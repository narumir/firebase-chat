import mime from "mime";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  updateUserInfo,
} from "./account_reducer";
import {
  updateUserData,
} from "./db_reducer";
import type {
  UploadMetadata,
} from "firebase/storage";
import type {
  RootState,
} from "src/redux/store";

export const uploadUserPhoto = createAsyncThunk("storage/uploadUserPhoto", async (file: File, thunkAPI) => {
  const metadata: UploadMetadata = {
    contentType: mime.getType(file.name) ?? "",
  };
  const rootState: RootState = thunkAPI.getState() as RootState;
  const user = rootState.account.currentUser;
  if (user == null) {
    throw new Error("Please login before upload photo");
  }
  const storage = getStorage();
  const uploadRef = ref(storage, `/user_image/${user.uid}`);
  const upload = await uploadBytes(uploadRef, file, metadata);
  const photoURL = await getDownloadURL(upload.ref);
  await thunkAPI.dispatch(updateUserInfo({ photoURL }));
  await thunkAPI.dispatch(updateUserData({ photoURL, displayName: user.displayName }));
});

const storageSlice = createSlice({
  name: "storage",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadUserPhoto.fulfilled, (state, action) => {

      })
  },
});

// export const {
// } = storageSlice.actions;
export const {
  reducer: storageReducer,
} = storageSlice;
