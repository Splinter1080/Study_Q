import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Questions from './components/Questions';
import Login from './components/Login';
import { Container, Grid, Segment } from 'semantic-ui-react';
import SignUp from './components/SignUp';
import Chat from './components/Chat';


function App() {
  return (
    <>
   <Navbar/>
   <Container >
     <Grid stretched centered>
<Chat/>
   </Grid>
   </Container>
{/* <Questions/> */}
   </>
  )
  
}

export default App;
