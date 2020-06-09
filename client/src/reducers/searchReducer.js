import { HANDLE_SEARCH, GET_INITIAL_MOVIES } from "../actions/types";
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
                ...action.payload
            }
        case HANDLE_SEARCH:
            return {
                ...state,
                searched: true,
                ...action.payload
            }
        default:
            return state
    }
};
