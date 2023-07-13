import { useNavigate, useParams } from "react-router";
import { GetQuestions } from "../../service/GetQuestions";
import { useEffect, useRef, useState } from "react";
import DrawQuestion from "../../components/DrawQuestions";
import { useDispatch } from "react-redux";
import { post_answers } from "../../action/post_answers";
import submit_anwser from "../../action/submit_anwser";
import { getCookie } from "../../GetCookie";
import "./Questions.scss";
import { GetTopics } from "../../service/GetTopics";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GetLength } from "../../service/GetLength";
import Swal from "sweetalert2";
function Questions() {
  const params = useParams();
  const [questions, SetQuestions] = useState([]);
  const [topic, setTopic] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      const response = await GetQuestions(params.id);
      setTimeout(() => {
        SetQuestions(response);
      }, 2200);
    };
    fetchApi();
  }, [params.id]);
  const ref = useRef(null);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await GetTopics(params.id);
      setTimeout(() => setTopic(response[response.length - 1]), 2200);
    };
    fetchApi();
  }, [params.id]);
  const [length, setLength] = useState([]);
  useEffect(() => {
    const fectch = async () => {
      const response = await GetLength(`history`);
      if (response) {
        setLength(response);
      }
    };
    fectch();
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users_id = JSON.parse(getCookie("info")).id;

  const handleOnClick = (e) => {
    e.preventDefault();
    const form = ref.current;
    const isValid = form.checkValidity(); // Check form validity

    if (!isValid) {
      form.reportValidity();
      return;
    }
    Swal.fire({
      title: "Bạn có muốn nộp bài?",
      text: "Bài làm của bạn sẽ được nộp!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Huỷ",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vẫn nộp!",
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedAnswers = [];
        for (let i = 1; i <= 20; i++) {
          const answer = ref.current.elements[`answer_${i}`].value;
          selectedAnswers.push(parseInt(answer));
        }

        const correctAnswers = [];
        questions.forEach((value) => {
          correctAnswers.push(value.correctAnswer);
        });

        let count = 0;
        for (let i = 0; i < selectedAnswers.length; i++) {
          if (correctAnswers[i] === selectedAnswers[i]) {
            count++;
          }
        }

        let body = {
          user_id: users_id,
          Topic: topic.name.toUpperCase(),
          TopicId: topic.id,
          answers: selectedAnswers,
          count: count,
          Date: Date.now(),
        };

        dispatch(post_answers(body, length));
        dispatch(submit_anwser(selectedAnswers, count));
        Swal.fire("Đã nộp ");
        navigate(`/quizz/reveal/${params.id}`);
      }
    });
  };
  return (
    <>
      {questions.length > 0 && topic ? (
        <>
          <h2 className="title">Trắc nghiệm {topic.name}</h2>
          <form ref={ref}>
            <DrawQuestion questions={questions} />
            <button
              type="submit "
              className="submit_button2"
              onClick={handleOnClick}
            >
              SUBMIT
            </button>
          </form>
        </>
      ) : (
        <>
          <h2 className="skeleton_title">
            <Skeleton style={{ height: "35px" }} />
          </h2>
          <DrawQuestion />
        </>
      )}
    </>
  );
}

export default Questions;
