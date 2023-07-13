export const QuestionsHS = (state = [], action) => {
  switch (action.type) {
    case "History_Answers":
      return action.topicId;

    default:
      return state;
  }
};
