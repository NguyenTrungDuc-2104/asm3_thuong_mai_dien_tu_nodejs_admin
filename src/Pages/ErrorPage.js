import { useRouteError, useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  if (error.status === 401) {
    navigate("/login");
  }
  console.log(error);
};
export default ErrorPage;
