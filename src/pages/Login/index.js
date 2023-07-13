import { useEffect, useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setCookie } from "../../SetCookie";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getCookie } from "../../GetCookie";
import { loginSuccess } from "../../action/login_logout";
import { GetUsers } from "../../service/GetUsers";
import { MdEmail } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const fectchApi = async () => {
    const response = await GetUsers();
    if (response) {
      setData(response);
    }
  };
  useEffect(() => {
    fectchApi();
  }, []);
  function handleReload() {
    fectchApi();
  }

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  let found = false;
  let minutes = 20;
  const handleSubmit = (e) => {
    e.preventDefault();
    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;
    if (email.length > 0 && password.length > 0) {
      data.forEach((value) => {
        if (value.email === email && value.password === password) {
          setCookie("token", value.token, minutes, 1);
          let { id, fullName, email } = value;
          let info = { id: id, fullName: fullName, email: email };
          setCookie("info", JSON.stringify(info), minutes, 1);
          const token = getCookie("token");
          dispatch(loginSuccess(token, value));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Đăng nhập thành công",
            showConfirmButton: false,
            timer: 1000,
          });
          setTimeout(() => {
            handleReload();
            navigate("/");
          }, 1100);
          found = true;
        }
      });
      if (!found) {
        setError("Tên đăng nhập hoặc mật khẩu sai");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 1500);
      }
    } else {
      setError("Vui lòng nhập thông tin");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 1500);
    }
  };

  return (
    <>
      <div className="container">
        <div className="container_form">
          <form onSubmit={handleSubmit} className="form__login">
            <h2 className="form-title"> ĐĂNG NHẬP </h2>
            <div className="input_form">
              <MdEmail size={24} className="icon-input" />
              <input
                type="text"
                placeholder="Nhập email của bạn"
                className="username"
                name="email"
                id="email"
              />
              <span className="span"> </span>
            </div>
            <div className="input_form">
              <AiFillLock size={24} className="icon-input" />
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                className="password"
                name="password"
              />
              <span className="span"> </span>
            </div>

            <button className="submit_btn1" type="submit">
              {" "}
              Đăng nhập{" "}
            </button>
            {showError && (
              <div
                className="error-message"
                style={{ textAlign: "center", color: "red", margin: "18px 0" }}
              >
                {error}
              </div>
            )}
            <p>
              {" "}
              Chưa có tài khoản ? <Link to="/register"> Đăng ký ngay</Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
