import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useToastContext } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const CartListContext = createContext();

export const useCartlist = () => {
  return useContext(CartListContext);
};

export const CartListProvider = ({ children }) => {
  const HOST = import.meta.env.VITE_BACKEND_HOST;
  const navigate = useNavigate();
  const showToast = useToastContext();
  const [cartlistItems, setCartlistItems] = useState([]);

  // Function to add an item to the cartlist
  const addToCart = async (item) => {
    const token = localStorage.getItem("AuthenticationToken");
    if (!token) {
      showToast({
        title: "Please login to your account",
        position: "bottom-right",
      });
      navigate("/login");
      return;
    }

    // Check if the item already exists in the cartlist
    const existingItem = cartlistItems.find(
      (cartItem) => cartItem._id === item._id
    );
    if (existingItem) {
      showToast({
        title: "Item already exists in cart",
        position: "bottom-right",
        colorScheme: "yellow",
      });
      return;
    }

    const { _id, description, Price, imageSrc } = item;
    if (!_id || !description || !Price || !imageSrc) {
      console.error("Missing fields in the item object", {
        _id,
        description,
        Price,
        imageSrc,
      });
      showToast({
        title: "Failed to add item to cart: Missing item fields",
        position: "bottom-right",
      });
      return;
    }

    // Decode token to get user ID
    let userID;
    try {
      const decodedToken = jwtDecode(token);
      userID = decodedToken.user.id; // Access user ID inside user object
      if (!userID) {
        throw new Error("userID not found in token");
      }
    } catch (error) {
      console.error("Error decoding token or userID not found", error);
      showToast({
        title: "Failed to add item to cart: Invalid token",
        position: "bottom-right",
        colorScheme: "red",
      });
      return;
    }

    try {
      // Make API request to add item to cart
      await axios.post(
        `${HOST}/api/v1/user/cartlist/${userID}`,
        {
          productId: _id,
          description,
          Price,
          image: imageSrc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showToast({
        title: "Item added to cart",
        position: "bottom-right",
        colorScheme: "green",
      });

      // Update local state to reflect the added item
      setCartlistItems([...cartlistItems, item]);
    } catch (error) {
      console.error("Error adding item to cart", error);
      showToast({
        title: "Failed to add item to cart",
        position: "bottom-right",
        colorScheme: "red",
      });
    }
  };

  // Function to remove an item from the cart
  const removeFromCartlist = async (itemId) => {
    const token = localStorage.getItem("AuthenticationToken");
    if (!token) {
      showToast({
        title: "Login Sessions End",
        position: "bottom-right",
        colorScheme: "red",
      });
      navigate("/login");
      return;
    }

    if (!itemId) {
      console.error("Missing itemId", {
        itemId,
      });
      showToast({
        title: "Failed to remove item from cartlist: Missing itemId",
        position: "bottom-right",
        colorScheme: "red",
      });
      return;
    }

    // Decode token to get user ID
    let userID;
    try {
      const decodedToken = jwtDecode(token);
      userID = decodedToken.user.id; // Access user ID inside user object
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
      // Make API request to remove item from cartlist
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

      // Update the cartlist state after removing the item
      setCartlistItems(cartlistItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error removing item from cartlist", error);
      showToast({
        title: "Failed to remove item from cartlist",
        position: "bottom-right",
        colorScheme: "red",
      });
    }
  };

  return (
    <CartListContext.Provider
      value={{
        cartlistItems,
        addToCart,
        removeFromCartlist,
      }}
    >
      {children}
    </CartListContext.Provider>
  );
};

export default CartListContext;
