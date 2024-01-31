import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "todo/:todoId",
    element: <Detail />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
