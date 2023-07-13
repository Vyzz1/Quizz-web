const submit_anwser = (answer, count) => {
  return {
    type: "SUBMIT",
    answer: answer,
    count: count,
  };
};
export default submit_anwser;
