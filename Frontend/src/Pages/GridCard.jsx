import React from "react";
import IMG1 from "../assets/GRID/1.png";
import IMG2 from "../assets/GRID/2.png";
import IMG3 from "../assets/GRID/3.png";
import IMG4 from "../assets/GRID/4.png";
import IMG5 from "../assets/GRID/5.png";
import SPC1 from "../assets/Offer/sp1.png";
import SPC2 from "../assets/Offer/sp2.png";
import { Link } from "react-router-dom";

function GridCard() {
  return (
    <>
      <div className="container GridCard">
        <div className="heading flex my-10">
          <span className="line rounded-xl mr-3"></span>
          <h1 className="text-2xl sm:text-4xl font-bold">Big Saving Zone</h1>
        </div>
        <div className="gridcontainer grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="relative h-full w-full rounded">
            <img
              src={IMG1}
              alt="AirMax Pro"
              className="z-0 h-full w-full rounded-md object-cover"
            />
            <div className="absolute top-4 sm:top-20 lg:top-7 left-4 w-1/2">
              <h1 className="text-2xl sm:text-7xl lg:text-2xl font-semibold">
                Hawaiian Shirts
              </h1>
              <p className="mt-2 text-sm py-3">Dress up in summer vibe</p>
              <h6 className="text-sm sm:text-lg font-bold sm:py-6 lg:py-2">
                UPTO 50% OFF
              </h6>

              <Link className="GridButton cursor-pointer items-center text-xs sm:text-sm font-semibold border-2 py-1 px-2">
                SHOP NOW &rarr;
              </Link>
            </div>
          </div>
          <div className="relative h-full w-full rounded-md">
            <img
              src={IMG2}
              alt="AirMax Pro"
              className="z-0 h-full w-full rounded-md object-cover"
            />
            <div className="absolute top-4 sm:top-20 sm:w-1/2 lg:w-2/5 lg:top-7 right-2 float-right">
              <h1 className="text-2xl sm:text-7xl lg:text-2xl font-semibold">
                Printed T-Shirt
              </h1>
              <p className="mt-2 text-sm py-3">New Designs Every Week</p>
              <h6 className="text-sm sm:text-lg font-bold sm:py-6   ">
                UPTO 40% OFF
              </h6>

              <Link className="GridButton cursor-pointer items-center text-xs sm:text-sm font-semibold border-2 py-1 px-2">
                SHOP NOW &rarr;
              </Link>
            </div>
          </div>
          <div className="relative h-full w-full rounded-md">
            <img
              src={IMG3}
              alt="AirMax Pro"
              className="z-0 h-full w-full rounded-md object-cover"
            />
            <div className="absolute top-4 sm:top-20 lg:top-7 right-2">
              <h1 className="text-xl sm:text-7xl lg:text-2xl font-semibold py-1 sm:py-4">
                Cargo Joggers
              </h1>
              <p className="mt-1 text-sm sm:text-lg sm:py-1">
                Move with style & comfort
              </p>
              <h6 className="text-sm sm:text-lg font-bold sm:py-6">
                UPTO 50% OFF
              </h6>

              <Link className="GridButton cursor-pointer items-center text-xs sm:text-sm font-semibold border-2 py-1 px-2">
                SHOP NOW &rarr;
              </Link>
            </div>
          </div>
        </div>
        <div className="gridcontainer grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
          <div className="relative h-full w-full rounded">
            <img
              src={IMG4}
              alt="AirMax Pro"
              className="z-0 h-full w-full rounded-md object-cover"
            />
            <div className="absolute top-4 sm:top-10 right-4">
              <h1 className="text-xl sm:text-7xl lg:text-5xl font-semibold py-1 sm:py-4">
                Urban Shirts
              </h1>
              <p className="mt-1 text-sm sm:text-lg sm:py-1">Live In Confort</p>
              <h6 className="text-sm sm:text-lg font-bold sm:py-6">
                UPTO 60% OFF
              </h6>

              <Link className="GridButton cursor-pointer items-center text-xs sm:text-sm font-semibold border-2 py-1 px-2">
                SHOP NOW &rarr;
              </Link>
            </div>
          </div>
          <div className="relative h-full w-full rounded-md">
            <img
              src={IMG5}
              alt="AirMax Pro"
              className="z-0 h-full w-full rounded-md object-cover"
            />
            <div className="absolute top-2 sm:top-10 right-6 sm:right-4">
              <h1 className="text-xl sm:text-7xl lg:text-5xl font-semibold py-1 sm:py-4">
                Oversized
                <br />
                T-Shirts
              </h1>
              <p className="mt-1 text-sm sm:text-lg sm:py-1">
                Street Style Icon
              </p>
              <h6 className="text-sm sm:text-lg font-bold sm:py-4">
                UPTO 60% OFF
              </h6>

              <Link className="GridButton cursor-pointer items-center text-xs sm:text-sm font-semibold border-2 py-1 px-2">
                SHOP NOW &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="shopPieceContainer my-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full h-auto md:h-[550px]">
            <div className="SPC1 relative">
              <img src={SPC1} className="w-full h-full" alt="" />
              <div className="decofcard card-img-overlay top-10 lg:top-20 left-3 md:left-16">
                <h1 className="text-base md:text-xl lg:text-3xl font-bold py-3 lg:py-10">
                  WE MADE YOUR EVERYDAY FASHION BETTER!
                </h1>
                <p className="text-white font-light text-xs md:text-sm pb-1 lg:pb-5 lg:w-3/5">
                  In our journey to improve everyday fashion, euphoria presents
                  EVERYDAY wear range - Comfortable & Affordable fashion 24/7
                </p>
                <Link to="/" className="Mainbutton mt-2 py-2 px-4 font-bold">
                <span className="Mainspan">Shop Now</span>
              </Link>
              </div>
            </div>
            <div className="SPC1">
              <img src={SPC2} className="w-full h-full" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GridCard;
