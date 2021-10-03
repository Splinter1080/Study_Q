import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Card, Form, Checkbox, Label } from "semantic-ui-react";
import { api } from "../api";

//add warning,error,success https://react.semantic-ui.com/collections/form/#states-field-error-label

export default function ResetPassword({user}) {
  const [passwords, setPasswords] = useState(""); //0
  const [confirmpassword, setConfirmpassword] = useState(""); //1
  const [valPasswords, setValPasswords] = useState("");
  const [valConfirmpassword, setValConfirmpassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const [valSecurity, setValSecurity] = useState(false);
  const [security, setSecurity] = useState(""); //0

  const history = useHistory()

console.log(user)
  const validatePassword = () => {
    setValPasswords(passwords.length > 0);
    return passwords.length > 0;
  };

 

  const updateValue = (val, type) => {
    if (type == 0) setPasswords(val);
    else if (type == 1) setConfirmpassword(val);
    else if (type == 3) setSecurity(val);

    if (incorrect) {
      setIncorrect(false);
    }
  };

  const validation = () => {
    //console.log(passwords == confirmpassword) ; 
    console.log(security==user.security)
    return( passwords == confirmpassword && confirmpassword>0 && security==user.security) ; 
  };

  const handleSubmit =async () => {
    const res= await axios.post(api.resetPost,{
      id:user._id, password:passwords, isReset:user.isReset
    })

    // validation();
    // setIncorrect(!(valPasswords && valConfirmpassword));
    if(validation()){
      
    const res= await axios.post(api.resetPost,{
        id:user._id, password:passwords, isReset:user.isReset
      })

      console.log(res.data)

      if(res.status==200)
      history.pushState('/')

    }else{
      setIncorrect(true)
      setPasswords('')
      setConfirmpassword('')
      setSecurity('')
    }
    console.log(passwords, confirmpassword);
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header>Password Reset</Card.Header>
        <Card.Description>
          <Form>
          <Label color="red">Security Question</Label> <br/>
              <Form.Input
                error={
                  incorrect && !valSecurity
                    ? { content: "Enter an answer", pointing: "above" }
                    : false
                }
                placeholder={"What is you favourite food?"}
                type="text"
                value={security}
                onChange={(e) => updateValue(e.target.value, 3)}
              />
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
