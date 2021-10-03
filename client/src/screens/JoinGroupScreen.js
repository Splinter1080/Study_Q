import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Card, Form, Container, Button, Grid } from "semantic-ui-react";
import { api } from "../api";
import Navbar from "../components/Navbar";

//add warning,error,success https://react.semantic-ui.com/collections/form/#states-field-error-label

export default function JoinGroupScreen() {
  const history = useHistory()
  const [groupName, setGroupName] = useState(""); //0
  const [task, setTask] = useState(""); //1
  const [duration, setDuration] = useState(""); //2
  const [incorrect, setIncorrect] = useState(false);

  //add confirm password

  const [valGroupName, setValGroupName] = useState(true);
  const [valTask, setValTask] = useState(true);
  const [valDuration, setValDuration] = useState(true);
  const [userId, setUserId] = useState(null);

  //const [valLastName, setValLastName] = useState(true);

  const validateDuartion = () => {
    setValDuration(duration > 0);
    return duration > 0;
  };
  //setCount([...count,1]) ;

  const validateGroupName = () => {
    setValGroupName(groupName.length > 0);
    return groupName.length > 0;
  };

  const validateTask = () => {
    setValTask(task.length > 0);
    return task.length > 0;
  };

  const validation = () => {
    //validateDuartion();
    validateGroupName();
   // validateTask();
  };

  const updateValue = (val, type) => {
    if (type == 0) setGroupName(val);
    else if (type == 1) setTask(val);
    else if (type == 2) setDuration(val);

    if (incorrect) {
      setIncorrect(false);
    }
  };

  //task variable
  const taskToArray = async () => {
    var taskArray = task.split(",");
    try{
    const response = await axios.post(api.createPost, {
      name: groupName,
      tasks: taskArray,
      deadline: duration,
      userId,
    });

    history.push('/')
  }catch(e){
    console.log(e)
  }
    console.log(taskArray);
  };

  const handleSubmit =async () => {
    validation();
    setIncorrect(!(valGroupName));
    console.log(groupName, task, duration);
    try {
    
        const response = await axios.get(api.joinGroupGet+"userId="+localStorage.getItem("userId")+"&groupId="+localStorage.getItem("groupId"));
       
        console.log("done");
      } catch (e) {
        console.log(e);
      }
      history.push("/");

  };

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  return (
    <>
      <Navbar />
      <br />
      <Container>
        <Grid centered stretched stacked>
          <Card>
            <Card.Content>
              <Card.Header>Join Group</Card.Header>
              <Card.Description>
                <Form>
                  <Form.Field>
                    <Form.Input
                      error={
                        incorrect && !valGroupName
                          ? {
                              content: "This cannot be empty",
                              pointing: "above",
                            }
                          : false
                      }
                      placeholder={"Group id"}
                      value={groupName}
                      onChange={(e) => {
                        updateValue(e.target.value, 0);
                      }}
                    />
                  </Form.Field>


                  <Form.Field>
                    <Form.Button
                      content="Join"
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
        </Grid>
      </Container>
    </>
  );
}
