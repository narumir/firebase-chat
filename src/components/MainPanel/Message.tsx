import {
  FC, useMemo,
} from "react";
import {
  Card,
} from "react-bootstrap";
import {
  MessageState,
} from "src/redux/reducers";
import dayjs from "dayjs";
import { useAppSelector } from "src/redux/useStore";

type IProps = {
  message: MessageState;
}

const Message: FC<IProps> = ({ message }) => {
  const me = useAppSelector((state) => state.account.currentUser);
  const isMyMessage = useMemo(() => message.user.id === me?.uid, [me, message]);
  return (
    <Card style={{ margin: "8px 0" }}>
      <Card.Body style={{ display: "flex", backgroundColor: isMyMessage ? "#CECECE" : undefined }}>
        <img width={64} height={64} alt={message.user.displayName} style={{ borderRadius: "10px" }} src={message.user.photoURL} />
        <div style={{ paddingLeft: "16px" }}>
          <h6>{message.user.displayName} &nbsp;
            <span style={{ fontSize: "10px", color: "gray" }}>{dayjs(message.timestamp).fromNow()}</span>
          </h6>
          {message.image && <img style={{ maxWidth: "300px" }} alt={message.image} src={message.image} />}
          {message.content && <p>{message.content}</p>}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Message;
