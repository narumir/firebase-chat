import {
  UploadMetadata,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import mime from "mime";
import {
  FormEvent,
  ChangeEventHandler,
  useState,
  useCallback,
  useRef,
  MouseEvent,
  ChangeEvent,
} from "react";
import {
  Button,
  Col,
  Form,
  ProgressBar,
  Row,
} from "react-bootstrap";
import {
  sendImageMessage,
  sendMessage,
} from "src/redux/reducers";
import {
  useAppDispatch,
} from "src/redux/useStore";

function MessageForm() {
  const [content, setContent] = useState<string | undefined>();
  const [progress, setProgress] = useState<number>(0);
  const [errers, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const fileUploadRef = useRef<HTMLInputElement>(null);

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
  const handleUploadClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    if (fileUploadRef.current == null) {
      return;
    }
    fileUploadRef.current.click();
  }, []);
  const handleFileChanged = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (file == null) {
      return;
    }
    const metadata: UploadMetadata = {
      contentType: mime.getType(file.name) ?? "",
    };
    setLoading(true);
    const storage = getStorage();
    const uploadRef = ref(storage, `messages/${file.name}`);
    const uploadTask = uploadBytesResumable(uploadRef, file, metadata);
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (err) => {
        setLoading(false);
      },
      async () => {
        const photoURL = await getDownloadURL(uploadTask.snapshot.ref);
        await dispatch(sendImageMessage(photoURL));
        setLoading(false);
      },
    );
  }, [dispatch]);
  console.log(errers);
  return (
    <div>
      <Form onSubmit={handleMessageSubmit}>
        <Form.Group>
          <Form.Control as="textarea" disabled={loading} value={content} onChange={handleMessageChange} />
        </Form.Group>
      </Form>
      {(progress !== 0 && progress !== 100) && <ProgressBar style={{ marginTop: "16px" }} variant="warning" label={`${progress.toFixed(1)}%`} now={progress} />}
      <Row>
        <Col>
          <Button onClick={handleMessageSubmit} disabled={loading} className="message-form-button" style={{ width: "100%" }}>Send</Button>
        </Col>
        <Col>
          <input type="file" hidden ref={fileUploadRef} onChange={handleFileChanged} accept="image/jpeg, image/png" />
          <Button className="message-form-button" disabled={loading} style={{ width: "100%" }} onClick={handleUploadClick}>Upload</Button>
        </Col>
      </Row>
    </div>
  );
}

export default MessageForm;
