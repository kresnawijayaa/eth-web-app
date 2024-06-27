import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Example() {
  const authState = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [navbarActive, setNavbarActive] = useState(location.pathname);

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const profilePicture = user?.profilePicture;
  const userId = user?.id;
  const userName = user?.username;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    delete authState.user;

    toast.success("Logout successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function navbarActiveChange(activePath) {
    return navbarActive === activePath
      ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
      : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white";
  }

  useEffect(() => {
    setNavbarActive(location.pathname);
  }, [location]);

  return (
    <>
      <Disclosure
        as='nav'
        className='bg-gray-800'
      >
        {({ open }) => (
          <>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <div className='flex h-16 items-center justify-between'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <Link to='/'>
                      <img
                        className='h-8 w-auto'
                        src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                        alt='Your Company'
                      />
                    </Link>
                  </div>
                  <div className='hidden sm:ml-6 sm:block'>
                    <div className='flex space-x-4'>
                      <Link
                        to='/home'
                        className={navbarActiveChange("/home")}
                      >
                        Home
                      </Link>
                      <Link
                        to='/simulator'
                        className={navbarActiveChange("/simulator")}
                      >
                        Simulator
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='flex items-center'>
                    {/* Profile dropdown */}
                    <Menu
                      as='div'
                      className='relative ml-3'
                    >
                      <div>
                        {!userString && (
                          <Link
                            to='/login'
                            className='rounded-md bg-indigo-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
                          >
                            Log In
                          </Link>
                        )}
                        <MenuButton className='relative flex rounded-full bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                          <span className='absolute -inset-1.5' />
                          <span className='sr-only'>Open user menu</span>
                          {userString && (
                            <>
                              <img
                                className='h-10 w-10 rounded-full'
                                src={profilePicture}
                                alt=''
                              />
                              <div className='px-4 my-auto'>
                                <p className='text-neutral-200 text-md font-bold'>
                                  {userName}
                                </p>
                              </div>
                            </>
                          )}
                        </MenuButton>
                      </div>
                      <Transition
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <MenuItems className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                to={`/profile/${userId}`}
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
                              <button
                                onClick={handleLogout}
                                className={classNames(
                                  focus ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                                )}
                              >
                                Log out
                              </button>
                            )}
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className='-mr-2 flex sm:hidden'>
                  {/* Mobile menu button */}
                  <DisclosureButton className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                    <span className='absolute -inset-0.5' />
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon
                        className='block h-6 w-6'
                        aria-hidden='true'
                      />
                    ) : (
                      <Bars3Icon
                        className='block h-6 w-6'
                        aria-hidden='true'
                      />
                    )}
                  </DisclosureButton>
                </div>
              </div>
            </div>

            <DisclosurePanel className='sm:hidden'>
              <div className='space-y-1 px-2 pb-3 pt-2'>
                <Link
                  to='/home'
                  className={classNames(
                    location.pathname === "/home"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  Home
                </Link>
                <Link
                  to='/simulator'
                  className={classNames(
                    location.pathname === "/simulator"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  Simulator
                </Link>
              </div>
              <div className='border-t border-gray-700 pb-3 pt-4'>
                {userString && (
                  <div className='flex items-center px-5'>
                    <div className='flex-shrink-0'>
                      <img
                        className='h-10 w-10 rounded-full'
                        src={profilePicture}
                        alt=''
                      />
                    </div>
                    <div className='ml-3'>
                      <div className='text-base font-medium text-white'>
                        {userName}
                      </div>
                    </div>
                  </div>
                )}
                <div className='space-y-1 px-2'>
                  {!userString && (
                    <Link
                      to='/login'
                      className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
                    >
                      Log In
                    </Link>
                  )}
                  {userString && (
                    <>
                      <Link
                        to={`/profile/${userId}`}
                        className='mt-3 block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
                      >
                        Your Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className='block w-full rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white text-left'
                      >
                        Log out
                      </button>
                    </>
                  )}
                </div>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
      <ToastContainer />
    </>
  );
}
