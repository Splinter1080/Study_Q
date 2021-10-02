import React from "react";
import { Grid, Header, Statistic, Label } from "semantic-ui-react";

export default function QuizScore() {
  return (
    <>
      <Header content="Score" />
      <Statistic.Group horizontal>
        <Statistic>
          <Statistic.Value>5</Statistic.Value>
          <Statistic.Label>
              <Label content="Good" color="green"/>
          </Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </>
  );
}
