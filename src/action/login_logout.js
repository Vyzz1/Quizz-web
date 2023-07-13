// authActions.js
export const loginSuccess = (token, info) => ({
  type: "LOGIN_SUCCESS",
  payload: token,
  info: info,
});

export const logout = () => ({
  type: "LOGOUT",
});
