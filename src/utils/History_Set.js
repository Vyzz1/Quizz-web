import Cookies from "js-cookie";

export const setQuizHistoryCookie = (topic, userId, count, selectedAnswers) => {
  const history = Cookies.get("history");
  let historyArray = [];
  if (history) {
    historyArray = JSON.parse(history);
  }

  const quizResult = {
    date: Date.now(),
    topic: topic,
    id: userId,
    count: count,
    selectedAnswers: selectedAnswers,
  };
  historyArray.push(quizResult);
  Cookies.set("history", JSON.stringify(historyArray));
};
