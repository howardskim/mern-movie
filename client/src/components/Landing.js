import React, { Component } from 'react'
import Image from './Image';
import Spinner from './Spinner';
import axios from 'axios';
import * as actions from '../actions'
import { connect } from 'react-redux';

import '../App.css';

class Landing extends Component {
    constructor(props){
        super(props);
        this.state = {
          loading: true,
          baseURL: "https://image.tmdb.org/t/p/w500",
          currentPage: 1,
          itemsToShow: 20,
          totalPages: 0,
          show: false
        };
    }
    componentDidMount(){
        this.props.getInitialMovies(this.state.currentPage)
    }
    componentWillUnmount(){
      this.props.handleReset();
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.data.loading !== this.props.data.loading){
            this.setState({
              loading: false,
              currentPage: this.props.data.page,
              totalPages: this.props.data.total_pages
            });
        }
        if (prevProps.sidebar.show !== this.props.sidebar.show) {
          this.setState({
            show: this.props.sidebar.show,
          });
        }
    }
    renderImages = () => {
        let { data, currentPage, itemsToShow } = this.state;
        return this.props.data.results.map((item, index) => {
            return (
                <Image info={item}/>
            )
        })
    }
    handlePrevious = () => {
        let { currentPage } = this.state;
        if(currentPage === 1) return;
        this.props.handleNext(null, currentPage - 1);
        this.setState({
            currentPage: currentPage - 1,
        });
    }
    handleNext = () => {
        let { currentPage } = this.state;
        if(currentPage > this.state.totalPages) return;
        this.props.handleNext(null, currentPage + 1);
        this.setState({
            currentPage: currentPage + 1
        })
    }
    render() {
      const opacity = this.state.show ? 'entire-container' : '';
        return (
          <>
          <div className={opacity}>
            {this.state.loading ? (
              <Spinner />
            ) : (
              <>
              <div className="landing-container">{this.renderImages()}</div>
              <div className="button-container">
              <h5 style={{color: 'white'}}>Page: {this.state.currentPage} / {this.state.totalPages}</h5>
                <a onClick={this.handlePrevious} className="btn blue-grey lighten-1">
                  <i className="material-icons right">arrow_back</i>Previous
                </a>
                <a onClick={this.handleNext} className="btn blue-grey lighten-1">
                  Next<i className="material-icons right">arrow_forward</i>
                </a>
              </div>
            </>
            )}
          </div>
          </>
        );
    }
}
function mapStateToProps(state){
    return {
        data: state.search,
        sidebar: state.sidebar
    }
}
export default connect(mapStateToProps, actions)(Landing);