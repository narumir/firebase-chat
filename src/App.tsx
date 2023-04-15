import {
  useEffect,
} from "react";
import {
  useNavigate,
} from "react-router-dom"
import {
  useDispatch,
} from "react-redux"
import {
  getAuth,
} from "firebase/auth";
import ChatPage from 'src/pages/chat';
import {
  setUser
} from "src/redux/actions/user_action";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      navigate(user ? "/" : "/login");
      if (user) {
        const data = {
          email: user.email as string,
          displayName: user.displayName as string,
          photoURL: user.photoURL as string,
          uid: user.uid,
        }
        dispatch(setUser(data));
      } else {
        dispatch(setUser());
      }
    });
  }, [dispatch, navigate]);
  return (
    <ChatPage />
  );
}

export default App;
