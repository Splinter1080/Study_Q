import React from "react";
import { Grid, Header, Statistic, Label } from "semantic-ui-react";

export default function QuizScore() {
  return (
    <>
      <Header content="Next survey on" />
      <Statistic.Group horizontal>
        <Statistic>
          <Statistic.Value>5/10/2021</Statistic.Value>
          <Statistic.Label>
              <Label content="Get ready!" color="green"/>
          </Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </>
  );
}
