import {
  useLayoutEffect,
} from 'react';
import {
  getAnalytics,
} from "firebase/analytics";
import {
  firebaseApp,
} from './firebase';
import logo from './logo.svg';
import './App.css';

function App() {
  useLayoutEffect(() => {
    getAnalytics(firebaseApp);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
