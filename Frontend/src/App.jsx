import React, { useState, useEffect } from "react";
import MainPage from "./mainPage.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import SignUpOne from "./Auth/Signup.jsx";
import Navbar from "./Pages/Navbar.jsx";
import SignIn from "./Auth/Login.jsx";
import ForgetPassword from "./Auth/ForgetPassword.jsx";
import ResetPassword from "./Auth/ResetPassword.jsx";
import Cart from "./ePage/Cart.jsx";
import Profile from "./Pages/Profile.jsx";
import Alert from "./MyComponents/Alert.jsx";
import WishFav from "./ePage/WishFav.jsx";
import Footer from "./Pages/Footer.jsx";
import Loader from ".//MyComponents/Loader.jsx"; // Import the Loader component
import AssignAdmin from "./Auth/AssignAdmin.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Checkout from "./ePage/Checkout.jsx";
import MyOrders from "./ePage/MyOrder.jsx";
import OrderConfirm from "./Pages/OrderConfirm.jsx";

function App() {
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const Authentication = localStorage.getItem('AuthenticationToken');

  const PopUpAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    const simulateLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    window.addEventListener("load", handleLoad);
    simulateLoading();

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [location.pathname]);

  return (
    <>
      <Navbar PopUpAlert={PopUpAlert} />
      <Alert alert={alert} />
      {loading && <Loader />}
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route
          exact
          path="/signup"
          element={<SignUpOne PopUpAlert={PopUpAlert} />}
        />
        <Route
          exact
          path="/login"
          element={<SignIn PopUpAlert={PopUpAlert} />}
        />
        <Route
          exact
          path="/assign-admin"
          element={<AssignAdmin PopUpAlert={PopUpAlert} />}
        />
        <Route exact path="/f0rg3tp455" element={<ForgetPassword PopUpAlert={PopUpAlert} />} />
        <Route exact path="/r353t9455/:userId/:token" element={<ResetPassword PopUpAlert={PopUpAlert}/>} />
        <Route exact path="*" element={<NotFound />} />

        {Authentication ? (
          <>
          <Route exact path="/c4r7" element={<Cart />} />
          <Route exact path="/pr0f1l3" element={<Profile />} />
          <Route exact path="/w15h715t" element={<WishFav />} />
          <Route exact path="/checkout" element={<Checkout PopUpAlert={PopUpAlert}/>} />
          <Route exact path="/orderconfirm" element={<OrderConfirm PopUpAlert={PopUpAlert}/>} />
          <Route exact path="/orders" element={<MyOrders />} />
          </>
        ) : (
          <Route path="/login" element={<SignIn PopUpAlert={PopUpAlert} setLoading={setLoading} />} />
        )}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
