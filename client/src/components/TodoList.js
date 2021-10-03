import React from "react";
import { Button, Icon, Image, List } from "semantic-ui-react";

export default function TodoList({ group }) {
  return (
    <List divided relaxed>
      {group.tasks && group.tasks.map((key, index) => (
        <List.Item>
          <List.Icon
            name="hand point right"
            size="large"
            verticalAlign="middle"
          />
          <List.Content>
            <List.Header as="a">{key}</List.Header>
            <List.Description></List.Description>
          </List.Content>
          {/* <Button size="mini" inverted color="green" floated="right">
            <Icon name="check" />
          </Button> */}
        </List.Item>
      ))}
    </List>
  );
}
