import {
  getDatabase,
  onChildAdded,
  ref,
  off,
} from "firebase/database";
import {
  FC,
  useEffect,
  useState,
} from "react";
import {
  MessageState,
} from "src/redux/reducers";
import Message from "./Message";

type IProps = {
  chatRoomID: string;
}

const Messages: FC<IProps> = ({
  chatRoomID,
}) => {
  const [messages, setMessages] = useState<MessageState[]>([]);
  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, `messages/${chatRoomID}`);
    onChildAdded(messagesRef, (snapshot) => {
      const val = snapshot.val();
      const message: MessageState = {
        id: val.id,
        content: val.content,
        timestamp: val.timestamp,
        user: {
          id: val.user.id,
          photoURL: val.user.photoURL,
          displayName: val.user.displayName,
        }
      };
      setMessages((prev) => prev.concat(message));
    });
    return () => {
      off(messagesRef, "child_added");
      setMessages([]);
    };
  }, [chatRoomID]);

  return (
    <div>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Messages;
