import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Card, Form, Checkbox, Icon, Label } from "semantic-ui-react";
import { api } from "../api";

//add warning,error,success https://react.semantic-ui.com/collections/form/#states-field-error-label

export default function SignUp() {
  const history = useHistory();


  const [firstName, setFirstName] = useState(""); //0
  const [lastName, setLastName] = useState(""); //1
  const [email, setEmail] = useState(""); //2
  const [age, setAge] = useState(""); //3
  const [password, setPassword] = useState(""); //4
  const [security, setSecurity] = useState(""); //4

  //add confirm password

  const [valEmail, setValEmail] = useState(true);
  const [valPassword, setValPassword] = useState(true);
  const [valSecurity, setValSecurity] = useState(true);

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
    else if (type == 5) setSecurity(val);

    if (incorrect) {
      setIncorrect(false);
    }
  };

  const handleSubmit = async () => {
    validation();
    setIncorrect(
      !(valEmail && valPassword && valAge && valFirstName && valLastName)
    );
    if (valEmail && valPassword && valAge && valFirstName && valLastName) {
      history.push('/')
      try {
        const response = await axios.post(api.signUpPost, {
          email,
          password,
          age,
          firstName,
          lastName,
          security
        });
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("name", response.data.firstName);
        localStorage.setItem("email", response.data.email);

        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    console.log(email, password, firstName, lastName, age);
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header>SignUp</Card.Header>
        <Card.Description>
          <Form>
          <Icon name='user' />

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
                onChange={(e) => updateValue(e.target.value, 5)}
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

// import React, { useState } from "react";
// import { Card, Form, Checkbox, Button, Icon } from "semantic-ui-react";

// //add warning,error,success https://react.semantic-ui.com/collections/form/#states-field-error-label


// export default function SignUp() {
  
  
//   const [firstName, setFirstName] = useState(""); //0
//   const [lastName, setLastName] = useState(""); //1
//   const [email, setEmail] = useState(""); //2
//   const [age, setAge] = useState(""); //3
//   const [password, setPassword] = useState(""); //4
//   const [phonenumber, setPhoneNumber] = useState(""); //5

//   //add confirm password

//   const [valEmail, setValEmail] = useState(true);
//   const [valPassword, setValPassword] = useState(true);
//   const [valFirstName, setValFirstName] = useState(true);
//   const [valLastName, setValLastName] = useState(true);
//   const [valAge, setValAge] = useState(false);
//   const [incorrect, setIncorrect] = useState(false);
//   const [valPhoneNumber, setValPhoneNumber] = useState(true);

//   const validateEmail = () => {
//     const re =
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     setValEmail(re.test(String(email).toLowerCase()));
//     return re.test(String(email).toLowerCase());
//   };

//   const validatePassword = () => {
//     setValPassword(password.length > 0);
//     return password.length > 0;
//   };

//   const validateFirstName = () => {
//     setValFirstName(firstName.length > 0);
//     return firstName.length > 0;
//   };

//   const validateLastName = () => {
//     setValLastName(lastName.length > 0);
//     return lastName.length > 0;
//   };

//   const validateAge = () => {
//     setValAge(parseInt(age) > 0 && parseInt(age) < 150);
//     return parseInt(age) > 0 && parseInt(age) < 150;
//   };

//   const validatePhonenumber = () => {
//     setValPhoneNumber(phonenumber.length > 0);
//     return phonenumber.length > 0;
//   };


//   const validation = () => {
//     validateEmail();
//     validatePassword();
//     validateFirstName();
//     validateLastName();
//     validateAge();
//     validatePhonenumber();
//   };

//   const updateValue = (val, type) => {
//     if (type == 0) setFirstName(val);
//     else if (type == 1) setLastName(val);
//     else if (type == 2) setEmail(val);
//     else if (type == 3) setAge(val);
//     else if (type == 4) setPassword(val);
//     else if (type == 5) setPhoneNumber(val);

//     if (incorrect) {
//       setIncorrect(false);
//     }
//   };

//   const handleSubmit = () => {
//     validation();
//     setIncorrect(
//       !(valEmail && valPassword && valAge && valFirstName && valLastName && valPhoneNumber)
//     );
//     console.log(email, password, firstName, lastName, age, phonenumber);
//   };

//   return (
//     <Card>
//       <Card.Content>
//         <Card.Header>SignUp</Card.Header>
//         <Card.Description>
//           <Form>
//             <Form.Field>
              
//               <Icon name='user' />
            
//               <Form.Input
//                 error={
//                   incorrect && !valFirstName
//                     ? { content: "This cannot be empty", pointing: "above" }
//                     : false
//                 }
//                 placeholder={"First name"}
//                 value={firstName}
//                 onChange={(e) => {
//                   updateValue(e.target.value, 0);
//                 }}
//               />
//             </Form.Field>

//             <Form.Field>
//               <Form.Input
//                 error={
//                   incorrect && !valLastName
//                     ? { content: "This cannot be empty", pointing: "above" }
//                     : false
//                 }
//                 placeholder={"Last name"}
//                 value={lastName}
//                 onChange={(e) => {
//                   updateValue(e.target.value, 1);
//                 }}
//               />
//             </Form.Field>

//             <Form.Field>
//               <Form.Input
//                 error={
//                   incorrect && !valEmail
//                     ? { content: "Enter a valid email", pointing: "above" }
//                     : false
//                 }
//                 placeholder={"email"}
//                 value={email}
//                 onChange={(e) => {
//                   updateValue(e.target.value, 2);
//                 }}
//               />
//             </Form.Field>

//             <Form.Field>
//               <Form.Input
//                 error={
//                   incorrect && !valAge
//                     ? { content: "Enter a valid age", pointing: "above" }
//                     : false
//                 }
//                 type="number"
//                 placeholder={"Age"}
//                 value={age}
//                 onChange={(e) => {
//                   updateValue(e.target.value, 3);
//                 }}
//               />
//             </Form.Field>

//             <Form.Field>
//               <Form.Input
//                 error={
//                   incorrect && !valPassword
//                     ? { content: "Enter a password", pointing: "above" }
//                     : false
//                 }
//                 placeholder={"Password"}
//                 type="password"
//                 value={password}
//                 onChange={(e) => updateValue(e.target.value, 4)}
//               />
//             </Form.Field>

//             <Form.Field>
//               <Form.Input
//                 error={
//                   incorrect && !valPhoneNumber
//                     ? { content: "Enter PhoneNumber", pointing: "above" }
//                     : false
//                 }
//                 placeholder={"Phonenumber"}
//                 type="number"
//                 value={phonenumber}
//                 onChange={(e) => updateValue(e.target.value, 5)}
//               />
//             </Form.Field>

//             <Form.Field>
//               <Form.Button
//                 content="Submit"
//                 color="blue"
//                 compact
//                 fluid
//                 onClick={handleSubmit}
//               />
//             </Form.Field>
//           </Form>
//         </Card.Description>
//       </Card.Content>
//     </Card>
//   );
// }
