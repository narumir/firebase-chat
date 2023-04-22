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

export type ChatRoomState = {
  id: string;
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
  const database = getDatabase();
  const chatRoomID = push(child(ref(database), `rooms`)).key;
  if (user == null || chatRoomID == null) {
    throw new Error("Please login before create chat room.");
  }
  const chatRoom = {
    id: chatRoomID,
    name: data.name,
    description: data.description,
    createdBy: {
      displayName: user.displayName,
      photoURL: user.photoURL,
    },
  };
  await update(ref(database, `rooms/${chatRoomID}`), chatRoom);
});

export type MessageState = {
  id: string;
  content?: string;
  image?: string;
  timestamp: number;
  user: {
    id: string;
    photoURL: string;
    displayName: string;
  }
}

export const sendMessage = createAsyncThunk("db/sendMessage", async (data: string, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const user = state.account.currentUser;
  const { currentChatRoomID } = state.db;
  if (user == null || currentChatRoomID == null) {
    return;
  }
  const database = getDatabase();
  const messageKey = push(child(ref(database), `messages/${currentChatRoomID}`)).key;
  if (messageKey == null) {
    return;
  }
  const message = {
    id: messageKey,
    content: data,
    timestamp: Date.now(),
    user: {
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
    },
  };
  await update(ref(database, `/messages/${currentChatRoomID}/${messageKey}`), message);
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
      .addCase(sendMessage.fulfilled, (state, action) => {

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
