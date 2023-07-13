import { useState, useEffect } from "react";
import "./SignUp.css";
import { useDispatch } from "react-redux";
import { signUP } from "../../action/signUp";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { GetUsers } from "../../service/GetUsers";
import { GetLength } from "../../service/GetLength";
import { MdEmail } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { AiFillLock } from "react-icons/ai";
function SignUp() {
  const [data, setData] = useState([]);

  const fectchApi = async () => {
    const result = await GetUsers();
    if (result) {
      setData(result);
    }
  };
  useEffect(() => {
    fectchApi();
  }, []);

  const [length, setLength] = useState([]);
  useEffect(() => {
    const fectch = async () => {
      const response = await GetLength(`users`);
      if (response) {
        setLength(response);
      }
    };
    fectch();
  }, []);

  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    let fullname = e.target.elements.fullname.value;
    let email = e.target.elements.email.value;
    let password1 = e.target.elements.password1.value;
    let password2 = e.target.elements.password2.value;
    let emailExists = false; // Biến kiểm soát
    data.forEach((value) => {
      if (value.email === email) {
        emailExists = true;
        setError("Email đã tồn tại");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 1500);
      }
    });
    if (!emailExists && password1 === password2) {
      dispatch(signUP(fullname, email, password1, length));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tạo tài khoản thành công",
        text: "Hãy đăng nhập để chứng tỏ là bạn",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        nagivate("/login");
      }, 1800);
    } else if (!emailExists) {
      setError("Mật khẩu không khớp");
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
            <h2 className="form-title"> ĐĂNG KÝ </h2>
            <div className="input_form">
              <CiUser size={24} className="icon-input" />
              <input
                type="text"
                placeholder="Nhập tên người dùng"
                className="username"
                name="fullname"
                id="fullname"
                required
              />
              <span className="span"> </span>
            </div>
            <div className="input_form">
              <MdEmail size={24} className="icon-input" />
              <input
                type="text"
                placeholder="Nhập email của bạn"
                className="username"
                name="email"
                id="email"
                required
              />
              <span className="span"> </span>
            </div>
            <div className="input_form">
              <AiFillLock size={24} className="icon-input" />
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                className="password"
                name="password1"
                required
              />
              <span className="span"> </span>
            </div>
            <div className="input_form">
              <AiFillLock size={24} className="icon-input" />
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                className="password"
                name="password2"
                required
              />
              <span className="span"> </span>
            </div>

            <button className="submit_btn1" type="submit">
              {" "}
              Tạo tài khoản{" "}
            </button>
            <button className="submit_btn1 " type="submit">
              {" "}
              Tạo lại{" "}
            </button>
            {showError && (
              <div
                className="error-message"
                style={{ textAlign: "center", color: "red", margin: "18px 0" }}
              >
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
