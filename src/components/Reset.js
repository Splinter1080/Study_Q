import React, { useState } from "react";
import { Card, Form, Checkbox, Button } from "semantic-ui-react";

//add warning,error,success https://react.semantic-ui.com/collections/form/#states-field-error-label

export default function ResetPassword() {
  const [passwords, setPasswords] = useState(""); //0
  const [confirmpassword, setConfirmpassword] = useState(""); //1
  const [valPasswords, setValPasswords] = useState("");
  const [valConfirmpassword, setValConfirmpassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);



  const validatePassword = () => {
    setValPasswords(passwords.length > 0);
    return passwords.length > 0;
  };

 

  const updateValue = (val, type) => {
    if (type == 0) setPasswords(val);
    else if (type == 1) setConfirmpassword(val);

    if (incorrect) {
      setIncorrect(false);
    }
  };

  const validation = () => {
    //console.log(passwords == confirmpassword) ; 
    return( passwords == confirmpassword && confirmpassword>0) ; 
  };

  const handleSubmit = () => {
    // validation();
    // setIncorrect(!(valPasswords && valConfirmpassword));
    validation() ; 
    console.log(passwords, confirmpassword);
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header>Password Reset</Card.Header>
        <Card.Description>
          <Form>
            <Form.Field>
            <Form.Input
                error={
                  incorrect && !valPasswords
                    ? { content: "Enter a valid password", pointing: "above" }
                    : false
                }
                placeholder={"Password"}
                type="password"
                value={passwords}
                onChange={(e) => {
                  updateValue(e.target.value, 0);
                }}
              />
            </Form.Field>

            <Form.Field>
            <Form.Input
                error={
                  incorrect && !valConfirmpassword
                    ? { content: "Enter same password as above", pointing: "above" }
                    : false
                }
                placeholder={"Confirm Password"}
                type="password"
                value={confirmpassword}
                onChange={(e) => updateValue(e.target.value, 1)}
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
