import React from "react";
import { Grid, Header, Statistic, Label } from "semantic-ui-react";

export default function Statistics() {
  return (
    <Grid columns={3} divided stretched stackable>
      <Grid.Row>
        <Grid.Column>
          <Header content="Creator" />
          <Statistic.Group horizontal>
            <Statistic>
              <Statistic.Value>Akhil P</Statistic.Value>
              <Statistic.Label>
                <Label as="a" color="violet" content="Pro" />
              </Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Grid.Column>
        <Grid.Column>
          <Header content="I need content" />
          <Statistic.Group horizontal>
            <Statistic>
              <Statistic.Value>5</Statistic.Value>
              <Statistic.Label>Users</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>3,322</Statistic.Value>
              <Statistic.Label>Points</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>22</Statistic.Value>
              <Statistic.Label>Tasks</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Grid.Column>
        <Grid.Column>
          <Header content="Time Left" />
          <Statistic.Group horizontal>
            <Statistic>
              <Statistic.Value>5H:43M</Statistic.Value>
            </Statistic>
          </Statistic.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
