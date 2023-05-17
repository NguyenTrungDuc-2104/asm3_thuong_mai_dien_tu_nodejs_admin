import { useEffect } from "react";
import { useRouteError, useNavigate, useSubmit } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const submit = useSubmit();
  useEffect(() => {
    if (error.status === 401) {
      submit(null, { method: "DELETE", action: "/" });
      // navigate("/login");
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
