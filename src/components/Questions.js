import React, { useState } from "react";
import { Card, Form, Checkbox, Button } from "semantic-ui-react";

export default function Questions() {
  const [selected, setSelected] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [index, setIndex] = useState(0);

  function changeOption(value) {
    setSelected(value);
  }
  let arr = [
    "Do you sleep at 2 am ?",
    "Do you attend classes regularly?",
    "Do you have sufficient amount of sleep?",
    "Do you need someone to train you?",
  ];
  function nextQuestion() {
    if (index + 1 == arr.length) setCompleted(true);
    else setIndex(index + 1);
  }
  return (
    <Card style={{margin:"10px"}}>
      {!completed && (
        <Card.Content>
          <Card.Header>{arr[index]}</Card.Header>
          <Card.Description >
            <Form>
              <Form.Field>
                <Checkbox
                  radio
                  label="Never or Rarely"
                  name="options"
                  value="Never or Rarely"
                  checked={selected === "Never or Rarely" ? true : false}
                  onChange={() => changeOption("Never or Rarely")}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label="Sometimes"
                  name="options"
                  value="Sometimes"
                  checked={selected === "Sometimes" ? true : false}
                  onChange={() => changeOption("Sometimes")}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  radio
                  label="Often"
                  name="options"
                  value="Often"
                  checked={selected === "Often" ? true : false}
                  onChange={() => changeOption("Often")}
                />
              </Form.Field>
            </Form>
          </Card.Description>
        </Card.Content>
      )}

      {!completed && (
        <Button content="Next" positive onClick={() => nextQuestion()} />
      )}

      {completed && (
        <Card.Description>Thank for taking our survey!</Card.Description>
      )}
    </Card>
  );
}
