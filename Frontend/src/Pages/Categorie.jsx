import React, { useState, useEffect } from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";
import { useWishlist } from "@/context/WishlistContext";

function Categorie() {
  const HOST = import.meta.env.VITE_BACKEND_HOST;

  const [menProduct, setMenProduct] = useState([]);
  const [womenProduct, setWomenProduct] = useState([]);
  const { addToWishlist, removeFromWishlist } = useWishlist(); // Use useWishlist hook to access wishlist functions

  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        const response = await axios.get(`${HOST}/api/v2/product/menProducts`);
        setMenProduct(response.data);
      } catch (error) {
        console.error("Error fetching Men products", error);
      }
    };

    fetchMenProducts();
  }, []); // Empty dependency array to run once on component mount

  useEffect(() => {
    const fetchWomenProducts = async () => {
      try {
        const response = await axios.get(
          `${HOST}/api/v2/product/womenProducts`
        );
        setWomenProduct(response.data);
      } catch (error) {
        console.error("Error fetching Women products", error);
      }
    };

    fetchWomenProducts();
  }, []); // Empty dependency array to run once on component mount

  const handleCheckboxChange = (e, item) => {
    if (e.target.checked) {
      addToWishlist(item); // Call addToWishlist from context
    } else {
      removeFromWishlist(item._id); // Call removeFromWishlist from context
    }
  };

  return (
    <>
      <div className="container">
        <div className="heading flex my-20">
          <span className="line rounded-xl mr-3"></span>
          <h1 className="text-2xl sm:text-5xl font-medium">
            Categories For Men
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-28">
          {menProduct.map((cate, i) => (
            <div key={i} className="relative w-full h-[450px]">
              <img
                src={cate.imageSrc}
                className="h-full w-full rounded-lg object-cover"
              />
              <div className="absolute top-4 right-4">
                <label className="containerLastForOtherProducts">
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(e, cate)} // Pass cate instead of item
                  />
                  <div className="checkmark">
                    <svg viewBox="0 0 256 256">
                      <rect fill="none" height="256" width="256"></rect>
                      <path
                        d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                        strokeWidth="20px"
                        stroke="#FFF"
                        fill="none"
                      ></path>
                    </svg>
                  </div>
                </label>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div className="okay">
                  <h1 className="text-lg font-semibold">{cate.description}</h1>
                  <p className="text-sm text-gray-600">Explore Now!</p>
                </div>
                <Link
                  href="#"
                  className="rounded-sm px-2.5 py-1 text-2xl font-semibold text-black"
                >
                  <ArrowLongRightIcon className="h-6 w-6 text-gray-500" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mt-40">
        <div className="heading flex my-20">
          <span className="line rounded-xl mr-3"></span>
          <h1 className="text-2xl md:text-5xl font-medium">
            Categories For Women
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-28">
          {womenProduct.map((cate, i) => (
            <div key={i} className="relative w-full h-[450px]">
              <img
                src={cate.imageSrc}
                className="h-full w-full rounded-lg object-cover"
              />
              <div className="absolute top-4 right-4">
                <label className="containerLastForOtherProducts">
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(e, cate)} // Pass cate instead of item
                  />
                  <div className="checkmark">
                    <svg viewBox="0 0 256 256">
                      <rect fill="none" height="256" width="256"></rect>
                      <path
                        d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                        strokeWidth="20px"
                        stroke="#FFF"
                        fill="none"
                      ></path>
                    </svg>
                  </div>
                </label>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div className="okay">
                  <h1 className="text-lg font-semibold">{cate.description}</h1>
                  <p className="text-sm text-gray-600">Explore Now!</p>
                </div>
                <Link
                  href="#"
                  className="rounded-sm px-2.5 py-1 text-2xl font-semibold text-black"
                >
                  <ArrowLongRightIcon className="h-6 w-6 text-gray-500" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categorie;
