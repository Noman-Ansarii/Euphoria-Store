import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import IMG1 from "../media/authPage/1.png";
import IMG2 from "../media/authPage/twitter.png";
import IMG3 from "../media/authPage/Google.png";
import { Checkbox } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpOne(props) {
  // Fetch the signup backend to frontend through Axios

  const HOST = import.meta.env.VITE_BACKEND_HOST;

  const navigate = useNavigate();
  const [ErrorFetcher, setErrorFetcher] = useState("");
  const [backendErrorFetcher, setBackendErrorFetcher] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setErrorFetcher("");
    setBackendErrorFetcher("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = credentials;

    if (password !== confirmPassword) {
      setErrorFetcher("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${HOST}/api/v1/user/signup`, {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        props.PopUpAlert("Account created successfully", "success");
        navigate("/login");
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
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2((prevState) => !prevState);
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
              Sign up
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
            <form onSubmit={handleSubmit} className="mt-8 select-none">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="username"
                    className="text-base font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2 relative">
                    <input
                      required
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      name="username"
                      placeholder="Username"
                      id="username"
                      onChange={handleChange}
                      autoComplete="username"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
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
                      placeholder="user@example.com"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      autoComplete="email"
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                  <div className="flex mt-2">
                    <input
                      required
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type={passwordVisible2 ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      id="password"
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                    {passwordVisible2 ? (
                      <EyeOff
                        className="mt-2 -ml-7 hover:cursor-pointer"
                        onClick={togglePasswordVisibility2}
                      />
                    ) : (
                      <Eye
                        className="mt-2 -ml-7 hover:cursor-pointer"
                        onClick={togglePasswordVisibility2}
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirmPassword"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Confirm Password{" "}
                  </label>
                </div>
                <div className="flex mt-2">
                  <input
                    required
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type={passwordVisible ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Password"
                    id="confirmPassword"
                    onChange={handleChange}
                    autoComplete="new-password"
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
                <div className="relative h-2">
                  {(ErrorFetcher || backendErrorFetcher) && (
                    <div className="absolute -mt-3 w-full text-red-500 text-sm font-medium transition-opacity duration-300 opacity-100">
                      {ErrorFetcher || backendErrorFetcher}
                    </div>
                  )}
                </div>
                <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="marketing_accept"
                      className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                    />

                    <span className="text-sm text-gray-700">
                      <p className="text-sm">
                        By creating an account, you agree to our
                        <Link to="#" className="underline">
                          {" "}
                          terms and conditions{" "}
                        </Link>
                        and &nbsp;
                        <Link to="#" className="underline">
                          privacy policy
                        </Link>
                        .
                      </p>
                    </span>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 mainButtonCSS"
                  >
                    Create Account <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <img src={IMG3} alt="" className="h-6 w-6" />
                </span>
                Sign up with Google
              </button>
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <img src={IMG2} alt="" className="h-6 w-6" />
                </span>
                Sign up with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpOne;
