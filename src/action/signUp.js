export const signUP = (fullname, email, password, users_length) => {
  return {
    type: "SIGN_UP",
    fullname: fullname,
    email: email,
    password: password,
    users_length: users_length,
  };
};
