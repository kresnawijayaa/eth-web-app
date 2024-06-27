import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format, formatDistance } from "date-fns";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "../components/Loading";
import etherscanLogo from "../assets/etherscan.png";
import dexToolsLogo from "../assets/dextools.png";
import checkedLogo from "../assets/checked.png";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { fetchCards } from "../actions/cardsActions";
import { fetchDetails } from "../actions/detailsActions";

export default function Example() {
  const tabs = [{ name: "Test" }, { name: "Functions" }, { name: "Links" }];

  const [copySuccess, setCopySuccess] = useState("");
  const [open, setOpen] = useState(false);
  const [tabActive, setTabActive] = useState("Test");
  const [selectedId, setSelectedId] = useState(null);

  const dispatch = useDispatch();
  const cardsState = useSelector((state) => state.cards);
  const detailsState = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const handleDetailClick = (id) => {
    setSelectedId(id);
    dispatch(fetchDetails(id));
    setOpen(true);
  };

  const handleExit = () => {
    setOpen(false);
    delete detailsState.details;
  };

  const copyToClipboard = (text, event) => {
    event.preventDefault();
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess("Copied!");
        toast.success("Copy successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      },
      (err) => {
        setCopySuccess("Failed to copy!");
        alert("Failed to copy!");
      }
    );
  };

  return (
    <>
      <div className='relative isolate bg-gray-900 min-h-screen pb-8'>
        {/* background */}
        <div
          className='absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl'
          aria-hidden='true'
        >
          <div
            className='aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25'
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>

        {/* search & filter */}
        <div className='mx-auto max-w-7xl px-6 pt-8 lg:px-8'>
          <div className='lg:flex gap-8 w-full'>
            <div className='flex gap-4'>
              <select
                id='country'
                name='country'
                autoComplete='country-name'
                className='rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black'
              >
                <option>ETH</option>
                <option>BSC</option>
              </select>

              <div className='max-w-lg lg:max-w-xl flex items-center'>
                <svg
                  class='w-6 h-6 text-gray-800 dark:text-white'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M19 12H5m14 0-4 4m4-4-4-4'
                  />
                </svg>
              </div>

              <select
                id='country'
                name='country'
                autoComplete='country-name'
                className='rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black'
              >
                <option>Contract</option>
                <option>Name</option>
                <option>Checksum</option>
              </select>
            </div>

            <div className='w-full lg:mt-0'>
              <form className='mt-6 sm:flex lg:mt-0'>
                <div className='w-full'>
                  <input
                    type='text'
                    name='search-input'
                    id='search-input'
                    className='w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                    placeholder='Search'
                  />
                </div>
                <div className='mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0'>
                  <button
                    type='submit'
                    className='flex w-full items-center justify-center rounded-md bg-indigo-500 px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* card */}
        {cardsState.loading && <Loading />}
        {!cardsState.loading && (
          <div className='mx-auto max-w-7xl px-6 pt-8 lg:px-8'>
            <ul
              role='list'
              className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
            >
              {cardsState.cards.map((card) => (
                <div key={card.id}>
                  <div className='mx-auto max-w-7xl'>
                    <div className='mx-auto flex max-w-2xl flex-col gap-4 bg-white/5 ring-1 ring-white/10 rounded-xl lg:mx-0 lg:max-w-none lg:flex-row lg:items-center p-4'>
                      <div className='w-full flex-auto'>
                        <div className='flex justify-between border-b border-gray-600 pb-2'>
                          <p className='text-sm leading-6 text-neutral-200'>
                            {format(card.date, "MMM dd HH:mm:ss")}
                          </p>
                          <div className='flex gap-1'>
                            {card.stats.includes("Socials") && (
                              <button
                                type='button'
                                class='p-1 inline-flex items-center gap-x-2 text-sm font-medium shadow-sm disabled:opacity-50 disabled:pointer-events-none'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  strokeWidth={1.5}
                                  stroke='white'
                                  className='size-5'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
                                  />
                                </svg>
                              </button>
                            )}

                            {card.stats.includes("Live") && (
                              <button
                                type='button'
                                class='p-1 inline-flex items-center gap-x-2 text-sm font-medium shadow-sm disabled:opacity-50 disabled:pointer-events-none'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  strokeWidth={1.5}
                                  stroke='white'
                                  className='size-5'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z'
                                  />
                                </svg>
                              </button>
                            )}

                            {card.stats.includes("RenounceOwnership") && (
                              <button
                                type='button'
                                class='p-1 inline-flex items-center gap-x-2 text-sm font-medium shadow-sm disabled:opacity-50 disabled:pointer-events-none'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  strokeWidth={1.5}
                                  stroke='white'
                                  className='size-5'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>

                        <div className='my-4 grid grid-cols-5 gap-4'>
                          <div className='col-span-2'>
                            <h2 className='text-sm tracking-tight text-white'>
                              Name
                            </h2>
                            <p className='truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-green-500 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                              {card.name}
                            </p>
                            <h2 className='mt-4 text-sm tracking-tight text-white'>
                              Symbol
                            </h2>
                            <p className='truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-green-500 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                              {card.symbol}
                            </p>
                          </div>
                          <div className='col-span-3'>
                            <h2 className='text-sm tracking-tight text-white'>
                              Contract
                            </h2>
                            <div>
                              <div className='flex'>
                                <img
                                  className='h-6 w-6 my-auto mr-1'
                                  src={etherscanLogo}
                                  alt='Your Company'
                                />
                                <div className='truncate my-auto'>
                                  <p className='truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                    {card.contract}
                                  </p>
                                </div>
                                <button
                                  type='button'
                                  class='js-clipboard-example p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-800 border-gray-700 text-white hover:bg-gray-900'
                                  data-clipboard-target='#hs-clipboard-basic'
                                  data-clipboard-action='copy'
                                  data-clipboard-success-text='Copied'
                                  onClick={(e) =>
                                    copyToClipboard(card.contract, e)
                                  }
                                >
                                  <svg
                                    class='js-clipboard-default size-4 group-hover:rotate-6 transition'
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                  >
                                    <rect
                                      width='8'
                                      height='4'
                                      x='8'
                                      y='2'
                                      rx='1'
                                      ry='1'
                                    ></rect>
                                    <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'></path>
                                  </svg>

                                  <svg
                                    class='js-clipboard-success hidden size-4 text-blue-600'
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                  >
                                    <polyline points='20 6 9 17 4 12'></polyline>
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <h2 className='mt-4 text-sm tracking-tight text-white'>
                              Checksum
                            </h2>
                            <div>
                              <div className='flex'>
                                <div className='truncate my-auto'>
                                  <p className='truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                    {card.checkSum}
                                  </p>
                                </div>
                                <button
                                  type='button'
                                  class='ml-1 js-clipboard-example p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-800 border-gray-700 text-white hover:bg-gray-900'
                                  data-clipboard-target='#hs-clipboard-basic'
                                  data-clipboard-action='copy'
                                  data-clipboard-success-text='Copied'
                                  onClick={(e) =>
                                    copyToClipboard(card.checkSum, e)
                                  }
                                >
                                  <svg
                                    class='js-clipboard-default size-4 group-hover:rotate-6 transition'
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                  >
                                    <rect
                                      width='8'
                                      height='4'
                                      x='8'
                                      y='2'
                                      rx='1'
                                      ry='1'
                                    ></rect>
                                    <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'></path>
                                  </svg>

                                  <svg
                                    class='js-clipboard-success hidden size-4 text-blue-600'
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                  >
                                    <polyline points='20 6 9 17 4 12'></polyline>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='flex justify-between border-t border-gray-600 pt-4'>
                          <div className='flex gap-2'>
                            <button
                              type='button'
                              class='p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-800 border-gray-700 text-white hover:bg-gray-900'
                            >
                              <img
                                className='w-6 h-auto'
                                src='https://tufext.com/img/readyswapicon.png'
                                alt='Your Company'
                              />
                            </button>
                            <button
                              type='button'
                              class='p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-800 border-gray-700 text-white hover:bg-gray-900'
                            >
                              <img
                                className='w-4 h-auto'
                                src='https://dexscreener.com/favicon.png'
                                alt='Your Company'
                              />
                            </button>
                            <button
                              type='button'
                              class='p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-800 border-gray-700 text-white hover:bg-gray-900'
                            >
                              <img
                                className='w-5 h-auto'
                                src={dexToolsLogo}
                                alt='Your Company'
                              />
                            </button>
                          </div>
                          <div className='flex gap-2'>
                            <button
                              type='button'
                              class='p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-800 border-gray-700 text-white hover:bg-gray-900'
                            >
                              <p className='text-xs'>Analyse</p>
                            </button>
                            <button
                              type='button'
                              onClick={() => handleDetailClick(card.id)}
                              class='p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-800 border-gray-700 text-white hover:bg-gray-900'
                            >
                              <p className='text-xs'>More</p>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        )}

        {/* details */}
        <Transition show={open}>
          <Dialog
            className='relative z-10'
            onClose={setOpen}
          >
            <TransitionChild
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </TransitionChild>

            <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
                <TransitionChild
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                  enterTo='opacity-100 translate-y-0 sm:scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                  leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                >
                  <DialogPanel className='relative transform overflow-hidden rounded-lg bg-gray-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl sm:p-6'>
                    <div className='sm:flex sm:items-start'>
                      {detailsState.loading && <Loading />}
                      {!detailsState.loading && (
                        <div className='w-full flex-auto'>
                          <div className='flex justify-between border-b border-gray-600 pb-4'>
                            <p className='text-sm leading-6 text-neutral-200'>
                              {moment(detailsState.details?.date).format(
                                "MMM DD HH:mm:ss"
                              )}
                            </p>
                            <div className='flex gap-1'>
                              <button
                                type='button'
                                class='p-1 inline-flex items-center gap-x-2 text-sm font-medium shadow-sm disabled:opacity-50 disabled:pointer-events-none'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  strokeWidth={1.5}
                                  stroke='white'
                                  className='size-6'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
                                  />
                                </svg>
                              </button>

                              <button
                                type='button'
                                class='p-1 inline-flex items-center gap-x-2 text-sm font-medium shadow-sm disabled:opacity-50 disabled:pointer-events-none'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  strokeWidth={1.5}
                                  stroke='white'
                                  className='size-6'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z'
                                  />
                                </svg>
                              </button>

                              <button
                                type='button'
                                class='p-1 inline-flex items-center gap-x-2 text-sm font-medium shadow-sm disabled:opacity-50 disabled:pointer-events-none'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  strokeWidth={1.5}
                                  stroke='white'
                                  className='size-6'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div className='sm:flex sm:grid sm:grid-cols-10 gap-4'>
                            <div className='my-4 grid col-span-7 grid-cols-4 gap-6 pr-6 sm:border-r border-gray-600'>
                              <div className='col-span-2'>
                                <div className='sm:flex sm:grid sm:grid-cols-3 h-10'>
                                  <h2 className='my-auto text-sm tracking-tight text-white'>
                                    Name:
                                  </h2>
                                  <p className='my-auto col-span-2 truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-green-500 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                    {detailsState.details?.name}
                                  </p>
                                </div>
                                <div className='sm:flex sm:grid sm:grid-cols-3 mt-8 sm:mt-4 h-10'>
                                  <h2 className='my-auto text-sm tracking-tight text-white'>
                                    Symbol:
                                  </h2>
                                  <p className='my-auto col-span-2 truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-green-500 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                    {detailsState.details?.symbol}
                                  </p>
                                </div>
                                <div className='sm:flex sm:grid sm:grid-cols-3 mt-8 sm:mt-4 h-10'>
                                  <h2 className='my-auto text-sm tracking-tight text-white my-auto'>
                                    Contract:
                                  </h2>
                                  <div className='my-auto col-span-2'>
                                    <div className='flex'>
                                      <img
                                        className='h-6 w-6 my-auto mr-1'
                                        src={etherscanLogo}
                                        alt='Your Company'
                                      />
                                      <div className='truncate my-auto'>
                                        <p className='truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                          {detailsState.details?.contract}
                                        </p>
                                      </div>
                                      <button
                                        type='button'
                                        class='js-clipboard-example p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-800 border-gray-700 text-white hover:bg-gray-900'
                                        data-clipboard-target='#hs-clipboard-basic'
                                        data-clipboard-action='copy'
                                        data-clipboard-success-text='Copied'
                                        onClick={(e) =>
                                          copyToClipboard(
                                            detailsState.details?.contract,
                                            e
                                          )
                                        }
                                      >
                                        <svg
                                          class='js-clipboard-default size-4 group-hover:rotate-6 transition'
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='24'
                                          height='24'
                                          viewBox='0 0 24 24'
                                          fill='none'
                                          stroke='currentColor'
                                          stroke-width='2'
                                          stroke-linecap='round'
                                          stroke-linejoin='round'
                                        >
                                          <rect
                                            width='8'
                                            height='4'
                                            x='8'
                                            y='2'
                                            rx='1'
                                            ry='1'
                                          ></rect>
                                          <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'></path>
                                        </svg>

                                        <svg
                                          class='js-clipboard-success hidden size-4 text-blue-600'
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='24'
                                          height='24'
                                          viewBox='0 0 24 24'
                                          fill='none'
                                          stroke='currentColor'
                                          stroke-width='2'
                                          stroke-linecap='round'
                                          stroke-linejoin='round'
                                        >
                                          <polyline points='20 6 9 17 4 12'></polyline>
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className='sm:flex sm:grid sm:grid-cols-3 mt-8 sm:mt-4 h-10'>
                                  <h2 className='my-auto text-sm tracking-tight text-white my-auto'>
                                    Method:
                                  </h2>
                                  <div className='my-auto col-span-2'>
                                    <div className='flex'>
                                      <button
                                        type='button'
                                        class='py-1 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-3xl border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-100 text-white hover:bg-gray-200'
                                      >
                                        <p className='col-span-2 truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-green-500 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                          {detailsState.details?.method}
                                        </p>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className='sm:flex sm:grid sm:grid-cols-3 mt-8 sm:mt-4 h-10'>
                                  <h2 className='my-auto text-sm tracking-tight text-white my-auto'>
                                    Max Tx:
                                  </h2>
                                  <div className='my-auto col-span-2'>
                                    <div className='flex'>
                                      <div className='truncate my-auto'>
                                        <p className='truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                          {detailsState.details?.maxTx}
                                        </p>
                                      </div>
                                      <button
                                        type='button'
                                        class='ml-1 js-clipboard-example p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-800 border-gray-700 text-white hover:bg-gray-900'
                                        data-clipboard-target='#hs-clipboard-basic'
                                        data-clipboard-action='copy'
                                        data-clipboard-success-text='Copied'
                                        onClick={(e) =>
                                          copyToClipboard(
                                            detailsState.details?.maxTx,
                                            e
                                          )
                                        }
                                      >
                                        <svg
                                          class='js-clipboard-default size-4 group-hover:rotate-6 transition'
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='24'
                                          height='24'
                                          viewBox='0 0 24 24'
                                          fill='none'
                                          stroke='currentColor'
                                          stroke-width='2'
                                          stroke-linecap='round'
                                          stroke-linejoin='round'
                                        >
                                          <rect
                                            width='8'
                                            height='4'
                                            x='8'
                                            y='2'
                                            rx='1'
                                            ry='1'
                                          ></rect>
                                          <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'></path>
                                        </svg>

                                        <svg
                                          class='js-clipboard-success hidden size-4 text-blue-600'
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='24'
                                          height='24'
                                          viewBox='0 0 24 24'
                                          fill='none'
                                          stroke='currentColor'
                                          stroke-width='2'
                                          stroke-linecap='round'
                                          stroke-linejoin='round'
                                        >
                                          <polyline points='20 6 9 17 4 12'></polyline>
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className='sm:flex sm:grid sm:grid-cols-3 mt-8 sm:mt-4 h-10'>
                                  <h2 className='my-auto text-sm tracking-tight text-white'>
                                    Max Tx %:
                                  </h2>
                                  <p className='my-auto col-span-2 truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-green-500 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                    {detailsState.details?.maxTxPercent}
                                  </p>
                                </div>
                                <div className='sm:flex sm:grid sm:grid-cols-3 mt-8 sm:mt-4 h-10'>
                                  <h2 className='my-auto text-sm tracking-tight text-white my-auto'>
                                    Owner:
                                  </h2>
                                  <div className='my-auto col-span-2'>
                                    <div className='flex'>
                                      <img
                                        className='h-6 w-6 my-auto mr-1'
                                        src={etherscanLogo}
                                        alt='Your Company'
                                      />
                                      <div className='truncate my-auto'>
                                        <p className='truncate text-overflow:ellipsis overflow:hidden text-md font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                          {detailsState.details?.owner}{" "}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='sm:flex sm:grid sm:grid-cols-3 mt-8 sm:mt-4 h-10'>
                                  <h2 className='my-auto text-sm tracking-tight text-white'>
                                    Created:
                                  </h2>
                                  <p className='my-auto col-span-2 truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-green-500 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                    {moment(
                                      detailsState.details?.created,
                                      "YYYY-MM-DD HH:mm:SS"
                                    ).fromNow()}
                                  </p>
                                </div>
                              </div>
                              <div className='col-span-2'>
                                <div className='sm:flex sm:grid sm:grid-cols-3 h-10'>
                                  <h2 className='my-auto text-sm tracking-tight text-white'>
                                    Total:
                                  </h2>
                                  <p className='my-auto col-span-2 truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-green-500 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                    {detailsState.details?.total}
                                  </p>
                                </div>
                                <div className='sm:flex sm:grid sm:grid-cols-3 mt-8 sm:mt-4 h-10'>
                                  <h2 className='my-auto text-sm tracking-tight text-white'>
                                    Decimal:
                                  </h2>
                                  <p className='my-auto col-span-2 truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-green-500 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                    {detailsState.details?.decimal}
                                  </p>
                                </div>
                                <div className='sm:flex sm:grid sm:grid-cols-3 mt-8 sm:mt-4 h-10'>
                                  <h2 className='my-auto text-sm tracking-tight text-white my-auto'>
                                    Checksum:
                                  </h2>
                                  <div className='my-auto col-span-2'>
                                    <div className='flex'>
                                      <div className='truncate my-auto'>
                                        <p className='truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                          {detailsState.details?.checkSum}
                                        </p>
                                      </div>
                                      <button
                                        type='button'
                                        class='ml-1 js-clipboard-example p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-800 border-gray-700 text-white hover:bg-gray-900'
                                        data-clipboard-target='#hs-clipboard-basic'
                                        data-clipboard-action='copy'
                                        data-clipboard-success-text='Copied'
                                        onClick={(e) =>
                                          copyToClipboard(
                                            detailsState.details?.checkSum,
                                            e
                                          )
                                        }
                                      >
                                        <svg
                                          class='js-clipboard-default size-4 group-hover:rotate-6 transition'
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='24'
                                          height='24'
                                          viewBox='0 0 24 24'
                                          fill='none'
                                          stroke='currentColor'
                                          stroke-width='2'
                                          stroke-linecap='round'
                                          stroke-linejoin='round'
                                        >
                                          <rect
                                            width='8'
                                            height='4'
                                            x='8'
                                            y='2'
                                            rx='1'
                                            ry='1'
                                          ></rect>
                                          <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'></path>
                                        </svg>

                                        <svg
                                          class='js-clipboard-success hidden size-4 text-blue-600'
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='24'
                                          height='24'
                                          viewBox='0 0 24 24'
                                          fill='none'
                                          stroke='currentColor'
                                          stroke-width='2'
                                          stroke-linecap='round'
                                          stroke-linejoin='round'
                                        >
                                          <polyline points='20 6 9 17 4 12'></polyline>
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className='sm:flex sm:grid sm:grid-cols-3 mt-8 sm:mt-4 h-10'>
                                  <h2 className='my-auto text-sm tracking-tight text-white my-auto'>
                                    Method Id:
                                  </h2>
                                  <div className='my-auto col-span-2'>
                                    <div className='flex'>
                                      <button
                                        type='button'
                                        class='py-1 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-3xl border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-100 text-white hover:bg-gray-200'
                                      >
                                        <p className='col-span-2 truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-green-500 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                          {detailsState.details?.methodId}
                                        </p>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className='sm:flex sm:grid sm:grid-cols-3 mt-8 sm:mt-4 h-10'>
                                  <h2 className='my-auto text-sm tracking-tight text-white'>
                                    Max Wallet:
                                  </h2>
                                  <p className='my-auto col-span-2 truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-green-500 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                    {detailsState.details?.maxWallet}
                                  </p>
                                </div>
                                <div className='sm:flex sm:grid sm:grid-cols-3 mt-8 sm:mt-4 h-10'>
                                  <h2 className='my-auto text-sm tracking-tight text-white'>
                                    Max Wallet %:
                                  </h2>
                                  <p className='my-auto col-span-2 truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-green-500 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                    {detailsState.details?.maxWalletPercent}
                                  </p>
                                </div>
                                <div className='sm:flex sm:grid sm:grid-cols-3 mt-8 sm:mt-4 h-10'>
                                  <h2 className='my-auto text-sm tracking-tight text-white'>
                                    Wallet:
                                  </h2>
                                  <p className='my-auto col-span-2 truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-green-500 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                    {detailsState.details?.wallet}
                                  </p>
                                </div>
                                <div className='sm:flex sm:grid sm:grid-cols-3 mt-8 sm:mt-4 h-10'>
                                  <h2 className='my-auto text-sm tracking-tight text-white my-auto'>
                                    From:
                                  </h2>
                                  <div className='my-auto col-span-2'>
                                    <div className='flex'>
                                      <div className='truncate my-auto'>
                                        <p className='truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                          {detailsState.details?.from}
                                        </p>
                                      </div>
                                      <button
                                        type='button'
                                        class='ml-1 js-clipboard-example p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-800 border-gray-700 text-white hover:bg-gray-900'
                                        data-clipboard-target='#hs-clipboard-basic'
                                        data-clipboard-action='copy'
                                        data-clipboard-success-text='Copied'
                                        onClick={(e) =>
                                          copyToClipboard(
                                            detailsState.details?.from,
                                            e
                                          )
                                        }
                                      >
                                        <svg
                                          class='js-clipboard-default size-4 group-hover:rotate-6 transition'
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='24'
                                          height='24'
                                          viewBox='0 0 24 24'
                                          fill='none'
                                          stroke='currentColor'
                                          stroke-width='2'
                                          stroke-linecap='round'
                                          stroke-linejoin='round'
                                        >
                                          <rect
                                            width='8'
                                            height='4'
                                            x='8'
                                            y='2'
                                            rx='1'
                                            ry='1'
                                          ></rect>
                                          <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'></path>
                                        </svg>

                                        <svg
                                          class='js-clipboard-success hidden size-4 text-blue-600'
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='24'
                                          height='24'
                                          viewBox='0 0 24 24'
                                          fill='none'
                                          stroke='currentColor'
                                          stroke-width='2'
                                          stroke-linecap='round'
                                          stroke-linejoin='round'
                                        >
                                          <polyline points='20 6 9 17 4 12'></polyline>
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-span-3'>
                              <div>
                                <div className=''>
                                  <div className=''>
                                    <div className=''>
                                      <nav className='flex border-b border-white/10 py-4'>
                                        <ul
                                          role='list'
                                          className='flex min-w-full flex-none gap-x-6 text-sm font-semibold leading-6 text-gray-400'
                                        >
                                          {tabs.map((tab) => (
                                            <li key={tab.name}>
                                              <button
                                                className={
                                                  tabActive == tab.name
                                                    ? "text-indigo-400 bg-gray-800 py-2 px-4 rounded-md"
                                                    : "py-2 px-4 rounded-md"
                                                }
                                                onClick={() =>
                                                  setTabActive(tab.name)
                                                }
                                              >
                                                {tab.name}
                                              </button>
                                            </li>
                                          ))}
                                        </ul>
                                      </nav>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {tabActive == "Test" && (
                                <div className='h-80 overflow-auto'>
                                  <table className='min-w-full divide-y divide-gray-700'>
                                    <thead>
                                      <tr>
                                        <th
                                          scope='col'
                                          className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0'
                                        >
                                          Block
                                        </th>
                                        <th
                                          scope='col'
                                          className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                                        >
                                          Buy
                                        </th>
                                        <th
                                          scope='col'
                                          className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                                        >
                                          Sell
                                        </th>
                                        <th
                                          scope='col'
                                          className='px-3 py-3.5 text-left text-sm font-semibold text-white'
                                        >
                                          Info
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-800'>
                                      <tr>
                                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0'>
                                          0
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          0.60 %
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          0.00 %
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          <img
                                            className='w-6 h-auto'
                                            src={checkedLogo}
                                            alt='Your Company'
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0'>
                                          1
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          0.60 %
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          0.00 %
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          <img
                                            className='w-6 h-auto'
                                            src={checkedLogo}
                                            alt='Your Company'
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0'>
                                          2
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          0.60 %
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          0.00 %
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          <img
                                            className='w-6 h-auto'
                                            src={checkedLogo}
                                            alt='Your Company'
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0'>
                                          0
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          0.60 %
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          0.00 %
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          <img
                                            className='w-6 h-auto'
                                            src={checkedLogo}
                                            alt='Your Company'
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0'>
                                          1
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          0.60 %
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          0.00 %
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          <img
                                            className='w-6 h-auto'
                                            src={checkedLogo}
                                            alt='Your Company'
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0'>
                                          2
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          0.60 %
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          0.00 %
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          <img
                                            className='w-6 h-auto'
                                            src={checkedLogo}
                                            alt='Your Company'
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0'>
                                          0
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          0.60 %
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          0.00 %
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          <img
                                            className='w-6 h-auto'
                                            src={checkedLogo}
                                            alt='Your Company'
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0'>
                                          1
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          0.60 %
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          0.00 %
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          <img
                                            className='w-6 h-auto'
                                            src={checkedLogo}
                                            alt='Your Company'
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0'>
                                          2
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          0.60 %
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          0.00 %
                                        </td>
                                        <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-300'>
                                          <img
                                            className='w-6 h-auto'
                                            src={checkedLogo}
                                            alt='Your Company'
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              )}

                              {tabActive == "Functions" && (
                                <div class='h-80 flex'>
                                  <button
                                    type='button'
                                    class='mx-auto mb-auto mt-6 py-1 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-3xl border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-100 text-white hover:bg-gray-200'
                                  >
                                    <p class='col-span-2 truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-green-500 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                      Tier 1
                                    </p>
                                  </button>
                                </div>
                              )}
                              {tabActive == "Links" && (
                                <div class='h-80 flex'>
                                  <button
                                    type='button'
                                    class='mx-auto mb-auto mt-6 py-1 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-3xl border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-100 text-white hover:bg-gray-200'
                                  >
                                    <p class='col-span-2 truncate text-md font-bold bg-gradient-to-r from-indigo-400 via-green-500 to-indigo-400 inline-blocks text-transparent bg-clip-text'>
                                      Tier 1
                                    </p>
                                  </button>
                                </div>
                              )}

                              <div className='flex justify-between border-t border-gray-600 pt-4'>
                                <div className='flex gap-2'>
                                  <button
                                    type='button'
                                    class='p-2 my-auto inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-800 border-gray-700 text-white hover:bg-gray-900'
                                  >
                                    <img
                                      className='w-auto h-4'
                                      src='https://tufext.com/img/readyswapicon.png'
                                      alt='Your Company'
                                    />
                                  </button>
                                  <button
                                    type='button'
                                    class='p-2 my-auto inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-800 border-gray-700 text-white hover:bg-gray-900'
                                  >
                                    <img
                                      className='w-auto h-4'
                                      src='https://dexscreener.com/favicon.png'
                                      alt='Your Company'
                                    />
                                  </button>
                                  <button
                                    type='button'
                                    class='p-2 my-auto inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-800 border-gray-700 text-white hover:bg-gray-900'
                                  >
                                    <img
                                      className='w-auto h-4'
                                      src={dexToolsLogo}
                                      alt='Your Company'
                                    />
                                  </button>
                                </div>
                                <div className='flex gap-2'>
                                  <button
                                    type='button'
                                    className='inline-flex items-center w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                                  >
                                    Analyse
                                  </button>
                                  <button
                                    type='button'
                                    className='inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                                    onClick={() => {
                                      handleExit();
                                    }}
                                  >
                                    Exit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      <ToastContainer />
    </>
  );
}
