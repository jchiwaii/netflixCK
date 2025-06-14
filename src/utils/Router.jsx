import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Browse from "../components/Browse";
import Layout from "../components/Layout";
import ForgotPassword from "../components/ForgotPassword";
import TermsOfService from "../components/TermsOfService";
import PrivacyPolicy from "../components/PrivacyPolicy";
import ProtectedRoute from "../components/ProtectedRoute";

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
        element: (
          <ProtectedRoute>
            <Browse />
          </ProtectedRoute>
        ),
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/terms",
        element: <TermsOfService />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
    ],
  },
]);
