// authReducer.js

export const login_logout = (state = [], action) => {
  let newState = { ...state };
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...newState,
        token: action.payload,
        info: action.info,
      };
    case "LOGOUT":
      return {
        ...state,
        token: "",
      };
    default:
      return state;
  }
};
