import React, { Component } from 'react'
import requireAuth from './requireAuth';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Favorites extends Component {
    componentDidMount(){
        this.props.handleReset();
    }
    render() {
        return (
            <div className="white">
                <h1>This is my favorites page</h1>
            </div>
        )
    }
}

export default connect(null, actions)(requireAuth(Favorites));