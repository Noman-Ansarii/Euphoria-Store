import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import EUP from "../assets/Euphoria.png";
import { Link, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Shop", href: "#", current: true },
  { name: "Men", href: "#", current: false },
  { name: "Women", href: "#", current: false },
  { name: "Combos", href: "#", current: false },
  { name: "Joggers", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar(props) {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("AuthenticationToken");
    navigate("/");
    props.PopUpAlert("Signout Successfully", "success");
  };

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="lg:hidden">
                <DisclosureButton className="relative rounded-md p-2 text-black hover:bg-[#f6f6f6] hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#f6f6f6]">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div>
                <Link to="/">
                  <img className="h-8 w-auto" src={EUP} alt="Your Company" />
                </Link>
              </div>
              <div className="hidden sm:ml-6 lg:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "text-[#3C4242] font-bold"
                          : "text-[#807D7E] hover:text-[#3C4242] font-normal",
                        "rounded-md px-3 py-2 text-base"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="w-64 hidden lg:block">
                <div className="group">
                  <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                    <g>
                      <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                  </svg>
                  <input placeholder="Search" type="search" className="input" />
                </div>
              </div>
              {localStorage.getItem("AuthenticationToken") ? (
                <>
                  <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div className="Shop-ICONS flex space-x-4">
                      <Link to="/w15h715t">
                        <HeartIcon className="icons h-8 w-8 sm:h-10 sm:w-10 p-2 rounded-lg cursor-pointer text-gray-500" />
                      </Link>
                      <Link to="/c4r7">
                      <ShoppingCartIcon className="icons h-8 w-8 sm:h-10 sm:w-10 p-2 rounded-lg cursor-pointer text-gray-500" />
                      </Link>
                    </div>
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 ring-white focus:ring-offset-2 focus:ring-offset-[807D7E]">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <div className="Shop-ICONS">
                            <UserIcon className="icons h-8 w-8 sm:h-10 sm:w-10 p-2 rounded-lg cursor-pointer text-gray-500" />
                          </div>
                        </MenuButton>
                      </div>
                      <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                to="/pr0f1l3"
                                className={classNames(
                                  focus ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                to="/settings"
                                className={classNames(
                                  focus ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Settings
                              </Link>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                className={classNames(
                                  focus ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                                onClick={() => {
                                  handleSignout();
                                }}
                              >
                                Sign out
                              </Link>
                            )}
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex space-x-3">
                    <Link
                      to="/login"
                      className="mainButtonCSS rounded-lg px-3 py-2 text-sm"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="mainButtonCSS rounded-lg px-3 py-2 text-sm"
                    >
                      Sign Up
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          <DisclosurePanel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "text-[#3C4242] font-bold"
                      : "text-[#807D7E] hover:text-[#3C4242] font-normal",
                    "block rounded-md px-3 py-2 text-base"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="w-full p-3 lg:hidden block">
              <div className="group w-full">
                <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                  <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                  </g>
                </svg>
                <input placeholder="Search" type="search" className="input" />
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
