import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/authActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Example() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerCode, setRegisterCode] = useState("");
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.user) {
      localStorage.setItem("access_token", authState.user.access_token);
      localStorage.setItem("user", JSON.stringify(authState.user));
      toast.success("Register successfully!", {
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
        navigate("/");
      }, 1000);
    }

    if (authState.error) {
      toast.error("Login failed!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      delete authState.error;
    }
  }, [authState.user, authState.error, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(
      register({
        username,
        password,
        registerCode,
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ7",
        id_telegram: "",
        profilePicture:
          "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg?w=740&t=st=1719420510~exp=1719421110~hmac=f30426365125d90120c5c7c77db865125ccdcdfc932840436ff4eb1ee3be28f4",
      })
    );
  };

  return (
    <>
      <div className='flex min-h-screen flex-1 flex-col sm:justify-center px-6 py-12 lg:px-8 bg-gray-900'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <Link to='/'>
            <img
              className='mx-auto h-10 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
              alt='Your Company'
            />
          </Link>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white'>
            Register your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            className='space-y-6'
            action='#'
            method='POST'
            onSubmit={handleRegister}
          >
            <div>
              <label
                htmlFor='username'
                className='block text-sm font-medium leading-6 text-white'
              >
                Username
              </label>
              <div className='mt-2'>
                <input
                  id='username'
                  name='username'
                  type='text'
                  autoComplete='username'
                  required
                  className='block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-white'
                >
                  Password
                </label>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='registerCode'
                className='block text-sm font-medium leading-6 text-white'
              >
                Register Code
              </label>
              <div className='mt-2 flex gap-2'>
                <input
                  id='registerCode'
                  name='registerCode'
                  type='text'
                  autoComplete='registerCode'
                  required
                  className='block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                  value={registerCode}
                  onChange={(e) => setRegisterCode(e.target.value)}
                />
                <button class=' p-2 w-2/5 items-center text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-800 border-gray-700 text-white hover:bg-gray-900'>
                  Send Code
                </button>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='mt-12 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
              >
                Register
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-400'>
            Have an account?{" "}
            <Link
              to='/login'
              className='font-semibold leading-6 text-indigo-400 hover:text-indigo-300'
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
