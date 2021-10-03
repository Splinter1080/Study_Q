import React, { useEffect, useState } from "react";
import { Card, Form, Checkbox, Button, Input, Header } from "semantic-ui-react";
import {io} from 'socket.io-client'

const socket = io.connect('http://localhost:3000')

export default function Chat() {
  const [name, setName] = useState("bum");
  const [message, setMessage] = useState('');
  const [messageList,setMessageList] = useState([])

  useEffect(()=>{
    socket.emit('join',{name,message})

    return()=>{
        socket.emit('disconnect')
        socket.off()
    }

  },[])

  const onSend = ()=>{
      try{
      socket.emit('message',{name,message})
      }catch(e){console.log(e)}
      setMessageList([...messageList],{name,message})
      setMessage('')
      //setName('')
  }

  const renderMessages = ()=>{
      return(
          messageList.map(({name,message},index)=>(
          <Header content={message}/>
          )))
      
  }


 
  return (
    <Card>
        <Card.Content>
          <Card.Header>Chat engine</Card.Header>
          <Card.Description>
             {renderMessages()}
            <Form>
              <Form.Field>
               <Form.Input value={message} onChange={(e)=>setMessage(e.target.value)}/>
              </Form.Field>
              <Button content="Submit" color="green" onClick={onSend}/>
            </Form>
          </Card.Description>
        </Card.Content>
      

       
    </Card>
  );
}
