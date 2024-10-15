import "./App.css";
import DetailPage from "./pages/DetailPage";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Sidebar from "./pages/Sidebar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Welcome from "./pages/Welcome";
const Layout = () => {
  return (
    <>
      <div className="flex">
        <div className="w-[18vw]">
          <Sidebar />
        </div>
        <div className="w-[82vw] px-6">
          <Home />
          <Outlet />
        </div>
      </div>
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "course/:id",
        element: <DetailPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
