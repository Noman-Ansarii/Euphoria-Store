import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useToastContext } from "@/context/ToastContext";
import { jwtDecode } from "jwt-decode";
import { useCartlist } from "@/context/CartListContext";

const WishFav = () => {
  const HOST = import.meta.env.VITE_BACKEND_HOST;
  const [wishlistItems, setWishlistItems] = useState([]);
  const showToast = useToastContext();
  const navigate = useNavigate();
  const { addToCart } = useCartlist(); // Use useWishlist hook to access wishlist functions

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("AuthenticationToken");
      if (!token) return;

      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user.id;
        if (!userId) {
          return;
        }

        const response = await axios.get(
          `${HOST}/api/v1/user/favorites/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.wishlist) {
          setWishlistItems(response.data.wishlist);
        } else {
          console.error("Empty items array in response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching wishlist", error);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (itemId) => {
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
      console.error("Missing itemId", {
        itemId,
      });
      showToast({
        title: "Failed to remove item from wishlist: Missing itemId",
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
      setWishlistItems(
        wishlistItems.filter((item) => item.productId !== itemId)
      );
    } catch (error) {
      console.error("Error removing item from wishlist", error);
      showToast({
        title: "Failed to remove item from wishlist",
        position: "bottom-right",
        colorScheme: "red",
      });
    }
  };

  // ADDTOCART

  const handleAddtoCart = (item) => {
    const itemToAdd = {
      _id: item._id,
      description: item.description,
      Price: item.Price,
      imageSrc: item.image, // Ensure the image is correctly mapped to imageSrc
    };
    addToCart(itemToAdd); // Call addToCart from context with the correct item object
  };
  return (
    <div className="container my-20">
      {wishlistItems.length === 0 ? (
        <div className="flex justify-around">
          <div className="flex flex-col items-center">
            <span className="flex justify-center items-center h-32 w-32 bg-green-100 rounded-full my-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="72"
                height="72"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-heart text-green-600"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </span>
            <div className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold py-4">
              Your wishlist is empty.
            </div>
            <p className="pb-20">
              You don’t have any products in the wishlist yet. You will find a
              lot of interesting products on our Shop page.
            </p>
            <div>
              <Link
                to="/"
                className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 mainButtonCSS"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
            <div className="grid grid-cols-1 gap-2">
              {wishlistItems.map((item) => (
                <div key={item._id} className="bg-white rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="removeItem me-3 cursor-pointer">
                        <X onClick={() => removeFromWishlist(item.productId)} />
                      </div>
                      <img
                        src={item.image}
                        alt={item.description}
                        className="w-28 h-28 rounded-md object-cover"
                      />
                      <div className="ml-4">
                        <h2 className="text-lg font-bold">
                          {item.description}
                        </h2>
                        <p className="text-gray-500">Colour: Random</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="font-bold text-lg">${item.Price}</p>
                      <Link
                        onClick={() => handleAddtoCart(item)}
                        className="rounded-md ms-3 px-6 py-1.5 font-semibold leading-7 mainButtonCSS"
                      >
                        Add to Cart
                      </Link>
                    </div>
                  </div>
                  <hr className="mt-3" />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WishFav;
