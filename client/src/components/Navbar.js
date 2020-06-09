import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import '../App.css';

class NavbarComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    }
  }
  handleChange = (e) =>{
    let typed = e.target.value;
    this.setState({
      value: typed
    })
  }
  handleSearch = () => {
    this.props.handleSearch(this.state.value);
    this.props.history.push(`/search/${this.state.value}`)
  }
    render() {
        return (
          <>
          <nav className="blue-grey darken-1">
            <div className="nav-wrapper">
              <Link style={{ marginLeft: "1%" }} to="/" className="">
                MERN MOVIE
              </Link>
              <div className="search-container">
                <input onChange={this.handleChange} value={this.state.value} id="search-box" type="text" placeholder="search title" />
                <div onClick={this.handleSearch} id="search-icon">
                  <i className="material-icons">search</i>
                </div>
              </div>
              <ul id="nav-mobile" className="right">
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </div>
          </nav>
          <h1 className="main-header">Popular Movies 🍿</h1>
          </>
        );
    }
}

export default connect(null, actions)(withRouter(NavbarComponent))