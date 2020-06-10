import {
  HANDLE_SEARCH,
  GET_INITIAL_MOVIES,
  HANDLE_NEXT_PAGE,
  HANDLE_PREVIOUS_PAGE,
  HANDLE_RESET,
} from "../actions/types";
const initialState = {
    loading: true,
    searched: false,
    results: []
};

export default function (state = initialState, action){
    switch(action.type){
        case GET_INITIAL_MOVIES:
            return {
                ...state,
                loading: false,
                searched: false,
                ...action.payload
            }
        case HANDLE_SEARCH:
            return {
                ...state,
                loading: true,
                searched: true,
                ...action.payload
            }
        case HANDLE_NEXT_PAGE:
            return {
                ...state,
                ...action.payload
            }
        case HANDLE_PREVIOUS_PAGE:
            return {
                ...state,
                ...action.payload
            }
        case HANDLE_RESET:
            return initialState;
        default:
            return state
    }
};
