import './App.css';
import Options from './components/Options/Options';
import Chats from './components/Chats/Chats';
import ChatBox from './components/ChatBox/ChatBox';
import { useEffect, useState } from 'react';
import Hero from './components/Hero/Hero';
import {io} from 'socket.io-client';

function App({socket}) {
  const [showchat,setshowchat]= useState(false);
  const [username,setusername]=useState("");
  const [room,setroom]=useState("");
  /*Prevent Reload Before Accepting*/
  window.addEventListener("beforeunload",(e)=>{
    e.preventDefault();
  })

  
  // const socket = io("https://web-chat-backend-wb3y.onrender.com")
  // const socket = io("http://localhost:3005");

  useEffect(
    ()=>{
      socket.on('connect',()=>{
    // addmessage('You Connected With Id : '+socket.id)
      })
    },[]
  )

  function join_room(){
    socket.emit("join_room",username,room,(message)=>{
        console.log(message)
      setshowchat(true);
    })
  }


  return (
    <div className="App">
      {showchat==false?
      (<Options setshowchat={setshowchat} room={room} setroom={setroom} username={username} setusername={setusername} socket={socket} join_room={join_room}/>):
        <></>
      }
      {/* <Options setshowchat={setshowchat} room={room} setroom={setroom} username={username} setusername={setusername} socket={socket} join_room={join_room}/> */}
      {/* <Chats/> */}
      {showchat==true?
      (<ChatBox username={username} socket={socket} room={room}/>):
        <></>
      }
      
    </div>
  );
}

export default App;
