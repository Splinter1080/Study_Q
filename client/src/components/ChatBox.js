import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { Button, Comment, Form, Segment } from "semantic-ui-react";
import { io } from "socket.io-client";
import { api } from "../api";
import addNotification from 'react-push-notification';


const socket = io.connect("http://localhost:3000");

export default function ChatBox({group}) {
  const [name, setName] = useState(localStorage.getItem("name"));
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [groupId, setGroupId] = useState(localStorage.getItem("groupId"));
  const [first,setFirst] = useState(true)

  const [messageList, setMessageList] = useState([]);

  const getMessages = async ()=>{
    try{
const res= await axios.get(api.getMessages+localStorage.getItem("groupId"))
console.log(res.data)
setMessageList(res.data)

    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    if(first){
    getMessages()
    setFirst(false)
    }
    socket.on('message',({ name, message,userId,groupId })=>{
      setMessageList([...messageList,{ name, message }]);
      if(userId != localStorage.getItem("userId")){
      addNotification({
        title: 'Notification',
        message: 'You have a new message',
        theme: 'darkblue',
        native: true // when using native, your OS will handle theming.
    });
  }
    })
    var objDiv = document.getElementById("scroll");
    objDiv.scrollTop = objDiv.scrollHeight;
  setUserId(localStorage.getItem("userId"))
  setGroupId(localStorage.getItem("groupId"))
    //-----------------------------------------

    socket.emit("join", ({ name, message,userId,groupId }));

  }, [messageList]);

  const onSend = () => {
    try {
      socket.emit("sendMessage", ({ name, message,userId,groupId }));
    } catch (e) {
      console.log(e);
    }

     //setMessageList([...messageList,{ name, message }]);
    console.log(messageList)
    setMessage("");
    //setName('')
  };

  return (
    <Comment.Group>
      <Segment id="scroll" style={{ overflow: "auto", maxHeight: "80%" }}>
        {messageList.map((key,index)=>(
           (
            <Comment key={index}>
            <Comment.Avatar
              as="a"
              src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
            />
            <Comment.Content>
              <Comment.Author>{key.name}</Comment.Author>
              <Comment.Text>
               {key.message}
              </Comment.Text>
            </Comment.Content>
          </Comment>
  
          )
        ))}
       
      </Segment>
      <Form reply>
        <TextareaAutosize minRows={1} onChange={(e)=>setMessage(e.target.value)} value={message} />
        <Button
          style={{ marginTop: "10px" }}
          content="Send"
          labelPosition="left"
          icon="send"
          primary
          onClick={onSend}
        />
        <Link to="/video">
        <Button
          style={{ marginTop: "10px" }}
          content="Video Call"
          labelPosition="right"
          icon="video"
          primary
        />
        </Link>
      </Form>
    </Comment.Group>
  );
}
