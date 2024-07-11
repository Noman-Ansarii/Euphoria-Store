import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import IMG1 from "../media/authPage/rp.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword(props) {
  const HOST = import.meta.env.VITE_BACKEND_HOST; // Assuming you're using Vite for environment variables
  const navigate = useNavigate();
  const { userId, token } = useParams(); // Extract userId and token from URL parameters

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const togglePasswordVisibility2 = () => {
    setPasswordVisible2((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "cpassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrorMessage("Passwords don't match");
    }
    try {
      const response = await axios.post(
        `${HOST}/api/v1/user/reset/${userId}/${token}`,
        { newPassword: password }
      );
      if (response.data.success) {
        props.PopUpAlert("Password Reset successfully", "success");
        navigate("/login");
      } else {
        props.PopUpAlert(
          "Failed to reset password. Please try again.",
          "Error",
          response.data.msg
        );
      }
    } catch (error) {
      props.PopUpAlert(
        error.response?.data?.msg ||
          "Failed to reset password. Please try again.",
        "Error"
      );
    }
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
              Reset Password
            </h2>
            <form onSubmit={handleSubmit} className="mt-8 select-none">
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      Password
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
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="cpassword"
                      className="text-base font-medium text-gray-900"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="flex mt-2">
                    <input
                      required
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type={passwordVisible ? "text" : "password"}
                      name="cpassword"
                      placeholder="Password"
                      id="cpassword"
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
                </div>
                <div className="relative h-2">
                  {errorMessage && (
                    <div className="absolute -mt-3 w-full text-red-500 transition-opacity duration-300 opacity-100">
                      {errorMessage}
                    </div>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 mainButtonCSS"
                  >
                    Reset Password <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
