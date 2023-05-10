import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import ErrorPage from "./Pages/ErrorPage";
import HomePage, { loader as homeLoader } from "./Pages/HomePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    error: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
