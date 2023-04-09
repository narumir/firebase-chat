import {
  useEffect,
} from "react";
import {
  useNavigate,
} from "react-router-dom"
import {
  useDispatch,
  useSelector,
} from "react-redux"
import {
  getAuth,
} from "firebase/auth";
import {
  Outlet,
} from 'react-router-dom';
import {
  setUser
} from "./redux/actions/user_action";
import {
  RootState
} from "./store";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email:string = useSelector<RootState>((state) => state.user.currentUser?.email ?? "") as string;
  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
		navigate(user ? "/" : "/login");
		if(user) {
			const data = {
				email: user.email as string,
				displayName: user.displayName as string,
				photoURL: user.photoURL as string,
			}
			dispatch(setUser(data));
		} else {
			dispatch(setUser());
		}
	});
  }, []);
  return (
    <div className="App">
	  <p style={{color: "white"}}>{email}</p>
      <Outlet />
    </div>
  );
}

export default App;
