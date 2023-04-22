import {
  FC,
} from "react";
import {
  FaLock,
} from "react-icons/fa";
import {
  MdFavorite,
} from "react-icons/md";
import {
  AiOutlineSearch,
} from "react-icons/ai";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Image,
  Accordion,
} from "react-bootstrap";
import {
  ChatRoomState,
} from "src/redux/reducers";

type IProps = {
  chatroom: ChatRoomState;
}

const MessageHeader: FC<IProps> = (props) => {
  return (
    <div style={{ width: "100%", height: "186px", border: "0.2rem solid #ececec", borderRadius: "4px", padding: "1rem", marginBottom: "1rem" }}>
      <Container>
        <Row>
          <Col>
            <h2>
              <FaLock />
              {props.chatroom.name}
              <MdFavorite />
            </h2>
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <AiOutlineSearch />
              </InputGroup.Text>
              <FormControl placeholder="Search Message" aria-label="Search Message" />
            </InputGroup>
          </Col>
        </Row>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <p>
            <Image roundedCircle style={{ width: "30px", height: "30px", marginTop: "3px" }} src={props.chatroom.createdBy.photoURL} />
            {props.chatroom.createdBy.displayName}
          </p>
        </div>
        <Row>
          <Col>
            <Accordion defaultActiveKey="-1" >
              <Accordion.Item eventKey="0">
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Body>
                  {props.chatroom.description}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col>
            <Accordion defaultActiveKey="-1" style={{ padding: "0 1rem" }}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Accordion Item #1</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div >
  );
}

export default MessageHeader;
