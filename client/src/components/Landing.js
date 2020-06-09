import React, { Component } from 'react'
import Image from './Image';
import axios from 'axios';
import { connect } from 'react-redux';

import '../App.css';

class Landing extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: [],
          loading: true,
          baseURL: "https://image.tmdb.org/t/p/w500",
          currentPage: 1,
          itemsToShow: 20,
          totalPages: 0
        };
    }
    getData = (page) => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=${page}`).then((resp) => {
            this.setState({
                data: resp.data.results,
            })
        })
    }
    componentDidMount(){
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=${this.state.currentPage}`).then((resp) => {
            this.setState({
                loading: false,
                data: resp.data.results,
                totalPages: resp.data.total_pages
            })
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.searchData.searched !== this.props.searchData.searched){
            let { searchData: { page, results, total_pages} } = this.props;
            this.setState({
                data: results,
                currentPage: 1,
                totalPages: total_pages
            })
        }
    }
    renderImages = () => {
        let { data, currentPage, itemsToShow } = this.state;
        return data.map((item, index) => {
            return (
                <Image info={item}/>
            )
        })
    }
    handlePrevious = () => {
        let { currentPage } = this.state;
        if(currentPage === 1) return;
        this.getData(currentPage - 1);
        this.setState({
          currentPage: currentPage - 1,
        });
    }
    handleNext = () => {
        let { currentPage } = this.state;
        if(currentPage > this.state.totalPages) return;
        this.getData(currentPage + 1);
        this.setState({
            currentPage: currentPage + 1
        })
    }
    render() {
        console.log(this.props)
        return (
          <>
            <h1 className="main-header">Popular Movies 🍿</h1>
            {this.state.loading ? (
              <h1>Loading...</h1>
            ) : (
              <div className="landing-container">{this.renderImages()}</div>
            )}
            <div className="button-container">
            <h5 style={{color: 'white'}}>Page: {this.state.currentPage} / {this.state.totalPages}</h5>
              <a onClick={this.handlePrevious} className="btn blue-grey lighten-1">
                <i className="material-icons right">arrow_back</i>Previous
              </a>
              <a onClick={this.handleNext} className="btn blue-grey lighten-1">
                <i className="material-icons right">arrow_forward</i>Next
              </a>
            </div>
          </>
        );
    }
}
function mapStateToProps(state){
    return {
        searchData: state.search
    }
}
export default connect(mapStateToProps, null)(Landing);