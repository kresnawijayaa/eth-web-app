import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, editProfile } from "../actions/profileActions";
import Loading from "../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Example() {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profile);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [idTelegram, setIdTelegram] = useState("");
  let { userId } = useParams();

  useEffect(() => {
    dispatch(fetchProfile(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (profileState.profile) {
      setUsername(profileState.profile.username);
      setPassword(profileState.profile.password);
      setIdTelegram(profileState.profile.idTelegram);
    }
  }, [profileState.profile]);

  const handleEditProfile = (e) => {
    e.preventDefault();
    const profileData = {
      username,
      password,
      idTelegram,
      registerCode: profileState.profile.registerCode,
      access_token: profileState.profile.access_token,
      profilePicture: profileState.profile.profilePicture,
    };
    dispatch(editProfile(userId, profileData));
    toast.success("Profile updated successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <div className='flex h-screen flex-1 flex-col px-6 py-12 lg:px-8 bg-gray-900'>
        {profileState.loading && <Loading />}
        {!profileState.loading && (
          <>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
              <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-white'>
                Profile
              </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
              <form
                className='space-y-6'
                onSubmit={handleEditProfile}
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
                      type='text'
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
                    htmlFor='idTelegram'
                    className='block text-sm font-medium leading-6 text-white'
                  >
                    Id Telegram
                  </label>
                  <div className='mt-2'>
                    <input
                      id='idTelegram'
                      name='idTelegram'
                      type='text'
                      autoComplete='idTelegram'
                      className='block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                      value={idTelegram}
                      onChange={(e) => setIdTelegram(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type='submit'
                    className='mt-12 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
