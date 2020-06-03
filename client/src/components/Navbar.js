import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default class NavbarComponent extends Component {
    render() {
        return (
          <nav className="blue-grey darken-1">
            <div className="nav-wrapper">
              <Link style={{ marginLeft: "1%" }} to="/" className="">
                MERN MOVIE
              </Link>
              <div className="search-container">
                <input id="search-box" type="text" placeholder="search title" />
                <div id="search-icon">
                  <i class="material-icons">search</i>
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
        );
    }
}
