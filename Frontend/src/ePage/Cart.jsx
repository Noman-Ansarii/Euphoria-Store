import React, { useState, useEffect } from "react";
import Main from "../media/Group.png";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useToastContext } from "@/context/ToastContext";
import axios from "axios";

function Cart() {
  const HOST = import.meta.env.VITE_BACKEND_HOST;
  const [cartlistItems, setCartlistItems] = useState([]);
  const showToast = useToastContext();
  const navigate = useNavigate();

  useEffect(() => {
    const getCartList = async () => {
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
          // Initialize quantity to 1 if not present
          const updatedCartlist = response.data.cartlist.map((item) => ({
            ...item,
            quantity: item.quantity || 1,
          }));
          setCartlistItems(updatedCartlist);
        } else {
          console.error("Empty items array in response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching cartlist", error);
      }
    };

    getCartList();
  }, []);

  const removeFromCartlist = async (itemId) => {
    const token = localStorage.getItem("AuthenticationToken");
    if (!token) {
      showToast({
        title: "Please login to your account",
        position: "bottom-right",
      });
      navigate("/login");
      return;
    }

    if (!itemId) {
      console.error("Missing itemId", { itemId });
      showToast({
        title: "Failed to remove item from cartlist: Missing itemId",
        position: "bottom-right",
      });
      return;
    }

    let userID;
    try {
      const decodedToken = jwtDecode(token);
      userID = decodedToken.user.id;
      if (!userID) {
        throw new Error("userID not found in token");
      }
    } catch (error) {
      console.error("Error decoding token or userID not found", error);
      showToast({
        title: "Failed to remove item from cartlist: Invalid token",
        position: "bottom-right",
        colorScheme: "red",
      });
      return;
    }

    try {
      await axios.delete(`${HOST}/api/v1/user/cartitem/${userID}/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showToast({
        title: "Item removed from cartlist",
        position: "bottom-right",
        colorScheme: "red",
      });

      setCartlistItems(
        cartlistItems.filter((item) => item.productId !== itemId)
      );
    } catch (error) {
      console.error("Error removing item from cartlist", error);
      showToast({
        title: "Failed to remove item from cartlist",
        position: "bottom-right",
        colorScheme: "red",
      });
    }
  };

  const [couponCode, setCouponCode] = useState("");
  const [showCouponSuccess, setShowCouponSuccess] = useState(false);

  const handleQuantityChange = (id, quantity) => {
    const updatedCartItems = cartlistItems.map((item) =>
      item.productId === id ? { ...item, quantity } : item
    );
    setCartlistItems(updatedCartItems);
  };

  const handleCouponApply = () => {
    if (couponCode === "blackfriday") {
      setShowCouponSuccess(true);
    } else {
      setShowCouponSuccess(false);
    }
  };

  const calculateSubtotal = () => {
    const subtotal = cartlistItems.reduce(
      (total, item) =>
        total + parseFloat(item.Price.replace("$", "")) * item.quantity,
      0
    );

    const shipping = calculateShipping(); // Calculate shipping separately

    return subtotal + shipping; // Return subtotal including shipping
  };

  const calculateShipping = () => {
    return cartlistItems.some(
      (item) => parseFloat(item.Price.replace("$", "")) > 100
    )
      ? 0.0
      : 5.0;
  };

  const calculateGrandTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  return (
    <>
      {cartlistItems.length === 0 ? (
        <>
          <div className="CartEmptyContainer">
            <div className="container flex flex-col justify-center items-center py-20">
              <div className="imgEmptyCart">
                <img src={Main} alt="Empty Cart" className="mt-20 mb-10" />
              </div>
              <div className="EmptyCartText text-center">
                <h1 className="text-4xl font-bold">
                  Your cart is empty and sad :(
                </h1>
                <p className="mt-2">Add something to make it happy</p>
                <Link
                  to="/"
                  className="inline-block mt-5 rounded-md px-12 py-2 font-semibold leading-7 mainButtonCSS"
                >
                  Contiune Shopping
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
    <div className="container mx-auto my-20">
      <main>
        <div className="text-gray-600 mb-4">
          <p>
            Please fill in the fields below and click place order to
            complete your purchase!
          </p>
          {localStorage.getItem("AuthenticationToken") ? null : (
            <p>
              Already registered?{" "}
              <Link to="/login" className="text-blue-500">
                Please login here
              </Link>
            </p>
          )}
        </div>

        {/* Headings */}
        <div className="flex justify-between headings p-4 rounded-lg">
          <div className="w-2/5 font-semibold">PRODUCT DETAILS</div>
          <div className="w-1/5 text-center font-semibold">PRICE</div>
          <div className="w-1/5 text-center font-semibold">QUANTITY</div>
          <div className="w-1/5 text-center font-semibold">SHIPPING</div>
          <div className="w-1/5 text-center font-semibold">SUBTOTAL</div>
          <div className="w-1/5 text-center font-semibold">ACTION</div>
        </div>

        <div className="space-y-4 mt-4">
          {cartlistItems.map((item, i) => (
            <div key={i} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center w-2/5">
                <img
                  src={item.image}
                  alt={item.description}
                  className="w-24 h-28 rounded-md object-cover"
                />
                <div className="ml-4">
                  <p className="font-medium">{item.description}</p>
                  <p className="text-gray-500">Colour: {item.color || "Random"}</p>
                  <p className="text-gray-500">Size: {item.size || "Default"}</p>
                </div>
              </div>
              <div className="w-1/5 text-center font-semibold">${item.Price}</div>
              <div className="flex items-center w-1/5 justify-center">
                <button
                  onClick={() =>
                    handleQuantityChange(item.productId, item.quantity - 1)
                  }
                  disabled={item.quantity === 1}
                  className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-l-md"
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.productId, parseInt(e.target.value))
                  }
                  className="w-12 bg-gray-200 hover:bg-gray-300 text-center px-2 py-1 focus:bg-gray-300"
                />
                <button
                  onClick={() =>
                    handleQuantityChange(item.productId, item.quantity + 1)
                  }
                  className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-r-md"
                >
                  +
                </button>
              </div>
              <div className="w-1/5 text-center">{item.Price > 100 ? "FREE" : "$5.00"}</div>
              <div className="w-1/5 text-center">${(item.Price * item.quantity).toFixed(2)}</div>
              <div className="w-1/5 text-center">
                <Trash2
                  className="Trash2 cursor-pointer"
                  onClick={() => removeFromCartlist(item.productId)}
                />
              </div>
            </div>
          ))}
        </div>

            <div className="flex justify-between items-center bg-gray-100 mt-8 p-4 rounded-lg shadow-md">
              <div className="p-4 rounded-md">
                <h2 className="text-lg font-bold mb-2">Discount Codes</h2>
                <p className="text-gray-600">
                  Enter your coupon code if you have one
                </p>
                <div className="flex items-center mt-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    placeholder="Enter coupon code"
                  />
                  <button
                    onClick={handleCouponApply}
                    type="submit"
                    className="ml-2 rounded-md px-3.5 py-1.5 font-semibold leading-7 transition duration-300 mainButtonCSS"
                  >
                    Apply Coupon
                  </button>
                  {showCouponSuccess && (
                    <span className="ml-2 text-green-500 font-medium">
                      Coupon applied successfully!
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <Link
                    to="/"
                    className="bg-gray-100 border-2 border-gray-300 rounded-md px-3.5 py-1.5 font-medium leading-7 text-gray-700 hover:bg-gray-200 transition duration-300"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-600">Sub Total</p>
                  <p className="font-bold">${calculateSubtotal().toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-bold">${calculateShipping().toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center py-2">
                  <p className="text-gray-600 font-bold">Grand Total</p>
                  <p className="font-bold">
                    ${calculateGrandTotal().toFixed(2)}
                  </p>
                </div>
                <hr />
                <Link to="/checkout" className="block w-full px-4 py-2 mt-4 rounded-md transition duration-300 mainButtonCSS">
                  Proceed To Checkout
                </Link>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default Cart;
