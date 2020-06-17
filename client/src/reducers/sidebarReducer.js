import {
  HANDLE_IMAGE_CLICK,
  HANDLE_SIDEBAR,
  HANDLE_RESET,
} from "../actions/types";
const initialState = {
  show: false,
  info: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HANDLE_IMAGE_CLICK:
      return {
        ...state,
        info: action.payload,
        show: !state.show,
      };
    case HANDLE_SIDEBAR:
      return {
        ...state,
        show: !state.show,
        info: ''
      };
    case HANDLE_RESET:
      return {
        ...state,
        show: false
      }
    default:
      return state;
  }
}
