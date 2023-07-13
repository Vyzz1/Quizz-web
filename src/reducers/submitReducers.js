export const submit_reducer = (state = [], action) => {
  let newState = [...state];
  switch (action.type) {
    case "SUBMIT":
      return [
        ...newState,
        {
          count: action.count,
          selectedAnswers: action.answer,
        },
      ];
    default:
      return state;
  }
};
