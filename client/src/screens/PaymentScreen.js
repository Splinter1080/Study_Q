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

export default function PaymentScreen() {
  return (
    <>
      <iframe
        src={`https://payment-client-codefury.netlify.app/`}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          bottom: "0",
          right: "0",
          width: "100%",
          height: "100%",
          border: "none",
          margin: "0",
          padding: "0",
          overflow: "hidden",
          zIndex: "999999",
        }}
      >
        Your browser doesn't support iframes
      </iframe>
    </>
  );
}
