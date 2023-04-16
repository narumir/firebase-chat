import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import {
  Provider as ReduxProvider,
} from "react-redux";
import {
  store,
} from 'src/redux/store';
import {
  initializeFirebase,
} from './firebase';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
]);

const element = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(element);
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);

initializeFirebase();
