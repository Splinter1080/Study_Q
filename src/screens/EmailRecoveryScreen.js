import React, { useState } from "react";
import {
  Card,
  Form,
  Checkbox,
  Button,
  Container,
  Grid,
  Header,
} from "semantic-ui-react";
import EmailRecovery from "../components/EmailRecovery";
import Login from "../components/Login";
import Navbar from "../components/Navbar";

//add warning,error,success https://react.semantic-ui.com/collections/form/#states-field-error-label

export default function EmailRecoveryScreen() {
  return (
    <>
      <Navbar />
      <Container>
        <Grid stretched centered>
          <br />
          <EmailRecovery/>
        </Grid>
      </Container>
    </>
  );
}
