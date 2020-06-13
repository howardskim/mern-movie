import React, { Component } from 'react';
import M from "materialize-css";
import { Link, withRouter } from "react-router-dom";
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";
import * as actions from '../actions';
import { connect } from 'react-redux';
import '../App.css';

class NavbarComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      show: false
    }
  }
  componentDidMount(){

  }
  handleChange = (e) =>{
    let typed = e.target.value;
    this.setState({
      value: typed
    })
  }
  handleSearch = () => {
    if(!this.state.value) return;
    this.props.handleSearch(this.state.value);
    this.props.history.push(`/search/${this.state.value}`)
    this.setState({
      value: ''
    })
  }
  handleReset = () => {
    this.props.getInitialMovies(1)
  }

  handleSubmit = (e) => {
    if(!this.state.value) return;
    if(e.which === 13){
      this.handleSearch();
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.sidebar.show !== this.props.sidebar.show){
      this.setState({
        show: this.props.sidebar.show
      })
    }
  }
    render() {
      //if sidebar is open, add the class entire-container
      const opacity = this.state.show ? 'main-header entire-container' : 'main-header'
        return (
          <>
            {/* <nav className="blue-grey darken-1 grey darken-4">
            <div className="nav-wrapper">
              <Link onClick={this.handleReset} style={{ marginLeft: "1%" }} to="/" className="">
                MERN MOVIE
              </Link>
              <div className="search-container">
              <form>
                <input onChange={this.handleChange} onKeyPress={this.handleSubmit} value={this.state.value} id="search-box" type="text" placeholder="Search Title" />
              </form>
                <div onClick={this.handleSearch} id="search-icon">
                  <i className="material-icons">search</i>
                </div>
              </div>
              <ul id="nav-mobile" className="right">
                {this.props.auth ? (
                <li>
                  <Link to="/favorites">My Bookmarks</Link>
                </li>
                ) : ''}
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
                <li>
                  <Link to="/logout">Log Out</Link>
                </li>
              </ul>
            </div>
          </nav> */}
            <Navbar bg="dark" expand="lg">
              <Navbar.Brand href="#home">
                <Link
                  onClick={this.handleReset}
                  style={{ marginLeft: "1%" }}
                  to="/"
                  className=""
                >
                  MERN MOVIE
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  {this.props.auth ? (
                    <Nav.Link href="#home">
                      <Link to="/favorites">My Bookmarks</Link>
                    </Nav.Link>
                  ) : (
                    ""
                  )}
                  {this.props.auth ? '' : (
                    <Nav.Link href="#home">
                      <Link to="/signup">Sign Up</Link>
                    </Nav.Link>
                  )}
                  {this.props.auth ? (
                    ""
                  ) : (
                    <Nav.Link href="#home">
                      <Link to="/login">Log In</Link>
                    </Nav.Link>
                  )}
                  {this.props.auth ? (
                    <Nav.Link href="#home">
                      <Link to="/logout">Log Out</Link>
                    </Nav.Link>
                  ) : (
                    ""
                  )}
                <Form inline>
                  <FormControl
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit}
                    value={this.state.value}
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                  />
                  <Button onClick={this.handleSearch} variant="outline-success">
                    Search
                  </Button>
                </Form>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <h1 className={opacity}>Popular Movies 🍿</h1>
          </>
        );
    }
}
function mapStateToProps(state){
  return {
    sidebar: state.sidebar,
    auth: state.auth.authenticated

  }
}
export default connect(mapStateToProps, actions)(withRouter(NavbarComponent))