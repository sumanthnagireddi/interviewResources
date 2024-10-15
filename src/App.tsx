import "./App.css";
import Home from "./pages/Home";
import Sidebar from "./pages/Sidebar";

function App() {
  const Layout = () => {
    return (
      <>
        <div className="flex">
          <Sidebar />
          <Home />
        </div>
      </>
    );
  };
  return (
    <>
      <Layout />
    </>
  );
}

export default App;
