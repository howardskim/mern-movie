import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import searchReducer from './searchReducer';
import imageReducer from './imageReducer';
import sidebarReducer from './sidebarReducer';

export default combineReducers({
    search: searchReducer,
    image: imageReducer,
    sidebar: sidebarReducer
})