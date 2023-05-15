import { json, redirect } from "react-router-dom";
import Layout from "../layouts/Layout";
const LayoutPage = () => {
  return <Layout />;
};
export default LayoutPage;
export const action = async ({ request, params }) => {
  const method = request.method;
  const response = await fetch(process.env.REACT_APP_API_URL + "/user/logout", {
    method: method,
    credentials: "include",
  });
  if (!response.ok) {
    const error = await response.json();
    throw json({ message: error.message }, { status: response.status });
  }
  return redirect("/login");
};
