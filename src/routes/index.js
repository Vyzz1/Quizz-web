import { Navigate } from "react-router-dom";
import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Topics from "../pages/Topics";
import Questions from "../pages/Questions";
import History from "../pages/History";
import DetailHistory from "../components/DetailHistory";
import PrivateRoutes from "../components/PrivateRoutes";
import Result from "../pages/Result";
export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <SignUp />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "quizz",
            index: true,
            element: <Topics />,
          },
          {
            path: "quizz/:id",
            element: <Questions />,
          },
          {
            path: "quizz/reveal/:id",
            element: <Result />,
          },
        ],
      },
      {
        path: "history",
        element: <PrivateRoutes />,
        children: [
          {
            index: true,
            element: <History />,
          },
          {
            path: ":date",
            element: <DetailHistory />,
          },
        ],
      },
    ],
  },
];
