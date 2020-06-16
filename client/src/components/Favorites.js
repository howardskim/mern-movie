import React, { Component } from 'react'
import requireAuth from './requireAuth';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Favorites extends Component {
    componentDidMount(){
        this.props.handleReset();
        console.log('123 ', this.props)
    }
    render() {
        return (
            <div className="white">
                <h1>This is my favorites page</h1>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        userInfo: state.auth
    }
}

export default connect(mapStateToProps, actions)(requireAuth(Favorites));