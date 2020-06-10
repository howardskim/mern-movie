import { HANDLE_IMAGE_CLICK, HANDLE_SIDEBAR } from "../actions/types";
const initialState = {
  show: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HANDLE_IMAGE_CLICK:
      return {
        ...state,
        show: true,
        ...action.payload,
      };
    case HANDLE_SIDEBAR:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
}
