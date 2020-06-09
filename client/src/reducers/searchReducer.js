import { HANDLE_SEARCH } from '../actions/types';
const initialState = {
    data: [],
    searched: false
};

export default function (state = initialState, action){
    switch(action.type){
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
