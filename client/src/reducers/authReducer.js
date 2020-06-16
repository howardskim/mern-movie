import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const initialState = {
    authenticated: '',
    errorMessage: '',
    favorites: []
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
        default: 
        return state
    }
}