import React, { useState } from "react";
import { Card, Image, Button, Grid, Container,Label } from "semantic-ui-react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <br/>
      <Container>
        <Grid stretched centered>
          <Card.Group>
            <Card>
              <Card.Content>
                <Image
                  floated="left"
                  size="mini"
                  src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                />
                <Card.Header>React Development</Card.Header>
                <Card.Description>
                 Let's learn useState,useEffect
                </Card.Description>
                <br/>

                <Label as='a' content='5' icon='users'  />
                {/* <Label color='red' content='10' floating /> */}

                {/* <Card.Meta>Created by - Akhil</Card.Meta> */}
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button inverted color="green">
                    Enter
                  </Button>
                 
                </div>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Image
                  floated="left"
                  size="mini"
                  src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                />
                <Card.Header>React Development</Card.Header>
                <Card.Description>
                 Let's learn useState,useEffect
                </Card.Description>
                <br/>

                <Label as='a' content='5' icon='users'  />
                {/* <Label color='red' content='10' floating /> */}

                {/* <Card.Meta>Created by - Akhil</Card.Meta> */}
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button inverted color="green">
                    Enter
                  </Button>
                 
                </div>
              </Card.Content>
            </Card>
           
            <Card>
              <Card.Content>
                <Image
                  floated="left"
                  size="mini"
                  src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                />
                <Card.Header>React Development</Card.Header>
                <Card.Description>
                 Let's learn useState,useEffect
                </Card.Description>
                <br/>

                <Label as='a' content='5' icon='users'  />
                {/* <Label color='red' content='10' floating /> */}

                {/* <Card.Meta>Created by - Akhil</Card.Meta> */}
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button inverted color="green">
                    Enter
                  </Button>
                 
                </div>
              </Card.Content>
            </Card>
                     </Card.Group>
        </Grid>
      </Container>
    </>
  );
}
