import {
  AUTH_USER,
  AUTH_ERROR,
  GET_FAVES,
  DELETE_MOVIE
} from "../actions/types";

const initialState = {
    authenticated: '',
    errorMessage: '',
    favorites: [],
}
export default (state = initialState, action) => {
    switch(action.type){
        case AUTH_USER:
            return{
                ...state,
                authenticated: action.payload,
                favorites: action.favorites,
                email: action.email
            }
        case AUTH_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }
        case GET_FAVES:
            return {
                ...state,
                favorites: action.payload
            }
        case DELETE_MOVIE:
            let copy = [...state.favorites];
            let remaining = copy.filter(obj => obj.id !== action.payload);
            return {
                ...state,
                favorites: remaining
            }
        default: 
        return state
    }
}