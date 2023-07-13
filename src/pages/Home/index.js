import { Link } from "react-router-dom";
import { getCookie } from "../../GetCookie";
import "./Home.css";
function Home() {
  const token = getCookie("token");

  return (
    <>
      {" "}
      {token && (
        <>
          {" "}
          <div className="container">
            {" "}
            <p className="success">Chúc mừng bạn đã đăng nhập thành công!</p>
            <Link to="quizz">
              {" "}
              <button className="button quizz-button">
                {" "}
                Chủ đề ôn luyện{" "}
              </button>{" "}
            </Link>{" "}
            <Link to="history">
              <button className="button answers-button">Lịch sử làm bài</button>
            </Link>
          </div>{" "}
          <hr style={{ borderColor: "blue" }} />{" "}
        </>
      )}{" "}
      <div className="container">
        <p className="intro">
          {" "}
          Website trắc nghiệm online lập trình Frontend là một nền tảng trực
          tuyến cho phép các lập trình viên Frontend thực hiện các bài kiểm tra,
          trắc nghiệm, đánh giá và đo đạc kiến thức của mình trong lĩnh vực lập
          trình Frontend.{" "}
        </p>{" "}
        <p className="intro">
          {" "}
          Đối với các lập trình viên Frontend, website trắc nghiệm online cung
          cấp các bài kiểm tra để giúp họ nâng cao kiến thức và kỹ năng của mình
          trong các công nghệ và công cụ lập trình như HTML, CSS, JavaScript,
          jQuery, Bootstrap, Angular, React, Vue,…{" "}
        </p>{" "}
      </div>
      <p className="feture"> Tính năng của trang web : </p>
      <ul className="feture_list">
        <li> Đăng nhập </li>
        <li> Đăng kí </li>
        <li> Làm bài theo chủ đề</li>
        <li> Lịch sử làm bài </li>
        <li> Chi tiết bài làm</li>
      </ul>
      <p className="feture"> Công nghệ mà mình sử dụng : </p>
      <ul className="feture_list">
        <li> ReactJs </li>
        <li> React Redux </li>
        <li> SweetAlert2</li>
        <li> React Router </li>
        <li> React Hooks</li>
        <li> Firebase RealTime Database</li>
        <li>React Loading Skeleton</li>
      </ul>
      {!token && (
        <div className="login">
          <div className="not_login">
            Bạn chưa đăng nhập ? Hãy đăng nhập để làm bài ngay
          </div>
          <Link to="login">
            <button className="button login-button">Đăng nhập</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default Home;
