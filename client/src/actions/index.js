import {
  HANDLE_SEARCH,
  GET_INITIAL_MOVIES,
  HANDLE_NEXT_PAGE,
  HANDLE_IMAGE_CLICK,
  HANDLE_SIDEBAR,
  HANDLE_RESET,
  AUTH_USER,
  AUTH_ERROR,
  SIGN_OUT,
  SEARCH_ERROR,
} from "./types";
import axios from 'axios';

export const handleReset = () => {
  return {
    type: HANDLE_RESET,
  };
}

export const closeSidebar = () => {
  return {
    type: HANDLE_SIDEBAR,
  };
};

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
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&query=${searched}&page=1&include_adult=false`
    );
    dispatch({
        type: HANDLE_SEARCH,
        payload: response.data
    })
  } catch (error) {
      dispatch({
        type: SEARCH_ERROR,
        payload: 'Search Error'
      });
  }
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


export const handleImageClick = (info) => {
  return {
    type: HANDLE_IMAGE_CLICK,
    payload: info,
  };
};


export const signup = ({email, password}, callback) => async (dispatch) => {
  
  try {
    const response = await axios.post('http://localhost:5000/signup', {
      email,
      password
    });
    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });
    localStorage.setItem('token', response.data.token)
    callback();
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Email in Use'
    })
  }
}

export const signout = () => {
  localStorage.removeItem('token');
  return {
    type: AUTH_USER,
    payload: ''
  }
}
export const signin = ({ email, password }, callback) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:5000/signin", {
      email,
      password,
    });
    dispatch({
      type: AUTH_USER,
      payload: response.data.token,
    });
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Invalid Login Credentials",
    });
  }
};