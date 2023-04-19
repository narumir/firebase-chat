import CreateChatRoomModal from "./CreateRoom";
import {
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
import { useAppSelector } from "src/redux/useStore";

function ChatRooms() {
  const [isShow, setModalShow] = useState<boolean>(false);
  const onModalOpen = useCallback(() => {
    setModalShow(true);
  }, []);
  const onModalClose = useCallback(() => {
    setModalShow(false);
  }, []);
  useChatRoomListener();
  const chatRooms = useAppSelector((state) => state.db.chatrooms);

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
          <li key={room.key}>{room.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ChatRooms;
