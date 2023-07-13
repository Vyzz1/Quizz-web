import { Answer_Reveal } from "../../Answer_Reveal";
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from "react-router";
import { getCookie } from "../../GetCookie";
import { FcCheckmark } from "react-icons/fc";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "./RevealAnswer.css";

function RevealAnswer(props) {
  const navigate = useNavigate();
  const { answers, questions } = props;

  if (!getCookie("token")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vui lòng đăng nhập!",
      timer: 2000,
    });
    setTimeout(() => navigate("/login"), 2300);
  }

  const handleRestart = () => {
    navigate("/quizz");
  };

  let check = [];
  let selected = [];

  if (answers.length > 0) {
    selected = answers[answers.length - 1].selectedAnswers;
    check = Answer_Reveal(questions, answers);
  }

  return (
    <>
      {questions.length > 0 ? (
        <>
          <div className="box-header">
            <div className="title"> ĐÁP ÁN</div>
            <div className="description">
              <div>
                {" "}
                Số câu đúng : <b>{answers[answers.length - 1].count}</b>{" "}
              </div>
              <div>
                Số câu sai :{" "}
                <b>
                  {answers[0].selectedAnswers.length -
                    answers[answers.length - 1].count}{" "}
                </b>
              </div>
              <div>
                {" "}
                Phần trăm đúng :
                <b>
                  {" "}
                  {(answers[answers.length - 1].count /
                    answers[answers.length - 1].selectedAnswers.length) *
                    100}{" "}
                  %{" "}
                </b>
              </div>
            </div>
          </div>
          <form>
            {questions.map((value, index) => (
              <div key={value.id} className="question">
                <div className="question__text">
                  <h3>
                    {index + 1}.{value.question}
                  </h3>
                </div>
                <div className="question__answer">
                  <input
                    type="radio"
                    name={`answer_${index + 1}`}
                    value={0}
                    defaultChecked={value.correctAnswer === 0}
                    disabled
                  />
                  <span className="answer__choice">
                    {" "}
                    A . {value.answers[0]}{" "}
                  </span>
                  {check[index] === false && selected[index] === 0 && (
                    <TfiClose color="red" />
                  )}
                  {check[index] === true && selected[index] === 0 && (
                    <FcCheckmark color="red" />
                  )}
                </div>
                <div className="question__answer">
                  <input
                    type="radio"
                    name={`answer_${index + 1}`}
                    value={1}
                    defaultChecked={value.correctAnswer === 1}
                    disabled
                  />
                  <span className="answer__choice">
                    {" "}
                    B . {value.answers[1]}{" "}
                  </span>
                  {check[index] === false && selected[index] === 1 && (
                    <TfiClose color="red" />
                  )}
                  {check[index] === true && selected[index] === 1 && (
                    <FcCheckmark color="red" />
                  )}
                </div>
                {value.answers.length > 2 && (
                  <div className="question__answer">
                    <input
                      type="radio"
                      name={`answer_${index + 1}`}
                      value={2}
                      defaultChecked={value.correctAnswer === 2}
                      disabled
                    />
                    <span className="answer__choice">
                      {" "}
                      C. {value.answers[2]}
                    </span>
                    {check[index] === false && selected[index] === 2 && (
                      <TfiClose color="red" />
                    )}
                    {check[index] === true && selected[index] === 2 && (
                      <FcCheckmark color="red" />
                    )}
                  </div>
                )}
                {value.answers.length > 3 && (
                  <div className="question__answer">
                    <input
                      type="radio"
                      name={`answer_${index + 1}`}
                      value={2}
                      defaultChecked={value.correctAnswer === 3}
                      disabled
                    />
                    <span className="answer__choice">
                      {" "}
                      D. {value.answers[3]}
                    </span>
                    {check[index] === false && selected[index] === 3 && (
                      <span>
                        {" "}
                        <TfiClose color="red" />{" "}
                      </span>
                    )}
                    {check[index] === true && selected[index] === 3 && (
                      <FcCheckmark color="red" />
                    )}
                  </div>
                )}
              </div>
            ))}
            {answers[0].button !== "None" && (
              <button className="submit_button2" onClick={handleRestart}>
                {" "}
                Làm lại{" "}
              </button>
            )}
          </form>
        </>
      ) : (
        <>
          <div className="box-header">
            <div className="skeleton_title">
              {" "}
              <Skeleton className="skeleton_title-inner" />{" "}
            </div>
            <div className="skeleton_title-des">
              <div>
                {" "}
                <Skeleton />{" "}
              </div>
              <div>
                <Skeleton />
              </div>
              <div>
                <Skeleton />
              </div>
            </div>
          </div>
          <>
            {" "}
            {Array(5)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  style={{ marginLeft: "150px", marginRight: "150px" }}
                  className="question"
                >
                  <div className="question__text">
                    <h3>
                      <Skeleton />
                    </h3>
                  </div>
                  <div className="question__answer">
                    <span className="answer__choice">
                      {" "}
                      <Skeleton />{" "}
                    </span>
                  </div>
                  <div className="question__answer">
                    <span className="answer__choice">
                      {" "}
                      <Skeleton />{" "}
                    </span>
                  </div>

                  <div className="question__answer">
                    <span className="answer__choice">
                      {" "}
                      <Skeleton />
                    </span>
                  </div>

                  <div className="question__answer">
                    <span className="answer__choice">
                      {" "}
                      <Skeleton />
                    </span>
                  </div>
                </div>
              ))}{" "}
          </>
        </>
      )}
    </>
  );
}

export default RevealAnswer;
