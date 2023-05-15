import { redirect, json } from "react-router-dom";
import LoginForm from "../components/User/Login";

const LoginPage = () => {
  return <LoginForm />;
};
export default LoginPage;

export const action = async ({ request, params }) => {
  const method = request.method;
  const inputValue = await request.formData();
  const body = {
    email: inputValue.get("email"),
    password: inputValue.get("password"),
  };
  const response = await fetch(
    process.env.REACT_APP_API_URL + "/user/admin_login",
    {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw json({ message: error.message }, { status: response.status });
  }
  if (response.status === 202) {
    const data = await response.json();
    window.alert(data.message);
    return null;
  }

  const data = await response.json();
  localStorage.setItem("user", JSON.stringify(data.user));
  window.alert(data.message);
  return redirect("/");
};
