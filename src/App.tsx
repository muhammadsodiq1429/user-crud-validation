import { lazy, memo } from "react";
import { useRoutes } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
const Home = lazy(() => import("./pages/home"));
const Register = lazy(() => import("./pages/register"));

const App = () => {
  return (
    <div className="app min-h-screen dark:text-white bg-linear-to-tr dark:from-[#090979] from-[#9dc1fa] to-[#00d4ff] dark:to-[#020024]">
      <Header />
      {useRoutes([
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ])}
      <Footer />
    </div>
  );
};

export default memo(App);
