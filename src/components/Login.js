import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  Card,
  Form,
  Checkbox,
  Button,
  Grid,
  Message,
  Header,
} from "semantic-ui-react";
import { api } from "../api";

//add warning,error,success https://react.semantic-ui.com/collections/form/#states-field-error-label

export default function Login() {
  const [email, setEmail] = useState(""); //0
  const [password, setPassword] = useState(""); //1
  const [valEmail, setValEmail] = useState("");
  const [valPassword, setValPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const history = useHistory();

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

  const validation = () => {
    validateEmail();
    validatePassword();
  };

  const updateValue = (val, type) => {
    if (type == 0) setEmail(val);
    else if (type == 1) setPassword(val);

    if(invalid){
      setInvalid(true)
    }

    if (incorrect) {
      setIncorrect(false);
    }
  };

  const handleSubmit = async () => {
    validation();
    setIncorrect(!(valEmail && valPassword));

    if (valEmail && valPassword) {

      try {
        const response = await axios.post(api.loginPost, {
          email: email,
          password: password,
        });
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("name", response.data.firstName);
        localStorage.setItem("email", response.data.email);
        history.push("/");

        console.log("done");
      } catch (e) {
        setInvalid(true)
        console.log(e);
      }
    }
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header>Login</Card.Header>
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
              <Form.Input
                error={
                  incorrect && !valPassword
                    ? { content: "Enter a password", pointing: "above" }
                    : false
                }
                placeholder={"Password"}
                type="password"
                value={password}
                onChange={(e) => updateValue(e.target.value, 1)}
              />
            </Form.Field>
            <Form.Field>
              <Form.Button
              type="button"
                content="Submit"
                color="blue"
                compact
                fluid
                onClick={handleSubmit}
              />
            </Form.Field>
            <Link to="/recovery">
              <Header content="Forgot Password?" color="blue" size="small" />
            </Link>
        { invalid &&   <Message
      error
      header='Invalid Credentials'
    //  content='You can only sign up for an account once with a given e-mail address.'
    />}
          </Form>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}
