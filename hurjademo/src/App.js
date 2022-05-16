import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Map from "./Pages/Map";
import List from "./Pages/List";
import React from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
/*
npm install react-router-dom@6
npm install --save react-google-maps
*/

class App extends React.Component {state = { data : [] } 
render(){
  return (
   
    <Router>
      
      <nav>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Link to="/"> <Button>Etusivu</Button> </Link>
        <Link to="/Map"> <Button>Kartta</Button> </Link>
        <Link to="/List"> <Button>Lista</Button> </Link>
        </ButtonGroup>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/List" element={<List />} />
      </Routes>
    </Router>
  );
}
}
  

export default App;
