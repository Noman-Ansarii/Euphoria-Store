import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToastContext } from "../context/ToastContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Ensure correct import statement
import { useWishlist } from "../context/WishlistContext"; // Import useWishlist hook
import { useCartlist } from "@/context/CartListContext";

const LatestItems = () => {
  const HOST = import.meta.env.VITE_BACKEND_HOST;
  const navigate = useNavigate();
  const [sliderProducts, setSliderProducts] = useState([]);
  const showToast = useToastContext();
  const { addToWishlist, removeFromWishlist } = useWishlist(); // Use useWishlist hook to access wishlist functions
  const { addToCart, removeFromCartlist } = useCartlist(); // Use useWishlist hook to access wishlist functions

  useEffect(() => {
    const fetchSliderProducts = async () => {
      try {
        const response = await axios.get(
          `${HOST}/api/v2/product/sliderProduct`
        );
        setSliderProducts(response.data);
      } catch (error) {
        console.error("Error fetching slider products", error);
      }
    };

    fetchSliderProducts();
  }, [HOST]);

  const handleCheckboxChange = (e, item) => {
    if (e.target.checked) {
      addToWishlist(item); // Call addToWishlist from context
    } else {
      removeFromWishlist(item._id); // Call removeFromWishlist from context
    }
  };
  const handleAddtoCartandRemove = (e, item) => {
    if (e.target.checked) {
      addToCart(item); // Call addToWishlist from context
    } else {
      removeFromCartlist(item._id); // Call removeFromWishlist from context
    }
  };

  return (
    <div className="container">
      <div className="heading flex my-10">
        <span className="line rounded-xl mr-3"></span>
        <h1 className="text-5xl font-bold">New Arrival</h1>
      </div>
      <div className="container">
        {sliderProducts.length > 0 && (
          <Carousel
            opts={{
              align: "start",
              loop: true,
              autoplay: true,
              autoplayInterval: 3000,
            }}
            className="w-full"
          >
            <CarouselContent>
              {sliderProducts.map((item) => (
                <CarouselItem
                  key={item._id}
                  className="sm:basis-1/2 lg:basis-1/4 flex justify-center items-center"
                >
                  <div className="featured__item">
                    <div className="featured__item__pic set-bg rounded-2xl">
                      <img
                        src={item.imageSrc}
                        className="h-[300px] sm:h-[412px] lg:h-[266px] xl:h-[326px] 2xl:h-[412px] w-[300px] sm:w-[412px] lg:w-[266px] xl:w-[326px] 2xl:w-[412px] select-none object-cover"
                        alt={item.description}
                      />
                      <ul className="featured__item__pic__hover flex flex-col justify-center items-center space-y-5 cursor-pointer">
                        <li>
                          <a className="buttonU">
                            <span className="spanU">${item.Price}</span>
                          </a>
                        </li>
                        <li>
                          <label
                            className="theme-switch"
                            htmlFor={`checkbox addToCart-${item._id}`}
                            id="themeswitch"
                          >
                            <input
                              type="checkbox"
                              id={`checkbox addToCart-${item._id}`}
                              className="hidden"
                              onChange={(e) =>
                                handleAddtoCartandRemove(e, item)
                              }
                            />
                            <div className="slider round"></div>
                            <span className="flex name mx-3 my-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-shopping-cart mx-2"
                              >
                                <circle cx="8" cy="21" r="1" />
                                <circle cx="19" cy="21" r="1" />
                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                              </svg>
                            </span>
                            <div className="back"></div>
                          </label>
                        </li>
                        <li>
                          <label className="containerLast">
                            <input
                              type="checkbox"
                              onChange={(e) => handleCheckboxChange(e, item)}
                            />
                            <div className="checkmark">
                              <svg viewBox="0 0 256 256">
                                <rect
                                  fill="none"
                                  height="256"
                                  width="256"
                                ></rect>
                                <path
                                  d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                                  strokeWidth="20px"
                                  stroke="#FFF"
                                  fill="none"
                                ></path>
                              </svg>
                            </div>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext>
              <button className="hover:bg-gray-300 rounded-full p-2 shadow-xl">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  ></path>
                </svg>
              </button>
            </CarouselNext>
            <CarouselPrevious>
              <button className="hover:bg-gray-300 rounded-full p-2 shadow-xl">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5l-7.5-7.5 7.5-7.5"
                  ></path>
                </svg>
              </button>
            </CarouselPrevious>
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default LatestItems;
