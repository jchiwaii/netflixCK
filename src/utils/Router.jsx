import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Browse from "../components/Browse";
import Layout from "../components/Layout";
import ForgotPassword from "../components/ForgotPassword";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]);
