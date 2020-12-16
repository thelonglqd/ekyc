const initialState = {
  incommingCall: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "INCOMING_CALL":
      return {
        ...state,
        incommingCall: action.payload.data,
      };
    default:
      return state;
  }
};
