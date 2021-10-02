import React from "react";
import { Button, Icon, Image, List } from "semantic-ui-react";

export default function TodoList() {
  return (
      
    <List divided relaxed>
      <List.Item>
        <List.Icon
          name="hand point right"
          size="large"
          verticalAlign="middle"
        />
        <List.Content>
          <List.Header as="a">Semantic-Org/Semantic-UI</List.Header>
          <List.Description></List.Description>
        </List.Content>
        <Button size="mini" inverted color="green" floated="right">
        <Icon name="check" />
      </Button>
      </List.Item>
     
      <List.Item>
        <List.Icon
          name="hand point right"
          size="large"
          verticalAlign="middle"
        />
        <List.Content>
          <List.Header as="a">Semantic-Org/Semantic-UI</List.Header>
          <List.Description></List.Description>
        </List.Content>
        <Button size="mini" inverted color="green" floated="right">
        <Icon name="check" />
      </Button>
      </List.Item>
     
    </List>
  );
}
