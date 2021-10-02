import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button, Comment, Form, Segment } from "semantic-ui-react";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3000");

export default function ChatBox() {
  const [name, setName] = useState("Supreet");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("test");
  const [groupId, setGroupId] = useState("not");

  const [messageList, setMessageList] = useState([
    {
      message:
        " The hours, minutes and seconds stand as visible reminders that your effort put them all there.",
      name: "Anshika",
    },
    {
      message:
        " Preserve until your next run, when the watch lets you see how Impermanent your efforts are.",
      name: "Jayshree",
    },
  ]);

  useEffect(() => {
    socket.on('message',({ name, message,userId,groupId })=>{
      setMessageList([...messageList,{ name, message }]);
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

    // setMessageList([...messageList,{ name, message }]);
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
      </Form>
    </Comment.Group>
  );
}
