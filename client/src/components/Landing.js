import React, { Component } from 'react'
import Image from './Image';
import axios from 'axios';
import '../App.css';

export default class Landing extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: [],
          loading: true,
          baseURL: "https://image.tmdb.org/t/p/w500",
          currentPage: 1
        };
    }
    componentDidMount(){
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`).then((resp) => {
            this.setState({
                loading: false,
                data: resp.data.results,
            })
        })
    }
    renderImages = () => {
        let { data } = this.state;
        console.log(data)
        let firstData = data.slice(0, 20);
        console.log('first data ', firstData);
        return firstData.map((item) => {
            return (
                <Image info={item}/>
            )
        })
    }
    render() {
        console.log(this.state.data)
        return (
          <>
            <h1 className="main-header">Popular Movies 🍿</h1>
            {this.state.loading ? (
              <h1>Loading...</h1>
            ) : (
              <div className="landing-container">
                {this.renderImages()}
              </div>
            )}
          </>
        );
    }
}
