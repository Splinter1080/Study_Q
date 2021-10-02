import React, { useState } from "react";
import { Card, Form, Checkbox, Button } from "semantic-ui-react";

//add warning,error,success https://react.semantic-ui.com/collections/form/#states-field-error-label

export default function EmailRecovery() {
  const [email, setEmail] = useState(""); //0
  const [valEmail, setValEmail] = useState("");
  const [incorrect, setIncorrect] = useState(false);

  const validateEmail = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setValEmail(re.test(String(email).toLowerCase()));
    return re.test(String(email).toLowerCase());
  };



  const validation = () => {
    validateEmail();
  };

  const updateValue = (val, type) => {
    if (type == 0) setEmail(val);
    if (incorrect) {
      setIncorrect(false);
    }
  };

  const handleSubmit = () => {
    validation();
    setIncorrect(!(valEmail));
    console.log(email);
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header>Enter your registered email</Card.Header>
        <Card.Description>
          <Form>
            <Form.Field>
            <Form.Input
                error={
                  incorrect && !valEmail
                    ? { content: "Enter a valid email", pointing: "above" }
                    : false
                }
                placeholder={"email"}
                value={email}
                onChange={(e) => {
                  updateValue(e.target.value, 0);
                }}
              />
            </Form.Field>

            
            
            <Form.Field>
              <Form.Button
                content="Submit"
                color="blue"
                compact
                fluid
                onClick={handleSubmit}
              />
            </Form.Field>
          </Form>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}
