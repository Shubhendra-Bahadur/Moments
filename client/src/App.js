import React from "react";
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import { Container} from "@material-ui/core";

function App() {

  return (
    <Container maxwidth="lg">
      <Navbar/>
      <Home/>
    </Container>
  );
}

export default App;
