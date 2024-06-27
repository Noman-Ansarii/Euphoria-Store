import React, { useState } from "react";
import IMG1 from "../media/MenCate/1.png";
import IMG2 from "../media/MenCate/2.png";
import IMG3 from "../media/MenCate/3.png";
import Main from "../media/Group.png";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

function App() {
  const [addedToCart, setAddedToCart] = useState([]);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Blue Flower Print Crop Top",
      price: 29.0,
      quantity: 1,
      image: IMG1,
      color: "Yellow",
      size: "M",
    },
    {
      id: 2,
      name: "Levender Hoodie",
      price: 119.0,
      quantity: 2,
      image: IMG2,
      color: "Levender",
      size: "XXL",
    },
    {
      id: 3,
      name: "Black Sweatshirt",
      price: 123.0,
      quantity: 2,
      image: IMG3,
      color: "Black",
      size: "XXL",
    },
  ]);
  const [couponCode, setCouponCode] = useState("");
  const [showCouponSuccess, setShowCouponSuccess] = useState(false);

  const handleQuantityChange = (id, quantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const handleCouponApply = () => {
    // Logic to validate the coupon code
    if (couponCode === "SUMMER10") {
      setShowCouponSuccess(true);
      // Apply discount
    } else {
      // Handle invalid coupon code
      setShowCouponSuccess(false);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateShipping = () => {
    return cartItems.some((item) => item.price > 100) ? 5.0 : 0.0;
  };

  const calculateGrandTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  return (
    <>
      {addedToCart.length === 0 ? (
        <>
          <div className="CartEmptyContainer">
            <div className="container flex flex-col justify-center items-center">
              <div className="imgEmptyCart">
                <img src={Main} alt="Empty Cart" className="mt-20 mb-10" />
              </div>
              <div className="EmptyCartText text-center">
                <h1 className="text-4xl font-bold">Your cart is empty and sad :(</h1>
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
        <div className="container my-20">
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

            <table className="table w-full text-left table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-3 font-normal">PRODUCT DETAILS</th>
                  <th className="px-4 py-3 font-normal">PRICE</th>
                  <th className="px-4 py-3 font-normal">QUANTITY</th>
                  <th className="px-4 py-3 font-normal">SHIPPING</th>
                  <th className="px-4 py-3 font-normal">SUBTOTAL</th>
                  <th className="px-4 py-3 font-normal">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-28 rounded-md"
                      />
                      <div className="ml-4">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-500">Color: {item.color}</p>
                        <p className="text-gray-500">Size: {item.size}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2 font-semibold">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
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
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-12 bg-gray-200 hover:bg-gray-300 text-center px-2 py-1 focus:bg-gray-300"
                        />
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-r-md"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="shipping px-4 py-2">
                      {item.price > 100 ? "FREE" : "$5.00"}
                    </td>
                    <td className="px-4 py-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      <Trash2
                        className="Trash2 cursor-pointer"
                        onClick={() => handleRemoveItem(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center container bg-gray-100 mt-8 rounded-lg">
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
                    className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter coupon code"
                  />
                  <button
                    onClick={handleCouponApply}
                    type="submit"
                    className="rounded-md px-3.5 py-1.5 font-semibold leading-7 mainButtonCSS"
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
                    onClick={handleCouponApply}
                    to="/"
                    className="bg-gray-100 border-2 border-gray-300 rounded-md px-3.5 py-1.5 font-medium leading-7"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
              <div className="PriceCart py-8 flex justify-between">
                <div>
                  <div className="flex justify-between items-center py-2 rounded-md">
                    <p className="text-gray-600">Sub Total</p>
                    <p className="font-bold">
                      ${calculateSubtotal().toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center py-2 rounded-md mt-2">
                    <p className="text-gray-600">Shipping</p>
                    <p className="font-bold">
                      ${calculateShipping().toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center py-2 rounded-md mt-2">
                    <p className="text-gray-600 font-bold">Grand Total</p>
                    <p className="font-bold">
                      ${calculateGrandTotal().toFixed(2)}
                    </p>
                  </div>
                  <hr />
                  <button className="px-4 py-2 rounded mt-4 w-full mainButtonCSS">
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
