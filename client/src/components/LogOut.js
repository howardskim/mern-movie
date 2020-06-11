import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';
class LogOut extends Component {
    componentDidMount(){
        this.props.signout();
    }
    render() {
        return (
          <div className="white card-panel center-align">
            <h1>Sorry To See You go</h1>
          </div>
        );
    }
}
export default connect(null, actions)(LogOut);
