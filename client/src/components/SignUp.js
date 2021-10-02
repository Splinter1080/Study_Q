import React, { useState } from "react";
import { Card, Form, Checkbox, Button } from "semantic-ui-react";

//add warning,error,success https://react.semantic-ui.com/collections/form/#states-field-error-label


export default function SignUp() {
  const [firstName, setFirstName] = useState(""); //0
  const [lastName, setLastName] = useState(""); //1
  const [email, setEmail] = useState(""); //2
  const [age, setAge] = useState(""); //3
  const [password, setPassword] = useState(""); //4

  //add confirm password

  const [valEmail, setValEmail] = useState(true);
  const [valPassword, setValPassword] = useState(true);
  const [valFirstName, setValFirstName] = useState(true);
  const [valLastName, setValLastName] = useState(true);
  const [valAge, setValAge] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  const validateEmail = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setValEmail(re.test(String(email).toLowerCase()));
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = () => {
    setValPassword(password.length > 0);
    return password.length > 0;
  };

  const validateFirstName = () => {
    setValFirstName(firstName.length > 0);
    return firstName.length > 0;
  };

  const validateLastName = () => {
    setValLastName(lastName.length > 0);
    return lastName.length > 0;
  };

  const validateAge = () => {
    setValAge(parseInt(age) > 0 && parseInt(age) < 150);
    return parseInt(age) > 0 && parseInt(age) < 150;
  };

  const validation = () => {
    validateEmail();
    validatePassword();
    validateFirstName();
    validateLastName();
    validateAge();
  };

  const updateValue = (val, type) => {
    if (type == 0) setFirstName(val);
    else if (type == 1) setLastName(val);
    else if (type == 2) setEmail(val);
    else if (type == 3) setAge(val);
    else if (type == 4) setPassword(val);

    if (incorrect) {
      setIncorrect(false);
    }
  };

  const handleSubmit = () => {
    validation();
    setIncorrect(
      !(valEmail && valPassword && valAge && valFirstName && valLastName)
    );
    console.log(email, password, firstName, lastName, age);
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header>SignUp</Card.Header>
        <Card.Description>
          <Form>
            <Form.Field>
              <Form.Input
                error={
                  incorrect && !valFirstName
                    ? { content: "This cannot be empty", pointing: "above" }
                    : false
                }
                placeholder={"First name"}
                value={firstName}
                onChange={(e) => {
                  updateValue(e.target.value, 0);
                }}
              />
            </Form.Field>

            <Form.Field>
              <Form.Input
                error={
                  incorrect && !valLastName
                    ? { content: "This cannot be empty", pointing: "above" }
                    : false
                }
                placeholder={"Last name"}
                value={lastName}
                onChange={(e) => {
                  updateValue(e.target.value, 1);
                }}
              />
            </Form.Field>

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
                  updateValue(e.target.value, 2);
                }}
              />
            </Form.Field>

            <Form.Field>
              <Form.Input
                error={
                  incorrect && !valAge
                    ? { content: "Enter a valid age", pointing: "above" }
                    : false
                }
                type="number"
                placeholder={"Age"}
                value={age}
                onChange={(e) => {
                  updateValue(e.target.value, 3);
                }}
              />
            </Form.Field>

            <Form.Field>
              <Form.Input
                error={
                  incorrect && !valPassword
                    ? { content: "Enter a password", pointing: "above" }
                    : false
                }
                placeholder={"Password"}
                type="password"
                value={password}
                onChange={(e) => updateValue(e.target.value, 4)}
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
