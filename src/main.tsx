import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Verify from "./pages/Verify";
import WhyUtah from "./pages/WhyUtah";
import WhyUtah1 from "./pages/WhyUtah1";
import WhyUtah2 from "./pages/WhyUtah2";
import PageNotFound from "./pages/PageNotFound";
import MortgagePaymentCalculator from "./pages/calculators/MortgagePaymentCalculator";
import AffordabilityCalculator from "./pages/calculators/AffordabilityCalculator";
import ClosingCostCalculator from "./pages/calculators/ClosingCostCalculator";
import IncomeCalculator from "./pages/calculators/IncomeCalculator";
import RefinanceCalculator from "./pages/calculators/RefinanceCalculator";
import HomeSaleCalculator from "./pages/calculators/HomeSaleCalculator";
import BuyingPowerCalculator from "./pages/calculators/BuyingPowerCalculator";
import TemporaryBuydownCalculator from "./pages/calculators/TemporaryBuydownCalculator";
import AboutMe from "./pages/AboutMe";
import FoundersLetter from "./pages/FoundersLetter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/why-utah", element: <WhyUtah /> },
  { path: "/why-utah1", element: <WhyUtah1 /> },
  { path: "/why-utah2", element: <WhyUtah2 /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/verify", element: <Verify /> },
  { path: "/founder-letter", element: <FoundersLetter /> },
  { path: "/calculators/mortgage-payment", element: <MortgagePaymentCalculator /> },
  { path: "/calculators/affordability", element: <AffordabilityCalculator /> },
  { path: "/calculators/income", element: <IncomeCalculator /> },
  { path: "/calculators/closing-cost", element: <ClosingCostCalculator /> },
  { path: "/calculators/refinance", element: <RefinanceCalculator /> },
  { path: "/calculators/home-sale", element: <HomeSaleCalculator /> },
  { path: "/calculators/buying-power", element: <BuyingPowerCalculator /> },
  { path: "/calculators/temporary-buydown", element: <TemporaryBuydownCalculator /> },
  { path: "/about", element: <AboutMe /> },
  { path: "/about-me", element: <AboutMe /> },
  { path: "*", element: <PageNotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer position="top-center" />
  </>
);