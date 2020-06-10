import {
  HANDLE_SEARCH,
  GET_INITIAL_MOVIES,
  HANDLE_NEXT_PAGE,
  HANDLE_IMAGE_CLICK,
  HANDLE_SIDEBAR,
} from "./types";
import axios from 'axios';

export const getInitialMovies = (pageNum) => async (dispatch) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=${pageNum}`
    );
    dispatch({
        type: GET_INITIAL_MOVIES,
        payload: response.data
    })
}

export const handleSearch = (searched) => async (dispatch) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&query=${searched}&page=1&include_adult=false`
    );
    dispatch({
        type: HANDLE_SEARCH,
        payload: response.data
    })
}

export const handleNext = (searched, nextPageNum) => async (dispatch) => {
  if(!searched){
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=${nextPageNum}`
    );
    dispatch({
      type: HANDLE_NEXT_PAGE,
      payload: response.data
    });
  } else {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&query=${searched}&page=${nextPageNum}&include_adult=false`
    );
    dispatch({
      type: HANDLE_NEXT_PAGE,
      payload: response.data
    });
  }
}

export const handlePrevious = (searched, previousPageNum) => async (dispatch) => {

};

// export const handleImageClick = (info) => (dispatch) => {
//   dispatch({
//     type: HANDLE_IMAGE_CLICK,
//     payload: info
//   })
// }

export const handleImageClick = (info) => {
  return {
    type: HANDLE_IMAGE_CLICK,
    payload: info,
  };
};

export const handleSidebar = () => {
  return {
    type: HANDLE_SIDEBAR,
  };
};