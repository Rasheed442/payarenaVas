import React, { useState, lazy, useEffect } from "react";
import { createBrowserRouter, useNavigate, useParams } from "react-router-dom";
import PaymentLayout from "./layout/PaymentLayout";
import SharedLayout from "./layout/SharedLayout";
// import About from "./pages/About";
import AirtimePaymentPage from "./pages/PaymentPages/AirtimePaymentPage";
import BettingLottery from "./pages/PaymentPages/BettingLottery";
import CableTv from "./pages/PaymentPages/CableTv";
import CollectionLevies from "./pages/PaymentPages/CollectionLevies";
// import Contact from "./pages/Contact";
import EducationPayment from "./pages/PaymentPages/EducationPayment";
import Electricity from "./pages/PaymentPages/Electricity";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
// shshs
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import TelecomsPayment from "./pages/PaymentPages/TelecomsPayment";
import TransportToll from "./pages/PaymentPages/TransportToll";
import DashboardLayout from "./layout/DashboardLayout";
import TransfersPage from "./pages/DashboardPages/Transfers";
import PaymentsPage from "./pages/DashboardPages/Payment";
import SelfServicePage from "./pages/DashboardPages/SelfService";
import TransactionsPage from "./pages/DashboardPages/Transactions";
import SettingsPage from "./pages/DashboardPages/Settings";
import Technology from "./pages/PaymentPages/Technology";
import UMT from "./pages/PaymentPages/UMT";
import ReligiousIntitutions from "./pages/PaymentPages/ReligiousIntitutions";
import MovieTickets from "./pages/PaymentPages/MovieTickets";
import Travel from "./pages/PaymentPages/Travel";
import Others from "./pages/PaymentPages/Others";
import Hospitals from "./pages/PaymentPages/Hospitals";
import Insurance from "./pages/PaymentPages/Insurance";
import Pensions from "./pages/PaymentPages/Pensions";
import BillsPayment from "./pages/PaymentPages/BillsPayment";
import SuspenseWrapper from "./components/SuspenseWrapper";
import Loader from "./components/Loader";
import ErrorEl from "./components/ErrorEl";
import PaymentPage from "./pages/PaymentPages/PaymentPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Receipt from "./pages/Receipt";
import Delete from "./pages/Delete";
import PrivateRoute from "./components/PrivateRoute";
import ConfirmEmail from "./pages/ConfirmEmail";
import DesktopLanding from "./desktop/landing";
import RegisterStart from "./pages/RegisterStart";
import RegisterVerify from "./pages/RegisterVerify";
import RegisterVerified from "./pages/RegisterVerified";
import RegisterDetails from "./pages/RegisterDetails";
import RegisterDelivery from "./pages/RegisterDelivery";
import RegisterPassword from "./pages/RegisterPassword";
import RegisterIdentity from "./pages/RegisterIdentity";
import NewLogin from "./pages/NewLogin";
import DashboardV2 from "./pages/DashboardV2";
import HomePage from "./pages/DashboardPages/Home";
import AuthReceiver from "./pages/AuthReceiver";
import WalletPage from "./pages/WalletPage";
import ProfilePage from "./pages/DashboardPages/Profile";
import SettingsV2Page from "./pages/DashboardPages/SettingsV2";

const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
// const PaymentLayout = lazy(() => import("./layout/PaymentLayout"));

// const [paymentbiller, setPaymentBiller] = useState();

