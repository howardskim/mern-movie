import React, { Component } from 'react'
import requireAuth from './requireAuth';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Card, Button } from 'react-bootstrap';
import CardComponent from './CardComponent'

class Favorites extends Component {
    constructor(props){
        super(props);
        this.state = {
            favorites: []
        }
    }
    componentDidMount(){
        const id = localStorage.getItem('id');
        this.props.handleReset();
        this.props.getFavorites(id);
    }
    componentDidUpdate(prevProps){
        if(prevProps.userInfo.favorites !== this.props.userInfo.favorites){
            this.setState({
                favorites: this.props.userInfo.favorites
            })
        }
        // console.log(prevProps);
        // console.log(this.props);
    }
    render() {
        console.log('this.state.favorites ', this.state.favorites)
        return (
          <div className="white">
            <h1>This is my favorites page</h1>
            <div className="card-container">
              {this.state.favorites.map((movie) => {
                  return (
                      <CardComponent key={movie.id} movie={movie}/>
                  )
              })}
            </div>
          </div>
        );
    }
}
function mapStateToProps(state){
    return {
        userInfo: state.auth
    }
}

export default connect(mapStateToProps, actions)(requireAuth(Favorites));