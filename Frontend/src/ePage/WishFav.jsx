import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const WishFav = () => {
  const HOST = import.meta.env.VITE_BACKEND_HOST; // Assuming you have Vite configured for environment variables
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${HOST}/api/v1/user/favorites`);
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="container my-20">
      {favorites.length === 0 ? (
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
        <div className="wishlist-items grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {favorites.map((item, index) => (
            <div key={index} className="wishlist-item">
              <div className="wishlist-item__pic set-bg">
                <img
                  src={item.src}
                  className="h-full w-full select-none"
                  alt={item.description}
                />
              </div>
              <div className="wishlist-item__details p-4">
                <h2 className="text-xl font-bold">{item.description}</h2>
                <p className="text-lg">{item.price}</p>
                <Link to="/" className="btn btn-primary mt-4">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishFav;
