import React, { useEffect, useState } from "react";
import { Label, Menu, Tab, Grid, Container } from "semantic-ui-react";
import ChatBox from "../components/ChatBox";
import Navbar from "../components/Navbar";
import Statistics from "../components/Statistics";
import TodoList from "../components/TodoList";
import Questions from "../components/Questions";
import Assistant from "../components/Assistant";
import QuizScore from "../components/QuizScore";
import { useLocation } from "react-router";
import axios from "axios";
import { api } from "../api";

export default function ChatScreen() {

  const [group,setGroup] = useState({})
 
  const getData = async () => {
    try{
    
    const res = await axios.get(api.oneGroupGet + localStorage.getItem("groupId"));
    setGroup(res.data[0]);
    console.log(res.data[0])
    }catch(e){
      console.log(e)
    }
    console.log("hello")

    // console.log()
    console.log(localStorage.getItem("groupId"));
  }

  useEffect(()=>{
    getData()
  },[])


  const panes = [
    {
      menuItem: { key: "statistics", icon: "pie graph", content: "Statistics" },
      render: () => (
        <Tab.Pane>
          <br />
          <Grid stretched>
            <Statistics group={group} />
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: "tasks", icon: "tasks", content: "Tasks" },
      render: () => (
        <Tab.Pane>
          <br />
          <Grid stretched>
            <TodoList group={group}/>
            <ChatBox group={group}/>
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: "quizzes", icon: "write", content: "Quizzes" },
      render: () => (
        <Tab.Pane>
          <br />
          <Grid columns={3} divided stackable>
            <Grid.Row>
              <Grid.Column>
                <Questions group={group}/>
              </Grid.Column>
              <Grid.Column>
                <Assistant />
              </Grid.Column>
              <Grid.Column>
                <QuizScore group={group}/>
              </Grid.Column>
            </Grid.Row>
            <br />
          </Grid>
        </Tab.Pane>
      ),
    },
  ];
  return (
    <>
      <Navbar />
      <br />
      <Tab panes={panes} />
    </>
  );
}
