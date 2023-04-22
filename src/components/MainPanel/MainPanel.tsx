import {
  useMemo,
} from "react";
import {
  useAppSelector,
} from "src/redux/useStore";
import MessageForm from "./MessageForm";
import MessageHeader from "./MessageHeader";
import Messages from "./Messages";

function MainPanel() {
  const currentChatRoomID = useAppSelector((state) => state.db.currentChatRoomID);
  const chatrooms = useAppSelector((state) => state.db.chatrooms);
  const chatroom = useMemo(() => chatrooms.find((val) => val.id === currentChatRoomID), [chatrooms, currentChatRoomID]);

  return (
    <div style={{
      padding: "2rem 2rem 0 2rem",
    }}>
      {chatroom != null && <MessageHeader chatroom={chatroom} />}
      <div style={{
        width: "100%",
        height: "378px",
        border: ".0rem, solid, #ececec",
        borderRadius: "4px",
        padding: "1rem",
        marginBottom: "1rem",
        overflowY: "auto",
      }}>
        {chatroom != null && <Messages chatRoomID={chatroom.id} />}
      </div>
      {chatroom != null && <MessageForm />}
    </div>
  );
}

export default MainPanel;
