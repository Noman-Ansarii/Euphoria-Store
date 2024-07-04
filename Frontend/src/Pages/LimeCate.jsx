import { useWishlist } from "@/context/WishlistContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LimeCate() {
  const HOST = import.meta.env.VITE_BACKEND_HOST;

  const [limeCartProduct, setLimeCartProduct] = useState([]);
  const { addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchLimeCartProducts = async () => {
      try {
        const response = await axios.get(`${HOST}/api/v2/product/limeCart`);
        setLimeCartProduct(response.data);
      } catch (error) {
        console.error("Error fetching Men products", error);
      }
    };

    fetchLimeCartProducts();
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
          <h1 className="text-2xl sm:text-5xl font-medium">In The Limelight</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {limeCartProduct.map((cate, i) => (
            <div
              key={i}
              className="w-full h-full bg-white rounded-lg shadow-md"
            >
              <div className="relative">
                <img
                  src={cate.imageSrc}
                  className="h-96 w-full rounded-t-lg object-cover"
                />
                <div className="absolute top-4 right-4">
                  <label className="containerLastForOtherProducts">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(e, cate)}
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
              </div>
              <div className="p-4 flex justify-between items-center">
                <div className="okay">
                  <h1 className="text-sm md:text-base font-semibold">
                    {cate.description}
                  </h1>
                  <p className="text-sm text-gray-600">{cate.about}</p>
                </div>
                <Link
                  to="/"
                  className="Price rounded-lg px-2.5 py-1 text-base font-semibold"
                >
                  ${cate.Price}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default LimeCate;
