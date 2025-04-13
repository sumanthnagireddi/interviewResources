import "./App.css";
import DetailPage from "./pages/DetailPage";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Sidebar from "./pages/Sidebar";
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
        path: "course/:id/:category/:subCategory/:topic",
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
  useEffect(() => {
    const addJsonData = async () => {
      try {
        DATA.forEach(async (data) => {
          // await pushJsonIntoResourcesCollection(data);
        });

        console.log("JSON data pushed to Firestore successfully!");
      } catch (err) {
        console.error("Error pushing JSON data: ", err);
      }
    };

    addJsonData();
  }, []);
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
