import { useEffect, useState } from 'react';
import './ChatBox.css'
import BeatLoader from "react-spinners/BeatLoader";
import { IoIosSend } from "react-icons/io";
function ChatBox({username,socket,room}){
    // const messages = [

    //     {
    //         sender: "Alice",
    //         message: "Hey, how's it going?",
    //         time: "10:00 AM"
    //     },
    //     {
    //         sender: "Bob",
    //         message: "Hi Alice! I'm doing well, thanks for asking. How about you?",
    //         time: "10:02 AM"
    //     },
    //     {
    //         sender: "Alice",
    //         message: "I'm good too, thanks. Did you see that new movie everyone's talking about?",
    //         time: "10:05 AM"
    //     },
    //     {
    //         sender: "Bob",
    //         message: "Yeah, I saw it last weekend. It was awesome!",
    //         time: "10:10 AM"
    //     },
    //     {
    //         sender: "Alice",
    //         message: "Nice! I've been meaning to watch it. What did you like most about it?",
    //         time: "10:15 AM"
    //     },
    //     {
    //         sender: "Bob",
    //         message: "The special effects were incredible, and the storyline kept me on the edge of my seat.",
    //         time: "10:20 AM"
    //     },
    //     {
    //         sender: "Alice",
    //         message: "That sounds amazing! I'll definitely check it out.",
    //         time: "10:25 AM"
    //     },
    //     {
    //         sender: "Bob",
    //         message: "You should! Let me know what you think after you watch it.",
    //         time: "10:30 AM"
    //     },
    //     {
    //         sender: "Alice",
    //         message: "Will do! By the way, have you made any plans for this weekend?",
    //         time: "10:35 AM"
    //     },
    //     {
    //         sender: "Bob",
    //         message: "Not yet. Do you have anything in mind?",
    //         time: "10:40 AM"
    //     },
    //     {
    //         sender: "Alice",
    //         message: "I was thinking we could go hiking if the weather's nice.",
    //         time: "10:45 AM"
    //     },
    //     {
    //         sender: "Bob",
    //         message: "That sounds like a great idea! Count me in.",
    //         time: "10:50 AM"
    //     },
    //     {
    //         sender: "Alice",
    //         message: "Awesome! Let's plan the details later.",
    //         time: "10:55 AM"
    //     },
    //     {
    //         sender: "Bob",
    //         message: "Sure thing. Looking forward to it!",
    //         time: "11:00 AM"
    //     },
    //     {
    //         sender: "Alice",
    //         message: "Me too! See you soon.",
    //         time: "11:05 AM"
    //     },
    //     {
    //         sender: "Bob",
    //         message: "Take care!",
    //         time: "11:10 AM"
    //     },
    //     {
    //         sender: "Alice",
    //         message: "You too!",
    //         time: "11:15 AM"
    //     },
    //     {
    //         sender: "Bob",
    //         message: "Goodbye.",
    //         time: "11:20 AM"
    //     },
    //     {
    //         sender: "Alice",
    //         message: "Bye!",
    //         time: "11:25 AM"
    //     },
    //     {
    //         sender: "Bob",
    //         message: "lore",
    //         time: "11:30 AM"
    //     }
    // ];
    const [messages,setmessages]=useState([]);
    const [message,setmessage]=useState("");
    const [typer,settyper]=useState("");

    function onchange_message(event){
        setmessage(event.target.value)
        socket.emit('startedtyping',username);
    }

    function sendmessage(){
        if(message!=""){

        
        socket.emit("send-message",username,message,room,(res)=>{
            addtochat(res,username)
        })
       document.body.getElementsByTagName('input')[0].value="";
       setmessage("")
    }
      }

    async function addtochat(msg,user){
        const chatbody = document.body.getElementsByClassName('ChatBox-Body')[0];
        let time =new Date();
        let message = {
            "message":msg,
            "sender":user,
            "time": time.toLocaleString('en-US', { hour: 'numeric',minute:'2-digit', hour12: true })
        }
         await setmessages((messages)=>[...messages,message]);
        chatbody.scrollTo(0, chatbody.scrollHeight);
    }
        // setTimeout(
        //     ()=>{
        //         const inp = document.body.getElementsByTagName('input')[2];
        //     inp.addEventListener("keyup", function(event) {
        //         if (event.keyCode === 13) {
        //             sendmessage();
        //         }
        //     })
        //     },1000
        // )
        


    useEffect(
        ()=>{
          socket.on('recieve-message',(message,user)=>{
            addtochat(message,user)
            document.body.getElementsByClassName('typing')[0].style.display='none'
        })

        socket.on('typing',(user)=>{
            const typing_message = document.body.getElementsByClassName('typing')[0];
            typing_message.style.display='block'
            settyper(user)
            setTimeout(
                ()=>{
                    typing_message.style.display='none';
                },3000
            )
            
        })
        },[socket]
      )

    return(
        <div className='ChatBox'>
            <div className='ChatBox-Info'>
                <div className='ChatBox-Info-Details'>
                    {/* <div className='ChatBox-Info-Details-img'>
                        
                    </div> */}
                    <div className='ChatBox-Info-Details-ContactInfo'>
                    <h5>{room}</h5>
                    <p>Room</p>
                    </div>
                </div>
                <div className='ChatBox-Info-Operations'>
                <div className='ChatBox-Info-Operations-menu'>
                    MENU
                </div>
                </div>

            </div>

            <div className='ChatBox-Body'>

                {
                    messages.map(
                        (message)=>(
                            <div id={message.sender===username?"You":"Other"} className='ChatBox-Body-message'>
                            <h4 className='ChatBox-Body-message-author'>
                                {message.sender}
                            </h4>
                            <p className='ChatBox-Body-message-text'>
                                {message.message}
                            </p>
                            <p className='ChatBox-Body-message-time'>
                                {message.time}
                            </p>
                            </div>
                        )
                    )
                }
                <div className='typing'>
                    <p>{typer} Is Typing...</p>
                    <BeatLoader size="7px" color="#1990FF" />
                </div>
                
                
            </div>

            <div className='ChatBox-Input'>
            <input type='text' placeholder='Type Something...' 
            onChange={onchange_message}
            onKeyDown={(e) => {
            if (e.code === 'Enter' || e.keyCode == 13 ) {
                sendmessage();
            }
            }}
            />
            <button className='send-message-button' onClick={sendmessage}><IoIosSend /></button>
            </div>
            
        </div>
    )
}
export default ChatBox