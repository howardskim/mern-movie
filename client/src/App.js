import React, { Component } from 'react'
import './index.css';
import { BrowserRouter, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Landing from './components/Landing';
import Login  from './components/Login';
import SignUp from './components/SignUp';

class App extends Component {
  render() {
    return (
      <>
      <BrowserRouter>
        <NavbarComponent />
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </BrowserRouter>
      </>
    );
  }
}
export default App;

