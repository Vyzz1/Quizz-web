import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
function DropDown(props) {
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
  const handleDelete = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "info=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
    window.location.reload();
  };
  let { img, text, path } = props;
  let bt = false;
  if (text === "Đăng xuất") {
    bt = true;
  }

  return (
    <>
      {!bt ? (
        <>
          <li className="dropdown__item">
            {img}
            <NavLink to={path} onClick={props.onClick}>
              {" "}
              {text}
            </NavLink>
          </li>
        </>
      ) : (
        <>
          {" "}
          <li className="dropdown__item">
            {img}
            <p className="logout_drop" onClick={handleLogout}>
              {" "}
              Đăng xuất{" "}
            </p>
          </li>{" "}
        </>
      )}
    </>
  );
}
export default DropDown;
