import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="CartEmptyContainer py-20">
        <div className="container flex flex-col justify-center items-center">
          <div className="imgEmptyCart">
            <img
              src="https://res.cloudinary.com/dvo26dhuq/image/upload/v1719987868/Frame_453_oneowu.png"
              alt="Empty Cart"
              className="mt-20 mb-10"
            />
          </div>
          <div className="EmptyCartText text-center">
            <h1 className="text-4xl font-bold">
            Oops! Page not found
            </h1>
            <p className="mt-2">The page you are looking for might have been removed or
            temporarily unavailable.</p>
            <Link
              to="/"
              className="inline-block mt-5 rounded-md px-12 py-2 font-semibold leading-7 mainButtonCSS"
            >
              Back to HomePage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
