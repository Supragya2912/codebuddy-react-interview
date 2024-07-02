import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import BookingSuccess from "./pages/BookingSuccess";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/booking-success", element: <BookingSuccess /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
