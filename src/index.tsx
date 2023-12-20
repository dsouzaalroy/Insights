import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CallbackPage from './components/Callback';
import { HashRouter as Router, Route, HashRouter, Routes, BrowserRouter, Link} from 'react-router-dom';
// import {
//   createHashRouter,
//   RouterProvider,
// } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// const router = createBrowserRouter([
//   {
//     path:"/",
//     element: <App/>
//   },
//   {
//     path:"/callback",
//     element:<CallbackPage/>
//   }
// ])

root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <HashRouter>
      <Routes>
        <Route path="/" Component={App}/>
        <Route path="/callback" Component={CallbackPage}/>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
