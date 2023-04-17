import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  child,
  getDatabase,
  push,
  ref,
  set,
  update,
} from "firebase/database";
import type {
  RootState,
} from "src/redux/store";

type Profile = {
  displayName?: string;
  photoURL?: string;
}
export const updateUserData = createAsyncThunk("db/updateUserInfo", async (data: Profile, thunkAPI) => {
  const rootState = thunkAPI.getState() as RootState;
  const user = rootState.account.currentUser;
  if (user == null) {
    throw new Error("Please login before update user data.");
  }
  const database = getDatabase();
  return set(ref(database, `users/${user.uid}`), data);
});

type ChatRoom = {
  name: string;
  description: string;
}
export const createChatRoom = createAsyncThunk("db/createChatRoom", async (data: ChatRoom, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const user = state.account.currentUser;
  if (user == null) {
    throw new Error("Please login before create chat room.");
  }
  const database = getDatabase();
  const chatRoomKey = push(child(ref(database), `rooms`)).key;
  if (chatRoomKey == null) {
    return;
  }
  const chatRoom = {
    key: chatRoomKey,
    name: data.name,
    description: data.description,
    createdBy: {
      displayName: user.displayName,
      photoURL: user.photoURL,
    },
  };
  const updates: any = {};
  updates[`/rooms/${chatRoomKey}`] = chatRoom;
  console.log(chatRoom);
  await update(ref(database), updates)
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
