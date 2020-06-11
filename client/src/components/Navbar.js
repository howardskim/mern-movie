import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
          <nav className="blue-grey darken-1 grey darken-4">
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
          </nav>
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