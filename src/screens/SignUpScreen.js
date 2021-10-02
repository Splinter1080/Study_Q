import React, { useState } from "react";
import {
  Card,
  Form,
  Checkbox,
  Button,
  Container,
  Grid,
} from "semantic-ui-react";
import SignUp from "../components/SignUp";
import Navbar from "../components/Navbar";

//add warning,error,success https://react.semantic-ui.com/collections/form/#states-field-error-label

export default function SignUpScreen() {
  return (
    <>
      <Navbar />
      <Container>
        <Grid stretched centered>
          <br />
         <SignUp/>
        </Grid>
      </Container>
    </>
  );
}
