import { redirect, json } from "react-router-dom";
import RegisterForm from "../components/User/Register";

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;

export const action = async ({ request, params }) => {
  const method = request.method;
  const inputValue = await request.formData();
  const body = {
    name: inputValue.get("name"),
    email: inputValue.get("email"),
    password: inputValue.get("password"),
    phoneNumber: inputValue.get("phoneNumber"),
    role: "admin",
  };
  const response = await fetch(
    process.env.REACT_APP_API_URL + "/user/register",
    {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
  window.alert(data.message);

  return redirect("/login");
};
