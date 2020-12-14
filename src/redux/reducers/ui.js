import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED } from "../actions/types";

const initialState = {
  loading: false,
};

export default (state = initialState, action) => {
  console.log("actionnn : ", action);
  switch (action.type) {
    case LOGIN_START:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, loading: false };
    case LOGIN_FAILED:
      return state;
    default:
      return state;
  }
};
