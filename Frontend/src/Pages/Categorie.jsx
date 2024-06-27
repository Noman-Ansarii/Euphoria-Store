import React from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

import Shirt1 from "../media/MenCate/1.png";
import Shirt2 from "../media/MenCate/2.png";
import Shirt3 from "../media/MenCate/3.png";
import Shirt4 from "../media/MenCate/4.png";
import Shirt5 from "../media/MenCate/5.png";
import Shirt6 from "../media/MenCate/6.png";
import Shirt7 from "../media/MenCate/7.png";
import Shirt8 from "../media/MenCate/8.png";

import women1 from "../media/WomenCate/1.png";
import women2 from "../media/WomenCate/2.png";
import women3 from "../media/WomenCate/3.png";
import women4 from "../media/WomenCate/4.png";
import { Link } from "react-router-dom";

const men = [
  { src: Shirt1, description: "Shirts" },
  { src: Shirt2, description: "Hoodies & Sweetshirt" },
  { src: Shirt3, description: "Printed T-Shirts" },
  { src: Shirt4, description: "Jeans" },
  { src: Shirt5, description: "Activewear" },
  { src: Shirt6, description: "Boxers" },
  { src: Shirt7, description: "Polo T-Shirt" },
  { src: Shirt8, description: "Plain T-Shirt" },
];

const women = [
  { src: women1, description: "Boxers" },
  { src: women2, description: "Hoodies & Sweetshirt" },
  { src: women3, description: "Coats & Parkas" },
  { src: women4, description: "Tees & T-Shirt" },
];

function Categorie() {
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
          {men.map((cate, i) => (
            <div key={i} className="w-full h-[450px]">
              <img
                src={cate.src}
                className="h-full w-full rounded-lg object-cover"
              />
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
          {women.map((cate, i) => (
            <div key={i} className="w-full h-[450px]">
              <img
                src={cate.src}
                className="h-full w-full rounded-lg object-cover"
              />
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
