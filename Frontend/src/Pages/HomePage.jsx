import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import IMG from "../assets/shop-hero-1-product-slide-1.jpg";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative text-white">
            <div className="image h-[85vh]">
              <img
                src={IMG}
                alt="image 1"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="texts absolute left-16 top-56 xsm:top-40 xsm:left-28 md:left-36">
              <h6 className="text-xl xsm:text-2xl md:text-3xl font-medium py-8 xsm:py-12">
                T-Shirt / Tops
              </h6>
              <h1 className="text-4xl xsm:text-5xl md:text-7xl font-black">
                Summer <br /> Value Pack
              </h1>
              <h6 className="text-xl xsm:text-2xl md:text-3xl font-medium py-8 xsm:py-12">
                cool / colorful / comfy
              </h6>

              <Link to="/" className="Mainbutton px-8 py-3 font-bold">
                <span className="Mainspan">Shop Now</span>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative text-white">
            <div className="image h-[85vh]">
              <img
                src={IMG}
                alt="image 1"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="texts absolute left-16 top-56 xsm:top-40 xsm:left-28 md:left-36">
              <h6 className="text-xl xsm:text-2xl md:text-3xl font-medium py-8 xsm:py-12">
                T-Shirt / Tops
              </h6>
              <h1 className="text-4xl xsm:text-5xl md:text-7xl font-black">
                Summer <br /> Value Pack
              </h1>
              <h6 className="text-xl xsm:text-2xl md:text-3xl font-medium py-8 xsm:py-12">
                cool / colorful / comfy
              </h6>

              <Link to="/" className="Mainbutton px-8 py-3 font-bold">
                <span className="Mainspan">Shop Now</span>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default HomePage;
