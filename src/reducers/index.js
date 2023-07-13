import { combineReducers } from "redux";
import { sign_Up } from "./signUpReducers";
import { submit_reducer } from "./submitReducers";
import { login_logout } from "./login_logout";
import { postReducers } from "./postReducers";
import { QuestionsHS } from "./QuestionsHS";
const allReducers = combineReducers({
  sign_Up,
  submit_reducer,
  login_logout,
  postReducers,
  QuestionsHS,

  // Thêm nhiều reducer
});

export default allReducers;