export const router = createBrowserRouter([
  { path: "/desktop", element: <DesktopLanding /> },
  { path: "/auth/:token/:userData", element: <AuthReceiver /> },
  { path: "/auth/dashboard/:token/:userData", element: <AuthReceiver /> },
  { path: "/login/new", element: <NewLogin /> },
  { path: "/register/start", element: <RegisterStart /> },
  { path: "/register/verify", element: <RegisterVerify /> },
  { path: "/register/verified", element: <RegisterVerified /> },
  { path: "/register/details", element: <RegisterDetails /> },
  { path: "/register/delivery", element: <RegisterDelivery /> },
  { path: "/register/password", element: <RegisterPassword /> },
  { path: "/register/identity", element: <RegisterIdentity /> },
  {
    path: "/",
    element: <SharedLayout />,
    errorElement: <ErrorEl />,
    // error: < EkoElect />,
    children: [
      { path: "/", element: <Landing /> },
      {
        path: "/about-us",
        element: (
          <SuspenseWrapper fallback={<Loader />}>
            <About />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/contact-us",
        element: (
          <SuspenseWrapper fallback={<Loader />}>
            <Contact />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/deleteAcct",
        element: (
          <SuspenseWrapper fallback={<Loader />}>
            <Delete />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/transaction-report",
        element: <Receipt />,
      },
      {
        path: "/payment",
        element: <PaymentLayout />,
        children: [
          // {
          //   path: "/payment/airtime_recharge",
          //   element: <AirtimePaymentPage />,
          // },
          // {
          //   path: "/payment/electricity",
          //   element: <Electricity />,
          // },

          // {
          //   path: "/payment/cable_tv",
          //   element: <CableTv />,
          // },
          // {
          //   path: "/payment/telecomms",
          //   element: <TelecomsPayment />,
          // },
          // {
          //   path: "/payment/transport_tollpayments",
          //   element: <TransportToll />,
          // },
          // {
          //   path: "/payment/collections_levies",
          //   element: <CollectionLevies />,
          // },
          // {
          //   path: "/payment/education",
          //   element: <EducationPayment />,
          // },
          // {
          //   path: "/payment/betting_lottery",
          //   element: <BettingLottery />,
          // },
          // {
          //   path: "/payment/technology",
          //   element: <Technology />,
          // },
          // {
          //   path: "/payment/unified_money_transfer",
          //   element: <UMT />,
          // },
          // {
          //   path: "/payment/religious_institutions",
          //   element: <ReligiousIntitutions />,
          // },
          // {
          //   path: "/payment/movie_tickets",
          //   element: <MovieTickets />,
          // },
          // {
          //   path: "/payment/travel_hospitality",
          //   element: <Travel />,
          // },
          // {
          //   path: "/payment/others",
          //   element: <Others />,
          // },
          // {
          //   path: "/payment/hospitals",
          //   element: <Hospitals />,
          // },
          // {
          //   path: "/payment/insurance",
          //   element: <Insurance />,
          // },
          // {
          //   path: "/payment/pensions",
          //   element: <Pensions />,
          // },
          //test
          {
            path: `/payment/:paymenttype`,
            element: <PaymentPage />,
          },
          {
            path: `/payment/:paymenttype/:billertype`,
            element: <PaymentPage />,
          },
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "/confirmMail", element: <ConfirmEmail /> },
    ],
  },

  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [{ path: "/dashboard", element: <HomePage /> }],
      },
      {
        path: "/dashboard-v2",
        element: <DashboardV2 />,
      },
      {
        path: "/wallet",
        element: <WalletPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/settings-v2",
        element: <SettingsV2Page />,
      },

      {
        path: "/transfers",
        element: <DashboardLayout />,
        children: [{ path: "/transfers", element: <TransfersPage /> }],
      },
      {
        path: "/payments",
        element: <DashboardLayout />,
        children: [{ path: "/payments", element: <PaymentsPage /> }],
      },
      {
        path: "/service",
        element: <DashboardLayout />,
        children: [{ path: "/service", element: <SelfServicePage /> }],
      },
      {
        path: "/history",
        element: <DashboardLayout />,
        children: [{ path: "/history", element: <TransactionsPage /> }],
      },
      {
        path: "/settings",
        element: <DashboardLayout />,
        children: [{ path: "/settings", element: <SettingsPage /> }],
      },
    ],
  },
]);
function App() {
  // const [paymentbiller, setPaymentBiller] = useState();

  return <h1></h1>;
}

export default App;
