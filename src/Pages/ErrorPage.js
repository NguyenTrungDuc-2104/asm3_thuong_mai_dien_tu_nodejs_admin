import { useEffect } from "react";
import { useRouteError, useSubmit, useLocation } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError();
  const location = useLocation();
  const submit = useSubmit();
  useEffect(() => {
    if (error.status === 401 && location.pathname !== "/login") {
      submit(null, { method: "DELETE", action: "/" });
    }
  }, [error, location]);

  return (
    <>
      <h1>{error.message}</h1>
      <p>{error.status}</p>
    </>
  );
};
export default ErrorPage;
