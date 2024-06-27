import React from "react";
import IMG1 from "../media/authPage/fp.png";
import { ArrowRight } from "lucide-react";

function ForgetPassword() {
  return (
    <>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-full w-full">
            <img
              className="mx-auto h-full w-full object-cover"
              src={IMG1}
              alt=""
            />
          </div>
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Enter Email!
              </h2>
              <form
                // onSubmit={handleSubmit}
                className="mt-8"
              >
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        // onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 mainButtonCSS"
                    >
                      Get started <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgetPassword;
