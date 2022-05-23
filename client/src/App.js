import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Header } from "semantic-ui-react";
import "./App.css";
import EmailRecovery from "./components/EmailRecovery";
import Login from "./components/Login";
import ChatScreen from "./screens/ChatScreen";
import Dashboard from "./screens/Dashboard";
import EmailRecoveryScreen from "./screens/EmailRecoveryScreen";
import GroupScreen from "./screens/GroupScreen";
import JoinGroupScreen from "./screens/JoinGroupScreen";
import LoginScreen from "./screens/LoginScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import SignUpScreen from "./screens/SignUpScreen";
import VideoCallScreen from "./screens/VideoCallScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/login">
          <LoginScreen />
        </Route>
        <Route exact path="/register">
          <SignUpScreen />
        </Route>
        <Route exact path="/chat">
          <ChatScreen />
        </Route>
        <Route exact path="/recovery">
          <EmailRecoveryScreen />
        </Route>
        <Route exact path="/reset">
          <ResetPasswordScreen />
        </Route>
        <Route exact path="/video">
          <VideoCallScreen />
        </Route>
        <Route exact path="/payment">
          <PaymentScreen />
        </Route>
        <Route exact path="/create">
          <GroupScreen />
        </Route>
        <Route exact path="/join">
          <JoinGroupScreen />
        </Route>
        <Route path="*">
          <Header content="404 Not found" />
        </Route>
      </Switch>
    </Router>



  );
}

export default App;
