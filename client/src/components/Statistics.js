import axios from "axios";
import React, { useEffect, useState } from "react";
import { Grid, Header, Statistic, Label } from "semantic-ui-react";
import { api } from "../api";

export default function Statistics({ group }) {
  return (
    <Grid columns={3} divided stretched stackable>
      <Grid.Row>
        <Grid.Column>
          <Header content="Creator" />
          <Statistic.Group horizontal>
            <Statistic>
              <Statistic.Value>
                {group.createdBy || "Anonymous"}
              </Statistic.Value>
              <Statistic.Label>
                {localStorage.getItem("isPro") && (
                  <Label as="a" color="violet" content="Pro" />
                )}
              </Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Grid.Column>
        <Grid.Column>
          <Header content="Details" />
          <Statistic.Group horizontal>
            <Statistic>
              <Statistic.Value>5</Statistic.Value>
              <Statistic.Label>Users</Statistic.Label>
            </Statistic>
            <Statistic>
            <Statistic.Label>{group._id || ''}</Statistic.Label>
              <Statistic.Label>Group id</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>
                {group.tasks ? group.tasks.length : 0}
              </Statistic.Value>
              <Statistic.Label>Tasks</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Grid.Column>
        <Grid.Column>
          <Header content="Duration" />
          <Statistic.Group horizontal>
            <Statistic>
              <Statistic.Value>{group.deadline}H:00M</Statistic.Value>
            </Statistic>
          </Statistic.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
