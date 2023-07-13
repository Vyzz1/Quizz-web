import { getCookie } from "../../GetCookie";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function DrawQuestion(props) {
  const token = getCookie("token");
  const { questions } = props;
  return (
    <>
      {questions ? (
        <>
          {" "}
          {token &&
            questions.map((value, index) => (
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
                    required
                  />
                  <span className="answer__choice">
                    {" "}
                    A . {value.answers[0]}{" "}
                  </span>
                </div>
                <div className="question__answer">
                  <input
                    type="radio"
                    name={`answer_${index + 1}`}
                    value={1}
                    required
                  />
                  <span className="answer__choice">
                    {" "}
                    B . {value.answers[1]}{" "}
                  </span>
                </div>
                {value.answers.length > 2 && (
                  <div className="question__answer">
                    <input
                      type="radio"
                      name={`answer_${index + 1}`}
                      value={2}
                      required
                    />
                    <span className="answer__choice">
                      {" "}
                      C. {value.answers[2]}
                    </span>
                  </div>
                )}
                {value.answers.length > 3 && (
                  <div className="question__answer">
                    <input
                      type="radio"
                      name={`answer_${index + 1}`}
                      value={3}
                      required
                    />
                    <span className="answer__choice">
                      {" "}
                      D. {value.answers[3]}
                    </span>
                  </div>
                )}
              </div>
            ))}
        </>
      ) : (
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
      )}
    </>
  );
}
export default DrawQuestion;
