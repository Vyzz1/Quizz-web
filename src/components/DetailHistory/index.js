import { useParams } from "react-router";
import RevealAnswer from "../RevealAnswer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetQuestions } from "../../service/GetQuestions";
import { GetDetail } from "../../service/GetDetail";
function DetailHistory() {
  const { date } = useParams();
  const [user_data, setUserData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const id = useSelector((state) => state.QuestionsHS);

  useEffect(() => {
    const fetchApi2 = async () => {
      const response = await GetQuestions(id);
      if (response) {
        setTimeout(() => {
          setQuestions(response);
        }, 1900);
      }
    };
    const fetchApi1 = async () => {
      const response = await GetDetail(date);
      if (response) {
        setTimeout(() => {
          setUserData(response);
        }, 1900);
      }
    };
    fetchApi1();
    fetchApi2();
  }, [date, id]);

  let body = {};
  let answers = [];
  if (user_data.length > 0) {
    body = {
      selectedAnswers: user_data[user_data.length - 1].answers,
      count: user_data[user_data.length - 1].count,
      button: "None",
    };
    answers = [body];
  }

  return (
    <>
      <RevealAnswer answers={answers} questions={questions} />
    </>
  );
}
export default DetailHistory;
