import {
  FormEvent,
  MouseEvent,
  ChangeEventHandler,
  useState,
  useCallback,
} from "react";
import {
  Button,
  Col,
  Form,
  ProgressBar,
  Row,
} from "react-bootstrap";
import {
  sendMessage,
} from "src/redux/reducers";
import {
  useAppDispatch,
} from "src/redux/useStore";

function MessageForm() {
  const [content, setContent] = useState<string | undefined>();
  const [errers, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleMessageSubmit = useCallback(async (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    if (content == null || content.length === 0) {
      setErrors((prev) => prev.concat("Type content first."));
      return;
    }
    setLoading(true);
    try {
      await dispatch(sendMessage(content));
      setContent("");
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [content, dispatch]);
  const handleMessageChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((e) => {
    const target = e.target as HTMLTextAreaElement;
    setContent(target.value);
  }, []);
  console.log(errers);
  return (
    <div>
      <Form onSubmit={handleMessageSubmit}>
        <Form.Group>
          <Form.Control as="textarea" disabled={loading} value={content} onChange={handleMessageChange} />
        </Form.Group>
      </Form>
      <ProgressBar style={{ marginTop: "16px" }} variant="warning" label="60%" now={60} />
      <Row>
        <Col>
          <Button onClick={handleMessageSubmit} disabled={loading} className="message-form-button" style={{ width: "100%" }}>Send</Button>
        </Col>
        <Col>
          <Button className="message-form-button" style={{ width: "100%" }}>Upload</Button>
        </Col>
      </Row>
    </div>
  );
}

export default MessageForm;
