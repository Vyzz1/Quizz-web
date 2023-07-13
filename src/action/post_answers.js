export const post_answers = (body, length) => {
  return {
    type: "Post_Answers",
    body: body,
    length: length,
  };
};
export const history_answers = (topicId) => {
  return {
    type: "History_Answers",
    topicId: topicId,
  };
};
