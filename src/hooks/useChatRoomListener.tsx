import {
  getDatabase,
  off,
  onChildAdded,
  onChildRemoved,
  ref,
} from "firebase/database";
import {
  useEffect,
} from "react";
import { addChatRoom } from "src/redux/reducers";
import {
  useAppDispatch,
} from "src/redux/useStore";

export const useChatRoomListener = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const database = getDatabase();
    const chatRoomsRef = ref(database, "rooms");
    onChildAdded(chatRoomsRef, (snapshot) => {
      dispatch(addChatRoom(snapshot.val()));
      console.log(snapshot.key);
    });
    onChildRemoved(chatRoomsRef, (snapshot) => {
      console.log(snapshot.key);
    });
    return () => {
      off(chatRoomsRef, "child_added");
      off(chatRoomsRef, "child_removed");
    };
  }, [dispatch]);
};
