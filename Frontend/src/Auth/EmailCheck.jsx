import React from "react";
import IMG1 from "../media/authPage/ce.png";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

function EmailCheck() {
  return (
    <>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t-2">
          <div className="h-full w-full">
            <img
              className="mx-auto h-full w-full object-cover"
              src={IMG1}
              alt=""
            />
          </div>
          <div className="w-full h-full">
            <div className="CheckEmail mx-24 xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl pt-16 pb-10">
                Check Email
              </h2>
              <p className="w-full h-full">Please check your email inbox and click on the provided link to reset your
              password . If you don’t receive email, <Link to="/resend" className="resend font-semibold">Click here to resend</Link></p>
              <h6 className="flex items-center pt-8"><ChevronLeft />Back to&nbsp;<Link to="/login" className="underline">Login</Link></h6>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EmailCheck;
