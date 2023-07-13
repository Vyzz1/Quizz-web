import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { GetQuestions } from "../../service/GetQuestions";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import RevealAnswer from "../../components/RevealAnswer";
import "./Result.scss";
function Result() {
  const params = useParams();
  const navigate = useNavigate();
  const [questions, setQuestion] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await GetQuestions(params.id);
      setTimeout(() => {
        setQuestion(response);
      }, 1900);
    };
    fetchApi();
  }, [params.id]);
  const answers = useSelector((state) => state.submit_reducer);

  if (!answers) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vui lòng đăng nhập!",
      timer: 2000,
    });
    setTimeout(() => navigate("/"), 2300);
  }

  return (
    <>
      <RevealAnswer answers={answers} questions={questions} />
    </>
  );
}
export default Result;
