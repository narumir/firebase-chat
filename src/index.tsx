import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import {
  Provider as ReduxProvider,
} from "react-redux";
import {
  store,
} from './store';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
