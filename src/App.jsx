import "./App.css";
import DetailPage from "./pages/DetailPage";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Sidebar from "./pages/SidebarNew";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import { getResourceByName, pushJsonIntoResourcesCollection } from "./services/resourceService";
import { DATA } from "./lib/resources";
import { useEffect } from "react";
import { ModalProvider } from "./context/ModalContext";
// import { ThemeProvider } from "./lib";
const Layout = () => {
  return (
    <>
      <div className="flex">
        <div className="hidden lg:overflow-x-auto lg:block overflow-auto w-full lg:max-w-[20vw]">
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
        path: "course/:category/:subCategory/:topic",
        element: <DetailPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      {/* <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme"> */}
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
