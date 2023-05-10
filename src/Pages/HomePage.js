import { json } from "react-router-dom";
import Home from "../Home/Home";
const HomePage = () => {
  return <Home />;
};
export default HomePage;

export const loader = async ({ request, params }) => {
  const response = await fetch(
    process.env.REACT_APP_API_URL + `/product/get_products`,
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
