import { Outlet, useNavigate } from "react-router-dom";
import { getCookie } from "../../GetCookie";
import Swal from "sweetalert2";

function PrivateRoutes() {
  const navigate = useNavigate();
  const token = getCookie("token");
  if (!token) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vui lòng đăng nhập!",
      timer: 2000,
    });
    setTimeout(() => navigate("/"), 2300);
  }

  return <>{token && <Outlet />}</>;
}

export default PrivateRoutes;
