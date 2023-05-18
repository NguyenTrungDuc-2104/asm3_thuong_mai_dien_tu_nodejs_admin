import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutPage, { action as logoutAction } from "./Pages/LayoutPage";
import ErrorPage from "./Pages/ErrorPage";
import LoginPage, { action as loginAction } from "./Pages/LoginPage";
import RegisterPage, { action as registerAction } from "./Pages/RegisterPage";
import ProductPage, {
  loader as productLoader,
  action as producDeletetAction,
} from "./Pages/ProductPage";
import DashboardPage, {
  loader as dashboardLoader,
} from "./Pages/DashboardPage";
import ChatPage, { loader as chatLoader } from "./Pages/ChatPage";
import ChatDetail, {
  loader as chatDetailLoader,
  action as chatDetailAction,
} from "./components/Chat/ChatDetail";
import NewProduct from "./components/Product/NewProduct/NewProduct";
import UpdateProductPage, {
  loader as updateProductLoader,
  action as updateProductAction,
} from "./Pages/UpdateProductPage";
import NotFoundPage from "./Pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    errorElement: <ErrorPage />,
    action: logoutAction,
    children: [
      {
        index: true,
        element: <DashboardPage />,
        loader: dashboardLoader,
      },
      {
        path: "product",
        element: <ProductPage />,
        loader: productLoader,
        action: producDeletetAction,
      },
      {
        path: "/product/:productId",
        element: <UpdateProductPage />,
        loader: updateProductLoader,
        action: updateProductAction,
      },
      {
        path: "chat",
        element: <ChatPage />,
        loader: chatLoader,
        children: [
          {
            path: ":chatId",
            element: <ChatDetail />,
            loader: chatDetailLoader,
            action: chatDetailAction,
          },
        ],
      },
      {
        path: "new_product",
        element: <NewProduct />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    action: loginAction,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    action: registerAction,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
