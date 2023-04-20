import { Button, Col, Form, ProgressBar, Row } from "react-bootstrap";

function MessageForm() {
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Control as="textarea" />
        </Form.Group>
      </Form>
      <ProgressBar style={{ marginTop: "16px" }} variant="warning" label="60%" now={60} />
      <Row>
        <Col>
          <Button className="message-form-button" style={{ width: "100%" }}>Send</Button>
        </Col>
        <Col>
          <Button className="message-form-button" style={{ width: "100%" }}>Send</Button>
        </Col>
      </Row>
    </div>
  );
}

export default MessageForm;
