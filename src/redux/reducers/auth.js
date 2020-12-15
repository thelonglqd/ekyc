import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  fullName: "",
  avatarUrl: "",
  stringeeAccessToken: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        fullName: action.payload.fullName,
        stringeeAccessToken: action.payload.stringeeAccessToken,
        avatarUrl: action.payload.avatarUrl,
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
