import { useEffect } from "react";
import { useRouteError, useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  useEffect(() => {
    if (error.status === 401) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [error]);

  return (
    <>
      <h1>{error.message}</h1>
      <p>{error.status}</p>
    </>
  );
};
export default ErrorPage;
