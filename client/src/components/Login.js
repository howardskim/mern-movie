import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions';
class Login extends Component {
    componentDidMount(){
        this.props.handleSidebar();
    }
    render() {
        return (
            <div>
                This is Login Component
            </div>
        )
    }
}

export default connect(null, actions)(Login)