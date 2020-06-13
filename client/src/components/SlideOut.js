import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';

class SlideOut extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false
        }
    }
    handleToggle = () => {
        this.props.handleSidebar()
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.sidebar.show !== this.props.sidebar.show){
            this.setState({
                show: this.props.sidebar.show
            })
        }
    }
    render() {
        let visible = this.state.show ? 'slide-container showThis' : 'slide-container hideThis'
        return (
            <div className={visible}>
                <div className="close-button-container">
                    <button onClick={this.handleToggle} className="btn blue-grey lighten-5">
                          <i style={{color: 'white', border: '1px solid white'}} className="material-icons">close</i>
                    </button>
                    {/* <h1>SLIDE OUT COMPONENT</h1> */}
                </div>
                <div className="detail-container">
                    <h1>Title: Parasite</h1>
                    <p>Summary: Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis animi et consequuntur earum labore itaque officiis impedit ducimus delectus nemo fugit quo optio inventore, incidunt ab eligendi, sapiente dolorem odio?Vel placeat temporibus </p>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        sidebar: state.sidebar,
    }
}
export default connect(mapStateToProps, actions)(SlideOut);