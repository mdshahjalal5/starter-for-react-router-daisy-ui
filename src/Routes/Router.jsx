import { createBrowserRouter, Link } from "react-router-dom";
import Home from "../components/Home";
import Root from "../components/Root";
import ErrorPage from "../components/ErrorPage";
import Login from "../components/Login";
import Register from "../components/Register";
import Contact from "../components/Contact";
import Terms from "../components/Terms";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/terms",
        element: <Terms></Terms>,
      },
    ],
  },
]);
