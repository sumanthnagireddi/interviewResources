import "./App.css";
import DetailPage from "./pages/DetailPage";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Sidebar from "./pages/Sidebar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Admin from "./pages/Admin";
// import { ThemeProvider } from "./lib";
const Layout = () => {
  return (
    <>
      <div className="flex">
        <div className="hidden lg:block lg:w-[20vw]">
          <Sidebar />
        </div>
        <div className="flex-1 max-h-[97vh] overflow-y-auto px-6">
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
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      {/* <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme"> */}
      <RouterProvider router={router} />
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
