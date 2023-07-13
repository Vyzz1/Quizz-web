import { SavedHistory } from "../service/SavedHistory";

export const postReducers = async (state = [], action) => {
  switch (action.type) {
    case "Post_Answers":
      SavedHistory(action.body, action.length);
      return state;

    default:
      return state;
  }
};
