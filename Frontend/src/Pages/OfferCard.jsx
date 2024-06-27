import React from "react";
import IMG1 from "../assets/1.jpg";
import IMG2 from "../assets/2.jpg";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

function OfferCard() {
  return (
    <>
      <Box className="container text-white">
        <div className="flex lg:flex-row flex-col justify-center items-center py-20">
          <div className="card1 relative">
            <img src={IMG2} alt="" className="rounded-xl" />
            <div className="texts absolute top-8 xsm:top-16 lg:top-10 xl:top-20 left-8 xsm:left-12">
              <p className="OfferPColor font-semibold text-sm xsm:text-lg">Low Price</p>
              <h1 className="text-xl xsm:text-3xl font-bold py-3">
                High Coziness
              </h1>
              <p className="OfferPColor font-normal pb-1 xsm:pb-5 lg:pb-10">UPTO 50% OFF</p>

              <Link href="/" className="underline font-semibold">
                Explore Items
              </Link>
            </div>
          </div>
          <div className="card2 relative">
            <img src={IMG1} alt="" className="rounded-xl" />
            <div className="texts absolute top-8 xsm:top-16 lg:top-10 xl:top-20 left-8 xsm:left-12">
              <p className="OfferPColor font-semibold text-sm xsm:text-lg">
                Beyoung Presents
              </p>
              <h1 className="text-xl xsm:text-3xl font-bold py-1 xsm:py-3">
                Breezy Summer
                <br /> Style
              </h1>
              <p className="OfferPColor font-normal pb-1 xsm:pb-5 lg:pb-10">UPTO 50% OFF</p>

              <Link href="/" className="underline font-semibold">
                Explore Items
              </Link>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default OfferCard;
