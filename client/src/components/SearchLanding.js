import React, { Component } from 'react'
import Image from './Image';
import Spinner from './Spinner';
import axios from 'axios';
import * as actions from '../actions'
import { connect } from 'react-redux';

import '../App.css';

class SearchLanding extends Component {
    constructor(props){
        super(props);
        this.state = {
          loading: true,
          baseURL: "https://image.tmdb.org/t/p/w500",
          currentPage: 1,
          totalPages: 0
        };
    }
    // getData = (page) => {
    //     axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=${page}`).then((resp) => {
    //         this.setState({
    //             data: resp.data.results,
    //         })
    //     })
    // }
    componentDidMount(){
        this.props.handleSearch(this.props.match.params.title)
    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps.data.searched !== this.props.data.searched) {
          this.setState({
            loading: false,
            currentPage: this.props.data.page,
            totalPages: this.props.data.total_pages,
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
        this.props.handleNext(this.props.match.params.title, currentPage - 1);
        this.setState({
            currentPage: currentPage - 1,
        });
    }
    handleNext = () => {
        let { currentPage } = this.state;
        console.log(currentPage, this.state.totalPages)
        if(currentPage > this.state.totalPages){
          return
        } else {
          this.props.handleNext(this.props.match.params.title, currentPage + 1);
          this.setState({
              currentPage: currentPage + 1
          })
        }
    }
    render() {
      console.log('search state ', this.state)
      let { currentPage, totalPages} = this.state;
      let disableNextBool = currentPage === totalPages;
      let disablePrevBool = currentPage === 1;
        return (
          <>
            {this.state.loading ? (
              <Spinner />
            ) : (
              <>
              <div className="landing-container">{this.renderImages()}</div>
              <div className="button-container">
              <h5 style={{color: 'white'}}>Page: {this.state.currentPage} / {this.state.totalPages}</h5>
                <a disabled={disablePrevBool} onClick={this.handlePrevious} className="btn blue-grey lighten-1">
                  <i className="material-icons right">arrow_back</i>Previous
                </a>
                <a disabled={disableNextBool} onClick={this.handleNext} className="btn blue-grey lighten-1">
                  <i className="material-icons right">arrow_forward</i>Next
                </a>
              </div>
              </>
            )}
          </>
        );
    }
}
function mapStateToProps(state){
    return {
        data: state.search
    }
}
export default connect(mapStateToProps, actions)(SearchLanding);