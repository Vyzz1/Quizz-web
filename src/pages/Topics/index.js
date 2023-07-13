import { useEffect, useState, useCallback } from "react";
import "./Topics.css";
import { useNavigate } from "react-router";
import { getCookie } from "../../GetCookie";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { database } from "../../firebase";
import { child, get, ref } from "firebase/database";
function Topics() {
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    (e) => {
      navigate(`/quizz/${e}`);
    },
    [navigate]
  );
  const [categoryResult, setCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, "topics"));
      if (snapshot.exists()) {
        setCategory(snapshot.val());
      }
    };

    fetchData();
  }, []);

  if (!getCookie("token")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vui lòng đăng nhập!",
      timer: 2000,
    });
    setTimeout(() => navigate("/login"), 2500);
  }

  return (
    <>
      {categoryResult.length > 0 ? (
        <>
          {" "}
          <h1 className="title"> CHỌN CHỦ ĐỀ</h1>{" "}
          <div className="button">
            {categoryResult.map((value) => (
              <button
                key={value.id}
                className="button-49"
                onClick={() => handleOnClick(value.id)}
              >
                {value.name}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="title ">
            {" "}
            <Skeleton className="title-skeleton" />{" "}
          </h1>{" "}
          <div className="button">
            {Array(4)
              .fill()
              .map((_, index) => (
                <button key={index} className="button-49">
                  <Skeleton />
                </button>
              ))}
          </div>
        </>
      )}
    </>
  );
}

export default Topics;
