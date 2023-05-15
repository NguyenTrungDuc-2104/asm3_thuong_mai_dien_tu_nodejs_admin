import { json, redirect } from "react-router-dom";
import UpdateProduct from "../components/Product/UpdateProduct/UpdateProduct";
const UpdateProductPage = () => {
  return <UpdateProduct />;
};
export default UpdateProductPage;

export const loader = async ({ request, params }) => {
  const productId = params.productId;
  const response = await fetch(
    process.env.REACT_APP_API_URL + `/product/admin/get_product/${productId}`,
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

export const action = async ({ request, params }) => {
  const method = request.method;
  const inputValue = await request.formData();
  const body = {
    productId: inputValue.get("productId"),
    name: inputValue.get("productName"),
    category: inputValue.get("category"),
    price: inputValue.get("price"),
    short_desc: inputValue.get("short_desc"),
    long_desc: inputValue.get("long_desc"),
  };

  const response = await fetch(
    process.env.REACT_APP_API_URL + "/product/admin/update-product",
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
  const data = await response.json();
  window.alert(data.message);
  return redirect("/product");
};
