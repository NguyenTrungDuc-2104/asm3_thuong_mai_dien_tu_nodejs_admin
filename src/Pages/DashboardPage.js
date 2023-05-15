import { json } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
const DashboardPage = () => {
  return <Dashboard />;
};
export default DashboardPage;

export const loader = async ({ request, params }) => {
  const response = await fetch(
    process.env.REACT_APP_API_URL + "/product/admin/get_dashboard",
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw json({ message: error.message }, { status: response.status });
  }

  const data = await response.json();
  return data;
};
