import RandomString from "../RandomString";
import { CreateUsers } from "../service/CreateUsers";

export const sign_Up = (state = [], action) => {
  switch (action.type) {
    case "SIGN_UP":
      let body = {
        fullName: action.fullname,
        email: action.email,
        password: action.password,
        token: RandomString(20),
      };

      CreateUsers(body, action.users_length);
      return null;
    default:
      return state;
  }
};
