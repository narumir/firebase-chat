import ChatPage from 'src/pages/chat';
import {
  useEffect,
} from "react";
import {
  useNavigate,
} from "react-router-dom"
import {
  getAuth,
} from "firebase/auth";
import {
  setUser,
} from "src/redux/reducers";
import {
  useAppDispatch,
} from "src/redux/useStore";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      dispatch(setUser());
      navigate(user ? "/" : "/login");
    });
  }, [dispatch, navigate]);
  return (
    <ChatPage />
  );
}

export default App;
