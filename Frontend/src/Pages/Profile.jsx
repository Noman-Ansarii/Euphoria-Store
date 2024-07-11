import { Fragment, useRef, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import profile from "../media/authPage/1.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Corrected import statement
import { Edit, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "@/MyComponents/Loader";

function Profile({ Alerts, setLoading }) {
  const HOST = import.meta.env.VITE_BACKEND_HOST;

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const cancelButtonRef = useRef(null);
  const cancelButtonEditRef = useRef(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // setLoading(true); // Start loading
        const Authentication = localStorage.getItem("AuthenticationToken"); // Assuming you store the token in localStorage
        if (!Authentication) {
          console.error("No AuthenticationToken found");
          //   setLoading(false); // Stop loading
          return;
        }

        // Decode token to get user ID
        const decodedToken = jwtDecode(Authentication);
        const userID = decodedToken.userID; // Adjust this according to your token structure

        const response = await axios.get(
          `${HOST}/api/v1/user/pr0f1l3/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${Authentication}`, // Use 'Authorization' header with 'Bearer ' prefix
            },
          }
        );

        setUser(response.data.user); // Use the correct path to access the user data
        setUsername(response.data.user.username); // Initialize username state
        // setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching user details", error);
        // setLoading(false); // Stop loading
      }
    };

    fetchUserDetails();
  }, [setLoading]);

  /*---------------------
    Change Username
    -----------------------*/
  //   const handleChangeUsername = async () => {
  //     try {
  //       const Authentication = localStorage.getItem("AuthenticationToken");
  //       if (!Authentication) {
  //         console.error("No token found");
  //         return;
  //       }

  //       const response = await axios.patch(
  //         `${HOST}/api/v1/user/updateUsername/${user._id}`,
  //         {
  //           username: username,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${Authentication}`,
  //           },
  //         }
  //       );
  //       if (response.data.success) {
  //         Alerts("Username updated successfully");
  //         setOpenEdit(false); // Close the edit dialog
  //       } else {
  //         Alerts(response.data.error || "Username update failed");
  //       }
  //     } catch (error) {
  //       console.error("Username update failed:", error);
  //       Alerts(error.response?.data?.message || "Username update failed");
  //     }
  //   };

  /*---------------------
  Delete User
-----------------------*/

  const handleDeleteAccount = async () => {
    try {
      const Authentication = localStorage.getItem("AuthenticationToken");
      if (!Authentication) {
        console.error("No AuthenticationToken found");
        return;
      }

      await axios.delete(`${HOST}/api/v1/user/d3l3t3/${user._id}`, {
        headers: {
          Authorization: `Bearer ${Authentication}`,
        },
      });

      // Clear token from local storage after successful deletion
      localStorage.removeItem("AuthenticationToken");
      Alerts("Account deleted successfully");
      navigate("/login");
    } catch (error) {
      Alerts("Error deleting account", error);
    }
  };

  if (!user) {
    return <Loader />; // Show spinner if user data is not yet loaded
  }

  return (
    <div className="container text-center my-28 bg-white rounded-lg drop-shadow-lg p-5">
      <img
        className="w-32 h-32 rounded-full mx-auto object-cover"
        src={profile}
        alt="Profile picture"
      />
      <label className="flex justify-center text-center mt-3 space-x-10 border-black">
        <span className="text-xl font-semibold">{user.username}</span>
        <span className="">
          <Edit onClick={() => setOpenEdit(true)} />
        </span>
      </label>
      <>
        <Transition.Root show={openEdit} as={Fragment}>
          <Dialog
            className="relative z-50"
            initialFocus={cancelButtonEditRef}
            onClose={setOpenEdit}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-2 sm:p-6 sm:pb-4">
                      <div className="flex justify-center sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10 mb-3">
                            <User
                              className="h-6 w-6 text-black"
                              aria-hidden="true"
                            />
                          </div>
                          <Dialog.Title
                            as="h1"
                            className="text-base pb-16 font-semibold leading-6 text-gray-900"
                          >
                            Change Username
                          </Dialog.Title>
                          <div className="mt-2">
                            <label className="label">
                              <span className="iconSVG">
                                <svg
                                  className="w-6 h-6 text-gray-800 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="30"
                                  height="30"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeWidth="1.25"
                                    d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                  ></path>
                                </svg>
                              </span>
                              <input
                                type="text"
                                className="input py-2"
                                autoComplete="off"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                label={user.username}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:ml-3 sm:w-auto"
                        onClick={() => {
                          setOpenEdit(false);
                          //   handleChangeUsername();
                        }}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpenEdit(false)}
                        ref={cancelButtonEditRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </>
      <br />
      <label className="text-center font-medium text-gray-600 mt-1">
        {user.email}
      </label>
      <div className="m-5 text-center">
        <legend className="text-xl font-semibold">Created At: </legend>
        <p className="text-gray-600 mt-2">
          {new Date(user.createdAt).toLocaleString()}
        </p>
      </div>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 w-full h-12 text-center rounded-md bg-purple-700 text-sm font-semibold text-white shadow-sm hover:bg-purple-900-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
      >
        Delete this account
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-2 sm:p-6 sm:pb-4">
                    <div className="flex justify-center sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 mb-3">
                          <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <Dialog.Title
                          as="h1"
                          className="text-base pb-16 font-semibold leading-6 text-gray-900"
                        >
                          Are you sure you want to delete your account?
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            All of your data will be permanently removed. This
                            action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleDeleteAccount}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default Profile;
