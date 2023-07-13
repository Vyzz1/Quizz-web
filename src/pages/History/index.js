import "./History.css";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../../utils/request";
import { getCookie } from "../../GetCookie";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { history_answers } from "../../action/post_answers";
import { useDispatch } from "react-redux";
import { GetHistory } from "../../service/GetHistory";
import Skeleton from "react-loading-skeleton";

function History() {
  const navigate = useNavigate();
  const current_user_token = getCookie("token");

  const [isDataLoaded, setIsDataLoaded] = useState(true);
  if (!current_user_token) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vui lòng đăng nhập!",
      timer: 2000,
    });
    setTimeout(() => navigate("/login"), 2300);
  }
  const dispatch = useDispatch();

  function countTopic(array, topic) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i].Topic === topic) {
        count++;
      }
    }
    return count;
  }

  const handleOnClick = (topicId, date) => {
    dispatch(history_answers(topicId));
    navigate("/history/" + date);
  };
  const current_info = JSON.parse(getCookie("info"));
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetHistory(current_info.id);
      if (response) {
        setTimeout(() => {
          setData(response);
        }, 1500);
      }
      if (response.length === 0) {
        setTimeout(() => {
          setIsDataLoaded(false);
        }, 1800);
      }
    };

    fetchData();
  }, [current_info.id]);

  const handleTakingQuizz = (id) => {
    navigate(`/quizz/${id}`);
  };
  const handleBackHome = () => {
    navigate("/");
  };
  if (isDataLoaded === false) {
    return (
      <>
        <h1 className="title_no_data">Không có dữ liệu làm bài</h1>
        <p className="title_no_data">
          <b>No Data</b> Bạn chưa làm bài ? Hãy làm bài ngay
        </p>
        <section class="error-container">
          <span>
            <span>4</span>
          </span>
          <span>0</span>
          <span>
            <span>4</span>
          </span>
        </section>
        <div class="link-container">
          <button target="_blank" onClick={handleBackHome} class="more-link">
            Về trang chủ
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      {data.length > 0 ? (
        <>
          <div className="box-header">
            <div className="title"> LỊCH SỬ LÀM BÀI</div>
            <div className="description">
              <div> Tên: {current_info.fullName} </div>
              <div> Email: {current_info.email}</div>
            </div>
          </div>
          <table align="center">
            <tbody>
              <tr>
                <td className="head_tb"> STT </td>
                <td className="head_tb"> Chủ đề </td>
                <td className="head_tb"> Kết quả </td>
                <td className="head_tb"> Chi tiết </td>
                <td className="head_tb"> Thời gian </td>
                <td className="head_tb"> Làm lại </td>
              </tr>
              {data.map((value, index) => {
                return (
                  <tr key={index}>
                    <td> {index + 1} </td>
                    <td> {value.Topic} </td>
                    <td>
                      {value.count} / {value.answers.length}
                    </td>
                    <td>
                      <button
                        className="taking-button"
                        onClick={() => handleOnClick(value.TopicId, value.Date)}
                      >
                        {" "}
                        Detail{" "}
                      </button>
                    </td>
                    <td> {formatDateTime(value.Date)} </td>
                    <td>
                      {" "}
                      <button
                        className="taking-button"
                        onClick={() => handleTakingQuizz(value.TopicId)}
                      >
                        {" "}
                        Retake
                      </button>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="thongke">
            Số lượt làm bài
            <div className="description_thongke">
              HTML5: {countTopic(data, "HTML5")}
            </div>
            CSS3: {countTopic(data, "CSS3")}
            <div className="description_thongke">
              JAVASCRIPT: {countTopic(data, "JAVASCRIPT")}
            </div>
            REACTJS: {countTopic(data, "REACTJS")}
          </div>
        </>
      ) : (
        <>
          <div className="skeleton_title">
            {" "}
            <Skeleton className="skeleton_title-inner" />
            <div className="skeleton_title-des">
              <div>
                {" "}
                <Skeleton />{" "}
              </div>
              <div>
                <Skeleton />
              </div>
            </div>
          </div>
          <table align="center">
            <tbody>
              <tr>
                <td className="skeleton_td">
                  {" "}
                  <Skeleton />{" "}
                </td>
                <td>
                  {" "}
                  <Skeleton />{" "}
                </td>
                <td>
                  {" "}
                  <Skeleton />{" "}
                </td>
                <td>
                  {" "}
                  <Skeleton />{" "}
                </td>
                <td>
                  {" "}
                  <Skeleton />{" "}
                </td>
                <td>
                  {" "}
                  <Skeleton />{" "}
                </td>
              </tr>
              {Array(5)
                .fill()
                .map((_, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {" "}
                        <Skeleton className="skeleton_td" />{" "}
                      </td>
                      <td>
                        {" "}
                        <Skeleton className="skeleton_td" />{" "}
                      </td>
                      <td>
                        <Skeleton className="skeleton_td" />
                      </td>
                      <td>
                        <Skeleton className="skeleton_td" />
                      </td>
                      <td>
                        {" "}
                        <Skeleton className="skeleton_td" />{" "}
                      </td>
                      <td>
                        <Skeleton className="skeleton_td" />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="thongke">
            <Skeleton className="skeleton_td" />
            <div className="description_thongke">
              <Skeleton className="skeleton_td" />
            </div>
            <Skeleton className="skeleton_td" />
            <div className="description_thongke">
              <Skeleton className="skeleton_td" />
            </div>
            <Skeleton className="skeleton_td" />
          </div>
        </>
      )}
    </>
  );
}
export default History;
