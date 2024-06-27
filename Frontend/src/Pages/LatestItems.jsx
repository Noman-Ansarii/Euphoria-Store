import React from "react";
import axios from "axios";
import { useToastContext } from "../context/ToastContext"; // Correct import path
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";

// Import your images
import IMG2 from "../assets/Slider/1.png";
import IMG1 from "../assets/Slider/2.png";
import IMG3 from "../assets/Slider/3.png";
import IMG4 from "../assets/Slider/4.png";
import IMG5 from "../assets/Slider/1.png";
import IMG6 from "../assets/Slider/2.png";
import IMG7 from "../assets/Slider/3.png";
import IMG8 from "../assets/Slider/4.png";

const images = [
  { image: IMG1, description: "Knitted Joggers", Price: "19.99$" },
  { image: IMG2, description: "Full Sleeve", Price: "29.99$" },
  { image: IMG3, description: "Active T-Shirts", Price: "39.99$" },
  { image: IMG4, description: "Urban Shirts", Price: "49.99$" },
  { image: IMG5, description: "Knitted Joggers", Price: "59.99$" },
  { image: IMG6, description: "Full Sleeve", Price: "69.99$" },
  { image: IMG7, description: "Active T-Shirts", Price: "79.99$" },
  { image: IMG8, description: "Urban Shirts", Price: "89.99$" },
];

const LatestItems = () => {
  const HOST = import.meta.env.VITE_BACKEND_HOST;
  const navigate = useNavigate();
  const showToast = useToastContext(); // Use the useToastContext hook

  const addToWishlist = async (item) => {
    const token = localStorage.getItem("AuthenticationToken");
    if (!token) {
      showToast({
        title: "Please Login your account",
        position: "bottom-right", // Correct position spelling
      });
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `${HOST}/api/v1/user/wishlist`,
        {
          productId,
          description: item.description,
          price: item.Price,
          image: item.image,
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
      });
    } catch (error) {
      console.error("Error adding item to wishlist", error);
    }
  };

  const handleCheckboxChange = (e, item) => {
    if (e.target.checked) {
      addToWishlist(item);
    }
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("AuthenticationToken");
    if (!token) {
      showToast({
        title: "Please Login your account",
        position: "bottom-right", // Correct position spelling
      });
      navigate("/login");
      return;
    }
  };

  return (
    <div className="container">
      <div className="heading flex my-10">
        <span className="line rounded-xl mr-3"></span>
        <h1 className="text-5xl font-bold">New Arrival</h1>
      </div>
      <div className="container">
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
            {images.map((img, index) => (
              <CarouselItem key={index} className="xsm:basis-1/2 lg:basis-1/3">
                <div className="featured__item">
                  <div className="featured__item__pic set-bg">
                    <img
                      image={img.image}
                      className="h-full w-full select-none"
                      alt={img.description}
                    />
                    <ul className="featured__item__pic__hover flex flex-col justify-center items-center space-y-5 cursor-pointer">
                      <li>
                        <a className="buttonU">
                          <span className="spanU">{img.Price}</span>
                        </a>
                      </li>
                      <li>
                        <div className="CartBtn" onClick={handleAddToCart}>
                          <span className="IconContainer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 576 512"
                              fill="rgb(17, 17, 17)"
                              className="cart"
                            >
                              <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                            </svg>
                          </span>
                          <p className="text">Add to Cart</p>
                        </div>
                      </li>
                      <li>
                        <label className="containerLast ">
                          <input
                            type="checkbox"
                            onChange={(e) => handleCheckboxChange(e, img)}
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
      </div>
    </div>
  );
};

export default LatestItems;
