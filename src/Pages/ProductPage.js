import { json, redirect } from "react-router-dom";
import Product from "../components/Product/Product";
const ProductPage = () => {
  return <Product />;
};
export default ProductPage;

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

export const action = async ({ request, params }) => {
  const method = request.method;
  const value = await request.formData();
  const productId = JSON.parse(value.get("productId"));
  const response = await fetch(
    process.env.REACT_APP_API_URL +
      `/product/admin/delete_product/${productId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw json({ message: error.message }, { status: response.status });
  }
  const data = await response.json();
  window.alert(data.message);
  return null;
};
