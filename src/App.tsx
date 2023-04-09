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
  Outlet,
} from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((account) => navigate(account ? "/" : "/login"));
  }, []);
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
