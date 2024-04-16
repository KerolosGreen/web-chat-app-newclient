import { useState } from 'react'
import './Options.css'
import Hero from '../Hero/Hero';
function Options({setshowchat,username,setusername,room,setroom,socket,join_room}){

    function onchange_username(event){
        setusername(event.target.value)
    }

    function onchange_room(event){
        setroom(event.target.value)
    }

    // function join_room(){
    //     socket.emit("join_room",username,room,(message)=>{
    //         console.log(message)
    //     })
    //   }

    async function openchat(){
        if(username!=""&&room!=""){
            await join_room();
            setshowchat(true);
        }
        else{
            alert("Enter Your Name And Room Correctly !")
        }
    }

    return(
        <div className='Options'>
            <Hero/>
            <h4>Web Chat</h4>
            <input type='text' placeholder='Enter Your Name' onChange={onchange_username}/>
            <input type='text' placeholder='Enter Room Name To Join' onChange={onchange_room}/>
            <p>* If There Is No Room , Write A New Name To Create One !</p>
            <button onClick={openchat}>Join Room</button>
        </div>
    )
}
export default Options