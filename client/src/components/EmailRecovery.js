import axios from "axios";
import React, { useState } from "react";
import { Card, Form, Checkbox, Message } from "semantic-ui-react";
import { api } from "../api";
import ResetPassword from "./Reset";

//add warning,error,success https://react.semantic-ui.com/collections/form/#states-field-error-label

export default function EmailRecovery() {
  const [email, setEmail] = useState(""); //0
  const [valEmail, setValEmail] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [user, setUser] = useState({});

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
    if (invalid) {
      setInvalid(false);
    }
    if (incorrect) {
      setIncorrect(false);
    }
    if (submit) {
      setSubmit(false);
    }
  };

  const handleSubmit = async () => {
    validation();
    setIncorrect(!valEmail);
    if (valEmail) {
      try {
        const response = await axios.get(api.resetGet + email);
        setUser(response.data)
        //  history.push("/");
        setSubmit(true);
        console.log("done");
      } catch (e) {
        setInvalid(true);
        console.log(e);
      }
    }
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
            {submit && <ResetPassword user={user} />}

            {!submit && (
              <Form.Field>
                <Form.Button
                  content="Submit"
                  color="blue"
                  compact
                  fluid
                  onClick={handleSubmit}
                />
              </Form.Field>
            )}
          </Form>
         
          {invalid && (
            <Message
              error
              header="Invalid Credentials"
              //  content='You can only sign up for an account once with a given e-mail address.'
            />
          )}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}
