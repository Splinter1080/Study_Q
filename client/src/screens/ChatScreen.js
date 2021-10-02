import React, { useState } from "react";
import { Label, Menu, Tab, Grid, Container } from "semantic-ui-react";
import ChatBox from "../components/ChatBox";
import Navbar from "../components/Navbar";
import Statistics from "../components/Statistics";
import TodoList from "../components/TodoList";
import Questions from "../components/Questions";
import Assistant from "../components/Assistant";
import QuizScore from "../components/QuizScore";

export default function ChatScreen() {
  const panes = [
    {
      menuItem: { key: "statistics", icon: "pie graph", content: "Statistics" },
      render: () => (
        <Tab.Pane>
          <br />
          <Grid stretched>
            <Statistics />
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
            <TodoList />
            <ChatBox />
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
                <Questions />
              </Grid.Column>
              <Grid.Column>
                <Assistant />
              </Grid.Column>
              <Grid.Column>
                <QuizScore />
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
