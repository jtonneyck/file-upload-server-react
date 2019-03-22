import React, { Component } from 'react';
import './App.css';
import SignUp from "./SignUp"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ListUsers from "./ListUsers"
import Nav from "./Nav"
import "bulma"
class App extends Component {
  render() {
    return (
      <div className="App container">
      <div>
        
        <Nav />

        <Route path="/" exact component={SignUp} />
        <Route path="/signup" component={SignUp} />
        <Route path="/users/" component={ListUsers} />
      </div>

      </div>
    );
  }
}

export default App;
