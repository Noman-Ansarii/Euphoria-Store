import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import IMG1 from "../media/authPage/2.png";
import IMG2 from "../media/authPage/twitter.png";
import IMG3 from "../media/authPage/Google.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn(props) {
  // Login

  const HOST = import.meta.env.VITE_BACKEND_HOST;
  const [backendErrorFetcher, setBackendErrorFetcher] = useState("");

  const navigate = useNavigate();
  const [credientails, setCredientails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredientails({
      ...credientails,
      [e.target.name]: e.target.value,
    });
    setBackendErrorFetcher("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credientails;

    try {
      const response = await axios.post(`${HOST}/api/v1/user/login`, {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("AuthenticationToken", response.data.authToken);
        // localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
        props.PopUpAlert("Login successful", "success");
      }
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setBackendErrorFetcher(error.response.data.message);
      } else {
        props.PopUpAlert("SignUp failed", "error");
      }
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
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
              Sign in
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                title=""
                className="font-semibold text-black transition-all duration-200 underline"
              >
                Create a account
              </Link>
            </p>
            <form onSubmit={handleSubmit} className="mt-8">
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
                      placeholder="user@example.com"
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                    <Link
                      to="/f0rg3tp455"
                      title=""
                      className="text-sm font-semibold text-black hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="flex mt-2">
                    <input
                      required
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      id="password"
                      autoComplete="new-password"
                      onChange={handleChange}
                    />
                    {passwordVisible ? (
                      <EyeOff
                        className="mt-2 -ml-7 hover:cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <Eye
                        className="mt-2 -ml-7 hover:cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                  </div>
                  <div className="relative h-2">
                    {backendErrorFetcher && (
                      <div className="absolute -mt-3 w-full text-red-500 text-sm font-medium transition-opacity duration-300 opacity-100">
                        {backendErrorFetcher}
                      </div>
                    )}
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
            <div className="mt-3 space-y-3">
              <button
                type="submit"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <img src={IMG2} className="w-6 h6" alt="" />
                </span>
                Sign in with Google
              </button>
              <button
                type="submit"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <img src={IMG3} className="w-6 h6" alt="" />
                </span>
                Sign in with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
