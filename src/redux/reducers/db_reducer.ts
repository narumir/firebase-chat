import {
  PayloadAction,
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

type DatabaseState = {
  chatrooms: ChatRoomState[];
  currentChatRoomID?: string;
}

type ChatRoomState = {
  key: string;
  name: string;
  description: string;
  createdBy: {
    displayName: string;
    photoURL: string;
  }
}

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
  await update(ref(database), updates);
});


const initialState: DatabaseState = {
  chatrooms: [],
  currentChatRoomID: undefined
};

const dbSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    addChatRoom(state, action: PayloadAction<ChatRoomState>) {
      state.chatrooms.push(action.payload);
    },
    selectChatRoom(state, action: PayloadAction<string>) {
      state.currentChatRoomID = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserData.fulfilled, (state, action) => {

      })
  },
});

export const {
  addChatRoom,
  selectChatRoom,
} = dbSlice.actions;
export const {
  reducer: dbReducer,
} = dbSlice;
