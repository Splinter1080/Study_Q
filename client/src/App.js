import { Route,   BrowserRouter as Router  , Switch } from "react-router-dom";
import { Header } from "semantic-ui-react";
import "./App.css";
import ChatScreen from "./screens/ChatScreen";
import Dashboard from "./screens/Dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/chat">
          <ChatScreen/>
        </Route>
        <Route path="*">
          <Header content="404 Not found" />
        </Route>
      </Switch>
    </Router>

    //     <>
    //    <Navbar/>
    //    <Container >
    //      <Grid stretched centered>
    // <Dashboard/>
    //    </Grid>
    //    </Container>
    //    </>
  );
}

export default App;
