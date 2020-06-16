import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import axios from 'axios';
class SlideOut extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            title: null,
        }
    }
    closeSidebar = () => {
        this.props.closeSidebar()
    }
    componentDidMount(){

    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.sidebar.show !== this.props.sidebar.show){
            let { title, original_title, overview } = this.props.sidebar.info;
            this.setState({
                show: this.props.sidebar.show,
                title,
                // original_title,
                overview
            })
        }
    }
    handleClick = () => {
      let toAdd = {
        ...this.props.sidebar.info,
        email: localStorage.getItem('email')
      }
      this.props.addMovie(toAdd);
    }
    render() {
      console.log('slide out props ', this.props)
        let visible = this.state.show ? 'slide-container showThis' : 'slide-container hideThis'
        return (
          <div className={visible}>
            <div className="close-button-container">
              <button
                onClick={this.closeSidebar}
                className="btn blue-grey lighten-5"
              >
                <i
                  style={{ color: "white", border: "1px solid white" }}
                  className="material-icons"
                >
                  close
                </i>
              </button>
            </div>
            <div className="detail-container">
              <h1>{this.state.title}</h1>
              <Card>
                <Card.Body>
                  {/* <Card.Title>{this.state.title}</Card.Title> */}
                  <Card.Text>
                    {this.state.overview}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>Cras justo odio</ListGroupItem>
                  <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                  <ListGroupItem>Vestibulum at eros</ListGroupItem>
                </ListGroup>
                <Card.Body>
                  <Card.Link href="#">Card Link</Card.Link>
                  <Card.Link href="#">Another Link</Card.Link>
                  <Button onClick={this.handleClick}>Save to Favorites</Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        );
    }
}
function mapStateToProps(state){
    return {
        sidebar: state.sidebar,
        userInfo: state.auth
    }
}
export default connect(mapStateToProps, actions)(SlideOut);