import {
  useLayoutEffect,
} from 'react';
import {
  getAnalytics,
} from "firebase/analytics";
import {
  Outlet,
} from 'react-router-dom';
import {
  firebaseApp,
} from './firebase';
function App() {
  useLayoutEffect(() => {
    getAnalytics(firebaseApp);
  }, []);
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
