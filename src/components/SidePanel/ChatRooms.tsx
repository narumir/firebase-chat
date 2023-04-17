import {
  useCallback,
  useState,
} from "react";
import {
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import {
  useForm,
} from "react-hook-form";
import {
  FaRegSmileWink,
  FaPlus,
} from "react-icons/fa";
import {
  createChatRoom,
} from "src/redux/reducers";
import {
  useAppDispatch,
} from "src/redux/useStore";

type CreateChatRoomFormData = {
  name: string;
  description: string;
}

function ChatRooms() {
  const dispatch = useAppDispatch();
  const [isShow, setModalShow] = useState<boolean>(false);
  const onModalOpen = useCallback(() => {
    setModalShow(true);
  }, []);
  const onModalClose = useCallback(() => {
    setModalShow(false);
  }, []);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateChatRoomFormData>();
  const onChatroomSubmit = handleSubmit(async (data) => {
    await dispatch(createChatRoom(data));
    reset();
    setModalShow(false);
  });
  return (
    <div>
      <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center" }}>
        <FaRegSmileWink style={{ marginRight: "3px" }} />
        CHAT ROOMS &nbsp; (1)
        <FaPlus style={{ position: "absolute", right: "0", cursor: "pointer" }} onClick={onModalOpen} />
      </div>
      <Modal show={isShow} onHide={onModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a chat room</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onChatroomSubmit}>
          <Modal.Body>
            <Form.Group controlId="room-name">
              <Form.Label>방 이름</Form.Label>
              <Form.Control {...register("name", { required: true })} type="text" placeholder="Enter a chat room name" />
              {errors.name?.type === "required" && <p>This name feild is required</p>}
            </Form.Group>
            <Form.Group controlId="room-description">
              <Form.Label>방 설명</Form.Label>
              <Form.Control {...register("description", { required: true })} type="text" placeholder="Enter a chat room description" />
              {errors.description?.type === "required" && <p>This description feild is required</p>}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">Create</Button>
            <Button variant="secondary" onClick={onModalClose}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ChatRooms;
