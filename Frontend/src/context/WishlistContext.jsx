import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useToastContext } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Make sure you have the correct import statement

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const HOST = import.meta.env.VITE_BACKEND_HOST;
  const navigate = useNavigate();
  const showToast = useToastContext();
  const [wishlistItems, setWishlistItems] = useState([]);

  // Function to add an item to the wishlist
  const addToWishlist = async (item) => {
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
     const existingItem = wishlistItems.find(
      (wishItem) => wishItem._id === item._id
    );
    if (existingItem) {
      showToast({
        title: "Item already exists in WishList",
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
        title: "Failed to add item to wishlist: Missing item fields",
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
        title: "Failed to add item to wishlist: Invalid token",
        position: "bottom-right",
        colorScheme: "red",
      });
      return;
    }

    try {
      // Make API request to add item to wishlist
      await axios.post(
        `${HOST}/api/v1/user/wishlist/${userID}`,
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
        title: "Item added to wishlist",
        position: "bottom-right",
        colorScheme: "green",
      });

      // Update local state to reflect the added item
      setWishlistItems([...wishlistItems, item]);
    } catch (error) {
      console.error("Error adding item to wishlist", error);
      showToast({
        title: "Failed to add item to wishlist",
        position: "bottom-right",
        colorScheme: "red",
      });
    }
  };

  // Function to remove an item from the wishlist
  const removeFromWishlist = async (itemId) => {
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
        title: "Failed to remove item from wishlist: Missing itemId",
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
        title: "Failed to remove item from wishlist: Invalid token",
        position: "bottom-right",
        colorScheme: "red",
      });
      return;
    }

    try {
      // Make API request to remove item from wishlist
      await axios.delete(`${HOST}/api/v1/user/wishlist/${userID}/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showToast({
        title: "Item removed from wishlist",
        position: "bottom-right",
        colorScheme: "red",
      });

      // Update the wishlist state after removing the item
      setWishlistItems(wishlistItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error removing item from wishlist", error);
      showToast({
        title: "Failed to remove item from wishlist",
        position: "bottom-right",
        colorScheme: "red",
      });
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;