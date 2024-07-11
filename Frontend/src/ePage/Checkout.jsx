import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = (props) => {
  const navigate = useNavigate();
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [cartlist, setCartlist] = useState([]);
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    country: "",
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });
  const [shippingDetails, setShippingDetails] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const HOST = import.meta.env.VITE_BACKEND_HOST;

  useEffect(() => {
    const fetchCartlist = async () => {
      const token = localStorage.getItem("AuthenticationToken");
      if (!token) return;

      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user.id;
        if (!userId) {
          return;
        }

        const response = await axios.get(
          `${HOST}/api/v1/user/cartitem/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.cartlist) {
          setCartlist(response.data.cartlist);
        } else {
          console.error("Empty items array in response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching cartlist", error);
      }
    };

    fetchCartlist();
  }, []);

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === "billing") {
      setBillingDetails({ ...billingDetails, [name]: value });
    } else if (section === "shipping") {
      setShippingDetails({ ...shippingDetails, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkoutData = {
      billingDetails: {
        firstName: billingDetails.firstName,
        lastName: billingDetails.lastName,
        country: billingDetails.country,
        streetAddress: billingDetails.streetAddress,
        aptSuite: billingDetails.aptSuite,
        city: billingDetails.city,
        state: billingDetails.state,
        postalCode: billingDetails.postalCode,
        phone: billingDetails.phone,
      },
      shippingDetails: {
        streetAddress: sameAsBilling
          ? billingDetails.streetAddress
          : shippingDetails.streetAddress,
        aptSuite: sameAsBilling
          ? billingDetails.aptSuite
          : shippingDetails.aptSuite,
        city: sameAsBilling ? billingDetails.city : shippingDetails.city,
        state: sameAsBilling ? billingDetails.state : shippingDetails.state,
        postalCode: sameAsBilling
          ? billingDetails.postalCode
          : shippingDetails.postalCode,
      },
      paymentMethod: paymentMethod,
      cartlist: cartlist.map((item) => ({
        productId: item.productId,
        price: item.Price,
        description: item.description,
        image: item.image,
      })),
      subtotal: calculateSubtotal(),
      shipping: calculateShipping(),
      discount: calculateDiscount(),
      total: calculateTotal(),
    };

    const token = localStorage.getItem("AuthenticationToken");
    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user.id;
      if (!userId) {
        console.error("User ID not found in token");
        return;
      }

      const response = await axios.post(
        `${HOST}/api/v1/user/checkout/${userId}`,
        checkoutData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/orderconfirm");
      props.PopUpAlert("Order Placed Successfully, Check your email", "success");
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        console.error("Request made but no response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const calculateSubtotal = () => {
    return cartlist
      .reduce((total, item) => {
        const price = parseFloat(item.Price);
        const quantity = item.quantity || 1;
        return total + (price * quantity || 0);
      }, 0)
      .toFixed(2);
  };

  const calculateShipping = () => {
    return cartlist
      .reduce((total, item) => total + parseFloat(item.shipping || 0), 0)
      .toFixed(2);
  };

  const calculateDiscount = () => {
    return 20.0;
  };

  const calculateTotal = () => {
    return (
      parseFloat(calculateSubtotal()) +
      parseFloat(calculateShipping()) -
      parseFloat(calculateDiscount())
    ).toFixed(2);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 checkout">
      <h1 className="text-4xl font-semibold mb-8 text-gray-800">Check Out</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-4 gap-8"
      >
        <div className="lg:col-span-2">
          <div className="mb-10">
            <h2 className="text-2xl font-medium mb-4">Billing Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                required
                autoComplete="off"
                type="text"
                name="firstName"
                placeholder="First Name"
                className="border p-3 rounded w-full"
                value={billingDetails.firstName}
                onChange={(e) => handleInputChange(e, "billing")}
              />
              <input
                required
                autoComplete="off"
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="border p-3 rounded w-full"
                value={billingDetails.lastName}
                onChange={(e) => handleInputChange(e, "billing")}
              />
              <input
                required
                autoComplete="off"
                type="text"
                name="country"
                placeholder="Country / Region"
                className="border p-3 rounded w-full md:col-span-2"
                value={billingDetails.country}
                onChange={(e) => handleInputChange(e, "billing")}
              />
              <input
                required
                autoComplete="off"
                type="text"
                name="streetAddress"
                placeholder="Street Address"
                className="border p-3 rounded w-full md:col-span-2"
                value={billingDetails.streetAddress}
                onChange={(e) => handleInputChange(e, "billing")}
              />
              <input
                required
                autoComplete="off"
                type="text"
                name="aptSuite"
                placeholder="Apt, suite, unit"
                className="border p-3 rounded w-full md:col-span-2"
                value={billingDetails.aptSuite}
                onChange={(e) => handleInputChange(e, "billing")}
              />
              <input
                required
                autoComplete="off"
                type="text"
                name="city"
                placeholder="City"
                className="border p-3 rounded w-full"
                value={billingDetails.city}
                onChange={(e) => handleInputChange(e, "billing")}
              />
              <input
                required
                autoComplete="off"
                type="text"
                name="state"
                placeholder="State"
                className="border p-3 rounded w-full"
                value={billingDetails.state}
                onChange={(e) => handleInputChange(e, "billing")}
              />
              <input
                required
                autoComplete="off"
                type="number"
                name="postalCode"
                placeholder="Postal Code"
                className="border p-3 rounded w-full"
                value={billingDetails.postalCode}
                onChange={(e) => handleInputChange(e, "billing")}
              />
              <input
                required
                autoComplete="off"
                type="tel"
                name="phone"
                placeholder="Phone"
                className="border p-3 rounded w-full md:col-span-2"
                value={billingDetails.phone}
                onChange={(e) => handleInputChange(e, "billing")}
              />
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-medium mb-4">Shipping Address</h2>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  required
                  autoComplete="off"
                  type="radio"
                  className="form-radio"
                  name="shippingAddress"
                  checked={sameAsBilling}
                  onChange={() => setSameAsBilling(true)}
                />
                <span className="ml-2 text-gray-700">
                  Same as Billing address
                </span>
              </label>
              <label className="flex items-center mt-2">
                <input
                  required
                  autoComplete="off"
                  type="radio"
                  className="form-radio"
                  name="shippingAddress"
                  checked={!sameAsBilling}
                  onChange={() => setSameAsBilling(false)}
                />
                <span className="ml-2 text-gray-700">
                  Use a different shipping address
                </span>
              </label>
            </div>
            {!sameAsBilling && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  required
                  autoComplete="off"
                  type="text"
                  name="streetAddress"
                  placeholder="Street Address"
                  className="border p-3 rounded w-full md:col-span-2"
                  value={shippingDetails.streetAddress}
                  onChange={(e) => handleInputChange(e, "shipping")}
                />
                <input
                  required
                  autoComplete="off"
                  type="text"
                  name="aptSuite"
                  placeholder="Apt, suite, unit"
                  className="border p-3 rounded w-full md:col-span-2"
                  value={shippingDetails.aptSuite}
                  onChange={(e) => handleInputChange(e, "shipping")}
                />
                <input
                  required
                  autoComplete="off"
                  type="text"
                  name="city"
                  placeholder="City"
                  className="border p-3 rounded w-full"
                  value={shippingDetails.city}
                  onChange={(e) => handleInputChange(e, "shipping")}
                />
                <input
                  required
                  autoComplete="off"
                  type="text"
                  name="state"
                  placeholder="State"
                  className="border p-3 rounded w-full"
                  value={shippingDetails.state}
                  onChange={(e) => handleInputChange(e, "shipping")}
                />
                <input
                  required
                  autoComplete="off"
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  className="border p-3 rounded w-full"
                  value={shippingDetails.postalCode}
                  onChange={(e) => handleInputChange(e, "shipping")}
                />
              </div>
            )}
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-medium mb-4">Shipping Method</h2>
            <div className="border p-4 rounded">
              <div className="flex justify-between text-gray-700">
                <span>Arrives by Monday, June 7</span>
                <span>$5.00</span>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-medium">Payment Method</h2>
            <p className="mb-4">All transactions are secure and encrypted.</p>
            <div className="mainCheckout p-4 rounded-xl">
              <div className="border p-4 rounded mb-4">
                <label className="flex items-center mb-2">
                  <input
                    required
                    autoComplete="off"
                    type="radio"
                    className="form-radio"
                    name="paymentMethod"
                    value="creditCard"
                    checked={paymentMethod === "creditCard"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-2 text-gray-700">Credit Card</span>
                </label>
                <div className="flex justify-evenly items-center my-4">
                  <img
                    src="https://res.cloudinary.com/dvo26dhuq/image/upload/v1720119714/Frame_440_znxdfa.png"
                    alt="Google Pay"
                  />
                  <img
                    src="https://res.cloudinary.com/dvo26dhuq/image/upload/v1720119711/Frame_442_atayjr.png"
                    alt="PayPal"
                  />
                  <img
                    src="https://res.cloudinary.com/dvo26dhuq/image/upload/v1720119712/Frame_441_zlo5bk.png"
                    alt="VISA Card"
                  />
                  <img
                    src="https://res.cloudinary.com/dvo26dhuq/image/upload/v1720119711/Frame_443_okkmle.png"
                    alt="PayPass"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    autoComplete="off"
                    type="tel"
                    placeholder="Card Number"
                    className="border p-3 rounded w-full"
                  />
                  <input
                    autoComplete="off"
                    type="text"
                    placeholder="Name on Card"
                    className="border p-3 rounded w-full"
                  />
                  <input
                    autoComplete="off"
                    type="month"
                    placeholder="Expiration Date (MM/YY)"
                    className="border p-3 rounded w-full"
                  />
                  <input
                    autoComplete="off"
                    type="tel"
                    placeholder="Security Code"
                    className="border p-3 rounded w-full"
                  />
                </div>
              </div>
              <div className="border p-4 rounded mb-4">
                <label className="flex items-center mb-2">
                  <input
                    autoComplete="off"
                    type="radio"
                    className="form-radio"
                    name="paymentMethod"
                    value="cashOnDelivery"
                    checked={paymentMethod === "cashOnDelivery"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-2 text-gray-700">Cash on delivery</span>
                </label>
              </div>
              <div className="border p-4 rounded">
                <label className="flex items-center mb-2">
                  <input
                    autoComplete="off"
                    type="radio"
                    className="form-radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-2 text-gray-700">Paypal</span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full text-white py-3 rounded mt-6 mainButtonCSS"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 border p-6 rounded shadow-md bg-white">
          <h2 className="text-2xl font-medium mb-4 text-gray-800">
            Order Summary
          </h2>
          <div className="mb-4">
            {cartlist.map((item, index) => (
              <div
                key={index}
                className="flex justify-around items-center my-4 text-gray-700"
              >
                <img
                  src={item.image}
                  alt={item.description}
                  className="w-24 h-24 rounded-md object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-semibold">{item.description}</span>
                  <div className="flex">
                    <span className="font-semibold">Colour:</span>
                    <span>Random</span>
                  </div>
                </div>
                <span>${item.Price}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>${calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>${calculateShipping()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Discount</span>
              <span>-${calculateDiscount().toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-xl text-gray-800">
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
