import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3005");

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