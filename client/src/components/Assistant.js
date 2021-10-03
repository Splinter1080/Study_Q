import React, { useState } from "react";
import ReactTypingEffect from "react-typing-effect";
import { Card, Form, Checkbox, Button } from "semantic-ui-react";

export default function Assistant() {

  let arr = [
    "Do you sleep at 2 am ?",
    "Do you attend classes regularly?",
    "Do you have sufficient amount of sleep?",
    "Do you need someone to train you?",
  ];


  return (
    <Card style={{margin:"10px"}}>
        <Card.Content>
          <Card.Header>Virtual Assistant</Card.Header>
          <Card.Description >
          <ReactTypingEffect
        text={["Good Job! Keep going","In a world full of rotis you are my paratha <3","You have been doing great!","You are awesome :)","You can do it!","You never quit!"]}
      />
          </Card.Description>
        </Card.Content>

     
    </Card>
  );
}
