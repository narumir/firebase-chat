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
  searchTerm: string
}

const Messages: FC<IProps> = ({
  chatRoomID,
  searchTerm,
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
        image: val.image,
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
  const [serachResult, setSearchResult] = useState<MessageState[]>([]);
  useEffect(() => {
    const regex = new RegExp(searchTerm, "gi");
    const result = messages.reduce((p, c) => {
      if ((c.content && c.content.match(regex)) || c.user.displayName.match(regex)) {
        p.push(c);
      }
      return p;
    }, [] as MessageState[]);
    setSearchResult(result);
  }, [searchTerm, messages]);

  return (
    <div>
      {serachResult.length > 0 && searchTerm.length > 0
        ? serachResult.map((message) => (
          <Message key={message.id} message={message} />
        ))
        : messages.map((message) => (
          <Message key={message.id} message={message} />
        ))
      }
    </div>
  );
};

export default Messages;
