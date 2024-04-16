import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { io } from 'socket.io-client';

const socket = io("https://web-chat-backend-wb3y.onrender.com");

  // useEffect(
  //   ()=>{
  //     socket.on('connect',()=>{
  //   // addmessage('You Connected With Id : '+socket.id)
  //     })
  //   },[]
  // )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App socket={socket} />
  /* </React.StrictMode> */
);
