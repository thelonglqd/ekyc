import { LOGIN_SUCCESS } from "../actions/types";

const initialState = {
  fullName: "",
  avatarUrl: "",
  stringeeAccessToken: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        fullName: action.payload.fullName,
        stringeeAccessToken: action.payload.stringeeAccessToken,
        avatarUrl: action.payload.avatarUrl,
      };
    default:
      return state;
  }
};
