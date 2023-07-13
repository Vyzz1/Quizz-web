import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "./LayoutDefault.css";
import { getCookie } from "../../GetCookie";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import {
  AiOutlineBars,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineHome,
  AiOutlineHistory,
  AiOutlineCode,
} from "react-icons/ai";
import { BiLogoRedux, BiLogOut } from "react-icons/bi";
import DropDown from "../../components/DropDown";
import { useEffect, useRef, useState } from "react";
// done importing
function LayoutDefault() {
  const handleDelete = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
    window.location.reload();
  };
  const navigate = useNavigate();
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: true,
  });
  const handleLogout = () => {
    swalWithBootstrapButtons
      .fire({
        title: "Bạn có muốn đăng xuất không ?",
        // icon: "question",
        showCancelButton: true,
        confirmButtonText: "OK !",
        cancelButtonText: "HỦY !",
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleDelete();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          return;
        }
      });
  };
  let size = 20;
  const [open, setOpen] = useState(false);

  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const closeDropdown = () => {
    setOpen(false);
  };
  const token = getCookie("token");
  return (
    <>
      <header className="header">
        <div className="header__logo">
          <BiLogoRedux size={34} color="#0056b3" />

          <Link to="/">Quizz</Link>
        </div>

        <ul className="header__menu">
          <li>
            <NavLink to="/">Trang chủ</NavLink>
          </li>
          {!token ? (
            <>
              <li>
                <NavLink to="/login">Đăng nhập</NavLink>
              </li>
              <li>
                <NavLink to="/register">Đăng kí</NavLink>
              </li>
            </>
          ) : token ? (
            <>
              <li>
                <NavLink to="/quizz">Chọn chủ đề</NavLink>
              </li>
              <li>
                <NavLink to="/history">Lịch sử làm bài</NavLink>
              </li>
              <li>
                <button className="log_out_button " onClick={handleLogout}>
                  {" "}
                  Đăng xuất{" "}
                </button>
              </li>
            </>
          ) : null}

          <div class="dropdown" ref={menuRef}>
            <button
              class="dropbtn"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <AiOutlineBars size={25} color="#08a0ff" />{" "}
            </button>
            <div className={`dropdown-content ${open ? "active" : "inactive"}`}>
              {token ? (
                <>
                  {" "}
                  <DropDown
                    img={<AiOutlineHome size={size} />}
                    text={"Trang chủ"}
                    path={"/"}
                    onClick={closeDropdown}
                  />
                  <DropDown
                    img={<AiOutlineCode size={size} />}
                    text={"Chủ đề"}
                    path={"/quizz"}
                    onClick={closeDropdown}
                  />
                  <DropDown
                    img={<AiOutlineHistory size={size} />}
                    text={"Lịch sử   "}
                    path={"/history"}
                    onClick={closeDropdown}
                  />
                  <DropDown
                    img={<BiLogOut size={size} />}
                    text={"Đăng xuất"}
                    onClick={closeDropdown}
                  />
                </>
              ) : (
                <>
                  {" "}
                  <DropDown
                    img={<AiOutlineHome size={size} />}
                    text={"Trang chủ"}
                    path={"/"}
                    onClick={closeDropdown}
                  />
                  <DropDown
                    img={<AiOutlineLogin size={size} />}
                    text={"Đăng nhập"}
                    path={"/login"}
                    onClick={closeDropdown}
                  />
                  <DropDown
                    img={<AiOutlineUserAdd size={size} />}
                    text={"Đăng kí   "}
                    path={"/register"}
                    onClick={closeDropdown}
                  />
                </>
              )}
            </div>
          </div>
        </ul>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <div className="footer">Copyright VyHuynhKhang @2023</div>
    </>
  );
}

export default LayoutDefault;
