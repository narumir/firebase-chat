import CreateChatRoomModal from "./CreateRoom";
import {
  MouseEventHandler,
  useCallback,
  useState,
} from "react";
import {
  FaRegSmileWink,
  FaPlus,
} from "react-icons/fa";
import {
  useChatRoomListener,
} from "src/hooks/useChatRoomListener";
import {
  selectChatRoom,
} from "src/redux/reducers";
import {
  useAppDispatch,
  useAppSelector,
} from "src/redux/useStore";

function ChatRooms() {
  const [isShow, setModalShow] = useState<boolean>(false);
  const onModalOpen = useCallback(() => {
    setModalShow(true);
  }, []);
  const onModalClose = useCallback(() => {
    setModalShow(false);
  }, []);
  useChatRoomListener();
  const dispatch = useAppDispatch();
  const chatRooms = useAppSelector((state) => state.db.chatrooms);
  const currentChatRoomID = useAppSelector((state) => state.db.currentChatRoomID);
  const handleSelectChatRoom = useCallback<MouseEventHandler<HTMLLIElement>>((e) => {
    const key = e.currentTarget.getAttribute("data-key");
    if (key == null) {
      return;
    }
    dispatch(selectChatRoom(key));
  }, [dispatch]);
  return (
    <div>
      <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }}>
        <FaRegSmileWink style={{ marginRight: "3px" }} />
        CHAT ROOMS &nbsp; ({chatRooms.length})
        <FaPlus style={{ position: "absolute", right: "0", cursor: "pointer" }} onClick={onModalOpen} />
      </div>
      <CreateChatRoomModal isShow={isShow} onModalClose={onModalClose} />
      <ul style={{ listStyleType: "none" }}>
        {chatRooms.map((room) => (
          <li key={room.id} data-key={room.id} style={{ borderRadius: "12px", paddingLeft: "12px", backgroundColor: room.id === currentChatRoomID ? "rgb(29, 155, 240)" : "" }} onClick={handleSelectChatRoom}>{room.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ChatRooms;
