import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Card, Image, Button, Grid, Container, Label,Header } from "semantic-ui-react";
import { api } from "../api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const history = useHistory();
  const [list, setList] = useState([]);
  useEffect(async () => {
    const response = await axios.get(
      api.groupsGet + localStorage.getItem("userId")
    );
    setList(response.data);
  }, []);

  const onEnter = async () => {};

  return (
    <>
      <Navbar />
      <br />
      <Container>
        <Grid stretched centered>
          
          <Card.Group>

            {list.length<1 && <Header content="Join or create a group to get started with virtual group study!"/>}
            {list.map((key, index) => (
              <Card key={index}>
                  <Label as='a' color='yellow' tag >
         Exclusive Trial Period
        </Label>
                <Card.Content>
              
                  <Card.Header>{key.name}</Card.Header>
                  <Card.Description>{key.tasks}</Card.Description>
                  <br />

                  <Label as="a" content="5" icon="users" />
                  {/* <Label color='red' content='10' floating /> */}

                  {/* <Card.Meta>Created by - Akhil</Card.Meta> */}
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button
                      inverted
                      color="green"
                      onClick={() => {
                        localStorage.setItem("groupId", key._id);
                        history.push('/chat')
                      }}
                    >
                      Enter
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid>
      </Container>
    </>
  );
}
